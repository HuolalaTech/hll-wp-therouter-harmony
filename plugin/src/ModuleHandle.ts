import { HvigorNode } from '@ohos/hvigor';
import {
  OhosAppContext,
  OhosHapContext,
  OhosHarContext,
  OhosHspContext,
  OhosPluginId,
  Target
} from '@ohos/hvigor-ohos-plugin';
import { ModuleBuildProfile } from '@ohos/hvigor-ohos-plugin/src/options/build/module-build-profile';
import { PluginConfig, PluginConfigParam } from './PluginConfig';
import { ParseAnnotationPlugin } from './ParseAnnotationPlugin';
import { Logger } from './common/Logger';
import { RouterInfo } from './common/AnalyzerResultLike';
import PluginConstant from './constants/PluginConstant';
import TaskConstants from './constants/TaskConstants';
import TheRouterFileUtil from './utils/FileUtil';
import ObfuscationUtil from './utils/ObfuscationUtil';
import PluginStore from './store/PluginStore';
import BuildConfig from "./BuildConfig";

export class ModuleHandle {
  public readonly config: PluginConfig;
  private readonly node: HvigorNode;
  private readonly moduleContext: OhosHapContext | OhosHarContext | OhosHspContext;
  private readonly appContext: OhosAppContext;
  private readonly parseAnnotationPlugin: ParseAnnotationPlugin;

  constructor(node: HvigorNode, moduleContext: OhosHapContext | OhosHarContext | OhosHspContext) {
    this.node = node;
    this.moduleContext = moduleContext;
    this.config = this.readConfig();
    this.appContext = this.node.getParentNode()?.getContext(OhosPluginId.OHOS_APP_PLUGIN);
    PluginStore.getInstance().projectFilePath = this.appContext.getProjectPath();
    this.parseAnnotationPlugin = new ParseAnnotationPlugin(this.config);
  }

  public start() {
    Logger.info(`TheRouter plugin v${BuildConfig.VERSION} build ${this.node.getNodeName()} module start !`);
    this.moduleContext.targets((target: Target) => {
      const targetName = target.getTargetName();
      this.node.registerTask({
        name: targetName + TaskConstants.PARSE_ANNOTATION_TASK,
        run: () => {
          this.parseAnnotationPlugin.analyzeAnnotation();
          this.updateModuleJsonOpt();
          this.updateBuildProfileOpt();
          this.parseAnnotationPlugin.scanFiles = [];
          this.parseAnnotationPlugin.routerMap = [];
        },
        dependencies: [targetName + TaskConstants.PRE_BUILD],
        postDependencies: [targetName + TaskConstants.MERGE_PROFILE]
      });
      this.node.registerTask({
        name: targetName + TaskConstants.COPY_ROUTER_MAP_TASK,
        run: () => {
          this.copyRouterMapToRawFileTask(target.getBuildTargetOutputPath(), targetName);
          this.writeHspModuleName();
        },
        dependencies: [targetName + TaskConstants.PROCESS_ROUTER_MAP],
        postDependencies: [targetName + TaskConstants.PROCESS_RESOURCE]
      });
      this.node.registerTask({
        name: targetName + TaskConstants.GENERATE_OBFUSCATION_TASK,
        run: () => {
          this.generateObfuscationFileTask(this.moduleContext.getBuildProfileOpt());
        },
        dependencies: [targetName + TaskConstants.PARSE_ANNOTATION_TASK],
        postDependencies: [targetName + TaskConstants.MERGE_PROFILE]
      });
    });
  }

