import { NavigationCallback } from "./NavigationCallback";
import { RouteItem } from "./RouteItem";
import { require } from "../utils/TheRouterUtil";
import { NavigatorManager } from "./NavigatorManager";
import { IAnimator } from "./ui/IAnimator";

/**
 * 路由导航器。与RouterItem作用类似，允许互转。
 * RouterItem 用于描述一个静态的路由项
 * Navigator 用于描述一个路由项的跳转动作
 *
 *
 * TheRouter.build(url).with(k,v)<br>
 * 如果如果没有通过PathFixHandle拦截器修改，且只在build(url)时传入参数，TheRouter会确保参数在getUrlWithParams()导出时完全相同。<br>
 * 如果build(url)时有拼接参数，同时又调用with()传入参数，TheRouter会保证with的参数拼接在url拼接的参数前且在hash字段之前<br>
 * 如果有冲突时，优先使用with()中的kv，例如：<br>
 * TheRouter.build("http://therouter.cn/page?a=b&k=v").withString("c","d").withString("k","x")<br>
 * 调用getUrlWithParams()导出的url为：http://therouter.cn/page?c=d&a=b&k=x<br>
 * 有hash字段时的处理，例如<br>
 * TheRouter.build("https://therouter.cn/page?code=123&a=b#/abc").withString("code","111").withString("k","x")<br>
 * 调用getUrlWithParams()导出的url为：https://therouter.cn/page?k=x&code=111&a=b#/abc<br>
 *
 * <br>
 * 如果url的hash部分包含有参数时，TheRouter也会将参数直接解析出来作为页面跳转参数传递出去，<br>
 * 但如果hash的参数与url的参数出现冲突，会优先取url的参数，例如：<br>
 * TheRouter.build("http://therouter.cn/page?a=b&k=v#/abc&c=d&k=a").navigation()<br>
 * 此时页面参数获取到的将是：a=b、k=v、c=d（k=a被k=v替代）<br>
 * 如果url的hash部分包含有参数但同时又包含有问号时，将会认为hash部分是一个整体，是一个完整的子url，此时不会解析hash部分的参数，例如：<br>
 * TheRouter.build("http://therouter.cn/page?a=b&k=v#/abc?c=d&k=a").navigation()<br>
 * 此时页面参数获取到的将是：a=b、k=v，子串部分不会解析<br>
 *
 */

export const KEY_ANIM = "therouter_intent_animation"

export class Navigator {
  private stackId?: string;
  private readonly param: Map<string, Object> = new Map<string, Object>();
  private launchMode?: LaunchMode;
  private animator?: boolean;
  private pathFixOriginalUrl: string;

  constructor(url?: string) {
    require(url != null, "Navigator", "Navigator constructor parameter url is empty");
    for (const handle of NavigatorManager.getInstance().fixHandles) {
      if (handle && handle.watch(url)) {
        url = handle.fix(url);
      }
    }
    this.pathFixOriginalUrl = url || "";
    this.parseUrl(url);
  }

  public getSimpleUrl(): string {
    return this.pathFixOriginalUrl.includes("?") ?
    this.pathFixOriginalUrl.substring(0, this.pathFixOriginalUrl.indexOf("?")) : this.pathFixOriginalUrl;
  }

