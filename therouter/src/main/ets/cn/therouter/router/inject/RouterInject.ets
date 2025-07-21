import { collections, List, taskpool, uri } from '@kit.ArkTS';
import { ServiceData } from '../entity/ServiceData';
import { ReflectClass } from './ReflectClass';
import { RouterUtil } from '../../utils/RouterUtil';
import { application, bundleManager, common } from '@kit.AbilityKit';
import { debug, deepClone } from '../../utils/TheRouterUtil';
import { importWrappedBuilder, RouteItem } from '../RouteItem';
import { BundleInfo, bundleInfoAddRouterMap, bundleToRouteItem } from '../entity/BundleInfo';
import { RegexHashMap } from '../RegexHashMap';
import { TheRouterConstants } from '../../constants/TheRouterConstants';
import { IServiceProvider } from '../Route';

/**
 * 用于编译期产物在运行时的读取，用于整个路由框架的初始化
 */
export class RouterInject {
  private static instance: RouterInject | null = null;
  private routerMap: RegexHashMap = new RegexHashMap();
  private dynamicRouterMap: RegexHashMap = new RegexHashMap();
  private actionMap: Map<string, List<ServiceData>> = new Map();
  private providerMap: Map<string, ServiceData> = new Map();
  private singletonProviderMap: Map<string, ReflectClass> = new Map();

  private constructor() {
  }

  public getRouterMap() {
    return this.routerMap;
  }

  public static getInstance(): RouterInject {
    if (RouterInject.instance == null) {
      RouterInject.instance = new RouterInject();
    }
    return RouterInject.instance;
  }

  public init(context: common.Context, initWithTaskPool: boolean): void {
    let moduleList: collections.Set<string> = new collections.Set();
    if (initWithTaskPool) {
      this.initModuleInfo(context, initWithTaskPool, moduleList, this.getBundleInfoFromRouteMapFile,
        taskpool.Priority.HIGH).then(() => {

        this.initModuleInfo(context, initWithTaskPool, moduleList, this.getComponentInfosFromBundleManager,
          taskpool.Priority.LOW)
          .then(() => {
          });
      });
    } else {
      const bundleInfo = this.getBundleInfoFromRouteMapFile(context);
      this.initRouteMap(false, bundleInfo);

      this.getComponentInfosFromBundleManager(context, moduleList).then((bundleInfo) => {
        this.initRouteMap(false, bundleInfo);
      });
    }
  }

  async initModuleInfo(context: common.Context,
    initWithTaskPool: boolean,
    hspModuleNames: collections.Set<string>,
    func: Function,
    priority: taskpool.Priority) {
    let result: BundleInfo | undefined;
    if (initWithTaskPool) {
      let task: taskpool.Task = new taskpool.Task(func, context, hspModuleNames);
      result = await taskpool.execute(task, priority) as BundleInfo | undefined;
    } else {
      result = await func(context, hspModuleNames);
    }
    this.initRouteMap(false, result);
  }

  matchRouteMap(pageUrl: string): RouteItem | null {
    if (pageUrl === RouterUtil.BAVBAR_PAGE_NAME) {
      return null;
    }

    let pagePath = pageUrl;
    try {
      let uriObj = new uri.URI(pagePath);
      if (uriObj.encodedQuery) {
        pagePath = pagePath.split('?' + uriObj.encodedQuery)[0];
      }
    } catch (e) {
    }

    let routeMapItem = this.routerMap.get(pagePath);
    if (!routeMapItem) {
      routeMapItem = this.dynamicRouterMap.get(pagePath);
    }

    if (routeMapItem) {
      return deepClone(routeMapItem);
    } else {
      return null;
    }
  }

  public isDynamicPage(path: string): boolean {
    let routeItem = this.routerMap.get(path);
    return routeItem?.buildFunction === 'DynamicPageBuilder'
  }

  public isRouterAction(path: string): boolean {
    let actionData = this.actionMap.get(path);
    return actionData != null
  }

  public getBuilderByPath(path: string): WrappedBuilder<ESObject> | undefined {
    let routeItem = this.routerMap.get(path);
    if (routeItem && routeItem.ohmurl && routeItem.buildFunction) {
      return importWrappedBuilder<WrappedBuilder<ESObject[]>>(routeItem);
    }
    return undefined;
  }

  public getService<T extends IServiceProvider>(serviceName: string): T {
    let instance: ReflectClass | undefined;
    if (this.singletonProviderMap.has(serviceName)) {
      instance = this.singletonProviderMap.get(serviceName);
    } else {
      const data = this.providerMap.get(serviceName);
      if (data) {
        instance = loadClass(data);
        if (instance?.singleton) {
          this.singletonProviderMap.set(instance.serviceName, instance);
        }
      }
    }
    return instance?.instance as T;
  }