  private generateObfuscationFileTask(buildProfileOpt: ModuleBuildProfile.ModuleBuildOpt) {
    if (!this.isEnableObfuscation(buildProfileOpt)) {
      Logger.info('This compilation does not turn on code obfuscation, skip ' + PluginConstant.OBFUSCATION_FILE_NAME +
        ' file generation');
      return;
    }
    let obfuscationFilePath = TheRouterFileUtil.pathResolve(this.config.modulePath,
      PluginConstant.OBFUSCATION_FILE_NAME);
    let routerMap = JSON.parse(TheRouterFileUtil.readFileSync(this.config.getRouterMapDir()).toString()).routerMap;
    let obfuscationString = ObfuscationUtil.buildObfuscatedStrings(routerMap);
    TheRouterFileUtil.ensureFileSync(obfuscationFilePath);
    TheRouterFileUtil.writeFileSync(obfuscationFilePath, obfuscationString);
    if (this.moduleContext.getModuleType() === PluginConstant.HAR_MODULE_NAME) {
      let consumerRulesPath = TheRouterFileUtil.pathResolve(this.config.modulePath, PluginConstant.CONSUMER_FILE_NAME);
      TheRouterFileUtil.ensureFileSync(consumerRulesPath);
      TheRouterFileUtil.writeFileSync(consumerRulesPath, obfuscationString);
    }
    Logger.info('Generate obfuscation rule file successfully, filePath:', obfuscationFilePath);
  }

  private isEnableObfuscation(buildProfileOpt: ModuleBuildProfile.ModuleBuildOpt): boolean {
    let currentBuildMode = this.appContext.getBuildMode();
    let buildOption = buildProfileOpt.buildOptionSet?.find((item) => {
      return item.name == currentBuildMode;
    });
    if (!buildOption) {
      return false;
    }
    let ruleOptions = this.ensureNestedObject(buildOption, ['arkOptions', 'obfuscation', 'ruleOptions']);
    if (this.config.autoObfuscation && ruleOptions.enable) {
      let files = this.ensureNestedObject(buildOption, ['arkOptions', 'obfuscation', 'ruleOptions', 'files']);
      let obfuscationFilePath = PluginConstant.CURRENT_DELIMITER +
      PluginConstant.OBFUSCATION_FILE_NAME;
      if (typeof files === 'string') {
        ruleOptions.files = [files, obfuscationFilePath];
      } else if (Array.isArray(files)) {
        files.push(obfuscationFilePath);
      } else {
        ruleOptions.files = obfuscationFilePath;
      }
      if (this.moduleContext.getModuleType() === PluginConstant.HAR_MODULE_NAME) {
        let consumerFiles = this.ensureNestedObject(buildOption, ['arkOptions', 'obfuscation', 'consumerFiles']);
        let consumerRulesPath = PluginConstant.CURRENT_DELIMITER +
        PluginConstant.CONSUMER_FILE_NAME;
        if (typeof consumerFiles === 'string') {
          this.ensureNestedObject(buildOption, ['arkOptions', 'obfuscation']).consumerFiles =
            [consumerFiles, consumerRulesPath];
        } else if (Array.isArray(consumerFiles)) {
          consumerFiles.push(consumerRulesPath);
        } else {
          this.ensureNestedObject(buildOption, ['arkOptions', 'obfuscation']).consumerFiles = consumerRulesPath;
        }
      }
      this.moduleContext.setBuildProfileOpt(buildProfileOpt);
    }
    return ruleOptions.enable;
  }

  private copyRouterMapToRawFileTask(buildOutputPath: string, targetName: string) {
    let routerMapFilePath = TheRouterFileUtil.pathResolve(
      buildOutputPath,
      PluginConstant.TEMP_ROUTER_MAP_PATH,
      targetName,
      PluginConstant.ROUTER_MAP_NAME
    );
    let rawFilePath = this.config.getRawFilePath();
    TheRouterFileUtil.ensureFileSync(rawFilePath);
    TheRouterFileUtil.copyFileSync(routerMapFilePath, rawFilePath);
  }

  private writeHspModuleName() {
    if (!this.node.getAllPluginIds().includes(OhosPluginId.OHOS_HAP_PLUGIN)) {
      return;
    }
    let rawFilePath = this.config.getRawFilePath();
    let rawFileRouterMap = JSON.parse(TheRouterFileUtil.readFileSync(rawFilePath).toString());
    rawFileRouterMap.hspModuleNames = [...new Set(PluginStore.getInstance().hspModuleNames)];
    rawFileRouterMap.hspModuleNames.push(...this.getRemoteHspModuleNames(this.node, this.node.getAllPluginIds()));
    TheRouterFileUtil.writeFileSync(rawFilePath, JSON.stringify(rawFileRouterMap));
  }

