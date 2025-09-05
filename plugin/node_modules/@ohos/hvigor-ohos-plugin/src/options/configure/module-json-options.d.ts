import { CompileModeEnum } from '../../enum/compile-mode-enum.js';
import { Named, Option, RequiredNamed } from '../options.js';
import { AppJson } from './app-json-options.js';
import { ConfigJson } from './config-json-options.js';
export declare namespace ModuleJson {
    import AppObj = AppJson.AppObj;
    import UrisObj = ConfigJson.UrisObj;
    interface SkillsObj {
        actions?: string[];
        entities?: string[];
        uris?: UrisObj[];
        permissions?: string[];
        domainVerify?: boolean;
    }
    interface AbilityObj extends RequiredNamed {
        srcEntrance?: string;
        srcEntry?: string;
        description?: string;
        icon?: string;
        label?: string;
        orientation?: string;
        visible?: boolean;
        skills?: SkillsObj[];
        launchType?: string;
        moduleName?: string;
        startWindow?: string;
        metadata?: MetadataObj[];
    }
    interface FormObj extends RequiredNamed {
        updateEnabled: boolean;
        scheduledUpdateTime?: number;
        updateDuration?: number;
        supportDimensions: string[];
        defaultDimension: string;
    }
    interface FormsObj extends Option {
        forms: FormObj[];
    }
    interface MetadataObj extends Named {
        resource?: string;
        value?: string;
    }
    interface UsedSceneObj extends Option {
        abilities?: string[];
        when?: string;
    }
    interface RequestPermissionObj extends RequiredNamed {
        reason?: string;
        usedScene?: UsedSceneObj;
    }
    interface DependencyObj {
        moduleName: string;
        bundleName?: string;
        versionCode?: number;
    }
    interface AtomicServiceObj {
        preloads: {
            moduleName: string;
        };
    }
    interface ExtensionAbilityObj extends RequiredNamed {
        srcEntrance?: string;
        srcEntry?: string;
        icon?: string;
        description?: string;
        type: string;
        visible?: boolean;
        metadata?: MetadataObj[];
    }
    interface ModuleObj extends RequiredNamed {
        type: string;
        srcEntrance?: string;
        srcEntry?: string;
        description?: string;
        mainElement?: string;
        deviceTypes: string[];
        deliveryWithInstall?: boolean;
        installationFree?: boolean;
        pages: string;
        routerMap: string;
        appStartup: string;
        systemTheme?: string;
        abilities?: AbilityObj[];
        extensionAbilities?: ExtensionAbilityObj[];
        virtualMachine?: string;
        compileMode?: CompileModeEnum;
        metadata?: MetadataObj[];
        requestPermissions?: RequestPermissionObj[];
        definePermissions?: DefinePermissionsObj[];
        dependencies?: DependencyObj[];
        libIsolation?: boolean;
        atomicService?: AtomicServiceObj;
        proxyData?: ProxyDataObj[];
    }
    interface DefinePermissionsObj extends Named {
        grantMode?: string;
        availableLevel?: string;
        provisionEnable?: boolean;
        distributedSceneEnable?: boolean;
        label?: string;
        description?: string;
    }
    interface ProxyDataObj {
        uri: string;
        requiredReadPermission: string;
        requiredWritePermission: string;
        metadata: MetadataObj;
    }
    interface ShortcutsObj {
        shortcutId: string;
        label: string;
        icon: string;
        wants: WantsObj[];
    }
    interface WantsObj {
        bundleName: string | undefined;
        abilityName: string;
    }
    interface ModuleOptObj {
        module: ModuleObj;
        app: AppObj;
    }
}