  public getUrlWithParams(handle: (key: string, value: string) => string = (k, v) => `${k}=${v}`): string {
    let paramsString = "";
    let isFirst = true;

    if (this.param != null) {
      for (const key of Object.keys(this.param)) {
        const kv = handle(key, this.param.get(key)?.toString() ?? "");
        if (kv.trim() !== "") {
          if (isFirst) {
            isFirst = false;
            paramsString += kv;
          } else {
            paramsString += ("&" + kv);
          }
        }
      }
    }

    let url = this.pathFixOriginalUrl || "";
    let query = "";
    let fragment = "";

    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
      query = url.substring(queryIndex + 1);
      url = url.substring(0, queryIndex);
    }

    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      fragment = url.substring(hashIndex);
      url = url.substring(0, hashIndex);
    }

    let newUrl = "";

    if (paramsString === "") {
      newUrl = this.pathFixOriginalUrl;
    } else if (query.trim() !== "") {
      if (!query.startsWith('&')) {
        paramsString += "&";
      }
      paramsString += query;
      newUrl = this.pathFixOriginalUrl.replace(query, paramsString);
    } else if (fragment.trim() !== "") {
      const index = this.pathFixOriginalUrl.indexOf(fragment);
      if (index !== -1) {
        const temp = this.pathFixOriginalUrl.substring(0, index);
        if (temp.indexOf('?') !== -1) {
          newUrl = this.pathFixOriginalUrl.replace("?", "?" + paramsString);
        } else {
          newUrl = this.pathFixOriginalUrl.replace("#", "?" + paramsString + "#");
        }
      } else {
        newUrl = this.pathFixOriginalUrl;
      }
    } else if (this.pathFixOriginalUrl.indexOf('?') !== -1) {
      newUrl = this.pathFixOriginalUrl.replace("?", "?" + paramsString);
    } else {
      newUrl = this.pathFixOriginalUrl + "?" + paramsString;
    }

    return newUrl;
  }

  public getStackId(): string {
    return this.stackId || '';
  }

  public getLaunchMode(): LaunchMode {
    return toLaunchMode(this.launchMode?.toString());
  }

  public toRouteItem(): RouteItem {
    const p: ESObject = {}
    if (this.param != null) {
      for (const k of this.param.keys()) {
        p[k] = this.param.get(k);
      }
    }
    return {
      stackId: this.stackId,
      path: this.getSimpleUrl(),
      param: p,
      launchMode: this.getLaunchMode().toString(),
      animator: this.animator,
    };
  }

  public with(o: ESObject): Navigator {
    if (o != null) {
      for (const k of Object.keys(o)) {
        this.param.set(k, o[k]);
      }
    }
    return this;
  }

  public isSingleton(): Navigator {
    this.launchMode = LaunchMode.MOVE_TO_TOP_SINGLETON;
    return this;
  }

  public withLaunchMode(mode?: LaunchMode): Navigator {
    this.launchMode = mode;
    return this;
  }

  public withString(key?: string, value?: string): Navigator {
    this.param.set(key || '', value || '');
    return this;
  }

  public withBoolean(key?: string, value?: boolean): Navigator {
    this.param.set(key || '', `${value}` || '');
    return this;
  }

  public withNumber(key?: string, value?: number): Navigator {
    this.param.set(key || '', `${value}` || '');
    return this;
  }

  public withStackId(stackId?: string): Navigator {
    this.stackId = stackId;
    return this;
  }

  public withAnimation(animator?: boolean | IAnimator): Navigator {
    if (animator == undefined) {
      this.animator = undefined;
    } else if (animator == true) {
      this.animator = true;
    } else if (animator == false) {
      this.animator = false;
    } else {
      this.animator = true;
      this.param.set(KEY_ANIM, animator);
    }
    return this;
  }

  public fillParams(action: (o: Map<string, Object>) => void): Navigator {
    action(this.param);
    return this;
  }

  public navigation(callback?: NavigationCallback) {
    NavigatorManager.getInstance()
      .navigation(NavigationOperation.PUSH, this, callback || NavigatorManager.getInstance().defaultCallback);
  }

  public replace(callback?: NavigationCallback) {
    NavigatorManager.getInstance()
      .navigation(NavigationOperation.REPLACE, this, callback || NavigatorManager.getInstance().defaultCallback);
  }

  public pop(skipedLayerNumber?: number): void {
    NavigatorManager.getInstance().pop(this.toRouteItem(), skipedLayerNumber);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private parser(paramString: string | null | undefined, appendValue: string | null | undefined = "") {
    if (paramString && paramString.trim() !== "=") {
      const index = paramString.indexOf("=");

      let key = "";
      let value = "";

      switch (index) {
        case -1:
          key = paramString;
          break;
        case 0:
          value = paramString.substring(1);
          break;
        default:
          key = paramString.substring(0, index);
          value = paramString.substring(index + 1);
          break;
      }

      if (appendValue?.trim()) {
        value += appendValue;
      }

      if (key.trim() || value.trim()) {
        this.param.set(key, value);
      }
    }
  }

  private parserString(url: string | null | undefined) {
    if (url?.includes('?')) {
      const index = url.indexOf('?');
      if (index > -1) {
        const item1 = url.substring(0, index);
        // `?` 后面的部分作为参数直接拼接
        const appendValue = url.substring(index + 1);
        const list = item1.split('&');

        if (list.length > 0) {
          list.forEach((item, i) => {
            if (i === list.length - 1) {
              this.parser(item, appendValue);
            } else {
              this.parser(item);
            }
          });
        }
      }
    } else {
      url?.split("&").forEach(str => {
        this.parser(str);
      });
    }
  }

  private parseUrl(url: string | null | undefined) {
    url = url || "";

    let encodedFragment = "";
    let encodedQuery = "";

    // 找到 `#` 之后的部分（Fragment）
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      encodedFragment = url.substring(hashIndex); // 包含 `#`
      url = url.substring(0, hashIndex); // 移除 fragment，避免影响 query 解析
    }

    // 找到 `?` 之后的部分（Query）
    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
      encodedQuery = url.substring(queryIndex+1); // 不包含 `?`
    }

    this.parserString(encodedFragment); // 对应 Kotlin 的 uri.encodedFragment
    this.parserString(encodedQuery); // 对应 Kotlin 的 uri.encodedQuery
  }
}

export function toLaunchMode(mode?: string): LaunchMode {
  switch (mode || '') {
    case 'STANDARD':
    case '0':
      return LaunchMode.STANDARD;
    case 'MOVE_TO_TOP_SINGLETON':
    case '1':
      return LaunchMode.MOVE_TO_TOP_SINGLETON;
    case 'POP_TO_SINGLETON':
    case '2':
      return LaunchMode.POP_TO_SINGLETON;
    case 'NEW_INSTANCE':
    case '3':
      return LaunchMode.NEW_INSTANCE;
    default:
      return LaunchMode.STANDARD;
  }
}