  private getRemoteHspModuleNames(node: HvigorNode, pluginIds: string[]): string[] {
    let remoteHspModuleNames: string[] = [];
    try {
      pluginIds.forEach((id: string) => {
        let context = node.getContext(id);
        let signedHspObj = context.getOhpmRemoteHspDependencyInfo(true);
        let remoteHspObj = context.getOhpmRemoteHspDependencyInfo(false);
        for (const key in signedHspObj) {
          remoteHspModuleNames.push(signedHspObj[key].name);
        }
        for (const key in remoteHspObj) {
          remoteHspModuleNames.push(remoteHspObj[key].name);
        }
      });
    } catch (error) {
      Logger.warn('Your DevEco Studio version less than 5.0.3.800, may cause remote hsp dependencies get failed');
    }
    return remoteHspModuleNames;
  }

  private updateModuleJsonOpt() {
    const moduleJsonOpt = this.moduleContext.getModuleJsonOpt();
    if (moduleJsonOpt.module.routerMap) {
      let routerMapFileName = moduleJsonOpt.module.routerMap.split(':')[1];
      let routerMapFilePath = this.config.getModuleRouterMapFilePath(routerMapFileName);
      let routerMapObj = TheRouterFileUtil.readJson5(routerMapFilePath);
      if (routerMapFileName !== PluginConstant.ROUTER_MAP_KEY) {
        try {
          this.parseAnnotationPlugin.routerMap.unshift(
            ...((routerMapObj as any)[PluginConstant.ROUTER_MAP_KEY] as Array<RouterInfo>));
        } catch (error) {
          Logger.warn(`parse error routeMap from ${routerMapFilePath}`);
        }
      }
    }
    this.parseAnnotationPlugin.generateRouterMap();
    moduleJsonOpt.module.routerMap = PluginConstant.MODULE_ROUTER_MAP_NAME;
    this.moduleContext.setModuleJsonOpt(moduleJsonOpt);
  }

  private updateBuildProfileOpt() {
    const buildProfileOpt = this.moduleContext.getBuildProfileOpt();
    let sources = this.ensureNestedObject(buildProfileOpt, ['buildOption', 'arkOptions', 'runtimeOnly', 'sources']);
    if (!Array.isArray(sources)) {
      buildProfileOpt.buildOption!.arkOptions!.runtimeOnly!.sources = [];
    }
    this.pushRouterInfo(buildProfileOpt, this.parseAnnotationPlugin.routerMap);
    this.moduleContext.setBuildProfileOpt(buildProfileOpt);
  }

  private pushRouterInfo(buildProfileOpt: any, routerMap: Array<RouterInfo>) {
    const sources = buildProfileOpt.buildOption.arkOptions.runtimeOnly.sources;
    routerMap.forEach((item: RouterInfo) => {
      const name = item.name;
      if (name.includes(PluginConstant.ACTION_PREFIX)) {
        sources.push(PluginConstant.CURRENT_DELIMITER + item.pageSourceFile);
      }
    });
  }

  private readConfig(): PluginConfig {
    let configParam: PluginConfigParam;
    let configFilePath: string;
    let configDir: string;
    configFilePath = TheRouterFileUtil.pathResolve(this.node.getNodePath(), PluginConstant.CONFIG_FILE_NAME);
    if (!TheRouterFileUtil.exist(configFilePath)) {
      configFilePath =
        TheRouterFileUtil.pathResolve(PluginStore.getInstance().projectFilePath, PluginConstant.CONFIG_FILE_NAME);
    }
    if (TheRouterFileUtil.exist(configFilePath)) {
      configParam = TheRouterFileUtil.readJson5(configFilePath);
    } else {
      configParam = {};
    }
    configDir = TheRouterFileUtil.pathResolve(configFilePath, PluginConstant.PARENT_DELIMITER);
    return new PluginConfig(this.node.getNodeName(), this.node.getNodePath(), configDir, configParam);
  }

  private ensureNestedObject(obj: any, path: string[]): any {
    return path.reduce((acc, key) => {
      if (!acc[key]) {
        acc[key] = {};
      }
      return acc[key];
    }, obj);
  }
}
