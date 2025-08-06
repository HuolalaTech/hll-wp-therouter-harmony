import { abilityDelegatorRegistry, TestRunner } from '@kit.TestKit';
import { UIAbility, common, application } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { resourceManager } from '@kit.LocalizationKit';
import { util } from '@kit.ArkTS';

let abilityDelegator: abilityDelegatorRegistry.AbilityDelegator;
let abilityDelegatorArguments: abilityDelegatorRegistry.AbilityDelegatorArgs;
let jsonPath: string = 'mock/mock-config.json';
let tag: string = 'testTag';
const UNLOCK_ERROR = -3;
const global: object = new Function("return this")();

async function onAbilityCreateCallback(data: UIAbility) {
  hilog.info(0x0000, tag, 'onAbilityCreateCallback, data: ${}', JSON.stringify(data));
}

async function addAbilityMonitorCallback(err: BusinessError) {
  hilog.info(0x0000, tag, 'addAbilityMonitorCallback : %{public}s', JSON.stringify(err) ?? '');
}

export default class OpenHarmonyTestRunner implements TestRunner {
  constructor() {
  }

  onPrepare() {
    hilog.info(0x0000, tag, '%{public}s', 'OpenHarmonyTestRunner OnPrepare');
  }

  async onRun() {
    hilog.info(0x0000, tag, '%{public}s', 'OpenHarmonyTestRunner onRun run');
    abilityDelegatorArguments = abilityDelegatorRegistry.getArguments()
    abilityDelegator = abilityDelegatorRegistry.getAbilityDelegator()
    let moduleName = abilityDelegatorArguments.parameters['-m'];

    const savePath: string = '__savePath__';
    const readPath: string = '__readPath__';
    const testMode: string = '__testMode__';
    let uid: number = Math.floor(abilityDelegator.getAppContext().applicationInfo.uid / 200000);
    const bundleName: string = abilityDelegatorArguments.bundleName;
    global[savePath] = '/data/storage/el2/base/js_coverage.json';
    global[readPath] = '/data/app/el2/' + uid + '/base/' + bundleName + '/js_coverage.json';
    global[testMode] = 'ohostest';

    try {
      application.createModuleContext(abilityDelegator.getAppContext().getApplicationContext(), moduleName)
        .then((data: Context)=> {
          doOnRun(data, moduleName);
      }).catch((error : BusinessError)=>{
        console.error(`test runner createModuleContext failed, error.code: ${(error as BusinessError).code}, error.message: ${(error as BusinessError).message}`);
        return;
      })
    } catch (error) {
      console.error(`test runner createModuleContext failed, error.code: ${(error as BusinessError).code}, error.message: ${(error as BusinessError).message}`);
      return;
    }
  }
}

async function doOnRun(context: common.Context, moduleName: string) {
  let mResourceManager = context.resourceManager;
  await checkMock(abilityDelegator, mResourceManager);
  const bundleName = abilityDelegatorArguments.bundleName;
  const testAbilityName: string = 'TestAbility';
  const parameters = abilityDelegatorArguments.parameters;
  const isDebug = parameters['-D'] == 'true';
  let lMonitor: abilityDelegatorRegistry.AbilityMonitor = {
    abilityName: testAbilityName,
    onAbilityCreate: onAbilityCreateCallback,
    moduleName: moduleName
  };
  abilityDelegator.addAbilityMonitor(lMonitor, addAbilityMonitorCallback)
  await startAbility(bundleName, testAbilityName, moduleName, isDebug);
  hilog.info(0x0000, tag, '%{public}s', 'OpenHarmonyTestRunner onRun end');
}

async function startAbility(bundleName: string, abilityName: string, moduleName: string, isDebug: boolean) {
  let command = `aa start -b ${bundleName} -a ${abilityName} -m ${moduleName}`;
  if (isDebug) {
    command += ' -D';
  }
  await abilityDelegator.executeShellCommand(command).then(result => {
    if (result.stdResult.includes("error: unlock screen failed in developer mode")
    || result.stdResult.includes("10106102")) {
      hilog.info(0x0000, tag, '%{public}s', `startAbility failed ${result.stdResult}`);
      abilityDelegator.finishTest("", UNLOCK_ERROR, () => {});
      return;
    }
  }).catch((err: string) => {
    hilog.info(0x0000, tag, '%{public}s', `startAbility error: ${err}`);
  })
}

async function checkMock(abilityDelegator: abilityDelegatorRegistry.AbilityDelegator, resourceManager: resourceManager.ResourceManager) {
  let rawFile: Uint8Array;
  try {
    rawFile = resourceManager.getRawFileContentSync(jsonPath);
    hilog.info(0x0000, tag, 'MockList file exists');
    let mockStr: string = util.TextDecoder.create('utf-8', { ignoreBOM: true }).decodeToString(rawFile);
    let mockMap: Record<string, string> = getMockList(mockStr);
    try {
      abilityDelegator.setMockList(mockMap)
    } catch (error) {
      let code = (error as BusinessError).code;
      let message = (error as BusinessError).message;
      hilog.error(0x0000, tag, `abilityDelegator.setMockList failed, error code: ${code}, message: ${message}.`);
    }
  } catch (error) {
    let code = (error as BusinessError).code;
    let message = (error as BusinessError).message;
    hilog.error(0x0000, tag, `ResourceManager:callback getRawFileContent failed, error code: ${code}, message: ${message}.`);
  }
}

function getMockList(jsonStr: string) {
  let jsonObj: Record<string, Object> = JSON.parse(jsonStr);
  let map: Map<string, object> = new Map<string, object>(Object.entries(jsonObj));
  let mockList: Record<string, string> = {};
  map.forEach((value: object, key: string) => {
    let realValue: string = value['source'].toString();
    mockList[key] = realValue;
  });
  hilog.info(0x0000, tag, '%{public}s', 'mock-json value:' + JSON.stringify(mockList) ?? '');
  return mockList;
}