  public action<T>(action: string, ...args: Object[]): Promise<T> {
    return new Promise((resolve, reject) => {
      let instanceList: List<ReflectClass> = new List<ReflectClass>();
      const list = this.actionMap.get(action);
      if (list) {
        for (const data of list) {
          instanceList.add(loadClass(data));
        }
      }
      if (!instanceList.isEmpty()) {
        try {
          let temp: ESObject | null = null;
          for (const instance of instanceList) {
            temp = instance.instance[instance.functionName](...args)
          }
          resolve(temp as T);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error(`Could not find service: ${action}`));
      }
    });
  }

  public addRemoteRouteMap(routeMap?: string) {
    this.initRouteMap(true, RouterUtil.getBundleInfoFromJson(routeMap))
  }

  public initRouteMap(isDynamic: boolean, bundleInfo?: BundleInfo) {
    if (bundleInfo?.routerMap) {
      for (const bundle of bundleInfo?.routerMap) {
        const routeItem = bundleToRouteItem(bundle);
        if (routeItem.path?.includes(TheRouterConstants.ACTION_PREFIX)) {
          let data = new ServiceData(bundle);
          let list = this.actionMap.get(data.serviceName);
          if (!list) {
            list = new List<ServiceData>();
          }
          list.add(data);

          if (list.length > 1) {
            list.sort((first, second) => {
              if (!first.priority) {
                first.priority = 5
              }
              if (!second.priority) {
                second.priority = 5
              }
              return first.priority - second.priority;
            });
          }
          this.actionMap.set(data.serviceName, list);
        } else if (routeItem.path?.startsWith(TheRouterConstants.SERVICE_PROVIDE_PREFIX)) {
          let data = new ServiceData(bundle);
          this.providerMap.set(data.serviceName, data);
        } else {
          if (isDynamic) {
            for (const orignal of this.routerMap.values()) {
              if (orignal.classPath == routeItem.classPath) {
                const dynamicPath = routeItem.path;
                routeItem.path = orignal.path;
                this.dynamicRouterMap.set(dynamicPath || '', routeItem);
                break;
              }
            }
          } else {
            this.routerMap.set(routeItem.path || '', routeItem);
          }
        }
      }
    }
  }

  private getBundleInfoFromRouteMapFile(context: common.Context): BundleInfo | undefined {
    // 解析主模块
    let bundleInfo = RouterUtil.getBundleInfoFromRawFile(context);
    if (bundleInfo) {
      for (const module of bundleInfo.hspModuleNames) {
        try {
          let hspContext = context.createModuleContext(module);
          // 解析依赖模块
          let hspBundleInfo = RouterUtil.getBundleInfoFromRawFile(hspContext);
          if (hspBundleInfo) {
            bundleInfoAddRouterMap(bundleInfo, hspBundleInfo);
          }
        } catch (error) {
          debug('RouterInject::getComponentInfosFromBundleManager', error);
        }
      }
    }
    return bundleInfo;
  }

  private async getComponentInfosFromBundleManager(context: common.Context, hspModuleNames: collections.Set<string>):
    Promise<BundleInfo | undefined> {
    let bundleInfo: BundleInfo | undefined;
    let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE;
    let bundleData = await bundleManager.getBundleInfoForSelf(bundleFlags);
    for (let hapModulesInfoElement of bundleData.hapModulesInfo) {
      let hspModuleName = hapModulesInfoElement.name;
      if (hapModulesInfoElement.type == bundleManager.ModuleType.SHARED &&
        !hspModuleNames.has(hapModulesInfoElement.name)) {
        hspModuleNames.add(hspModuleName);
        try {
          let hspContext = await application.createModuleContext(context, hspModuleName);
          let hspBundleInfo = RouterUtil.getBundleInfoFromRawFile(hspContext);
          if (!bundleInfo) {
            bundleInfo = new BundleInfo()
          }
          bundleInfoAddRouterMap(bundleInfo, hspBundleInfo);
        } catch (error) {
        }
      }
    }
    return bundleInfo;
  }
}

function loadClass(data: ServiceData): ReflectClass | undefined {
  const targetClass: ESObject | undefined = data.importComponent();
  if (!targetClass) {
    return;
  }
  let serviceInstance: ReflectClass = {
    serviceName: data.serviceName,
    functionName: data.functionName,
    singleton: data.singleton,
    instance: targetClass
  };
  return serviceInstance;
}
