import { RouteItem } from './router/RouteItem';
import { toNavigator } from './router/RouteItem';
import { RouterInject } from './router/inject/RouterInject';
import { Navigator } from './router/Navigator';
import { NavigatorManager } from './router/NavigatorManager';
import { common } from '@kit.AbilityKit';
import { IServiceProvider } from './router/Route';
import { RouterReplaceInterceptor } from './router/RouterReplaceInterceptor';
import { PathReplaceInterceptor } from './router/PathReplaceInterceptor';
import { NavigatorPathFixHandle } from './router/NavigatorPathFixHandle';
import { NavigationCallback } from './router/NavigationCallback';
import { TheRouterStack } from './router/TheRouterStack';
import { inject } from './router/inject/AutowiredInject';
import { RouterUtil } from './utils/RouterUtil';
import { IAnimator } from './router/ui/IAnimator';
import { AnimatorUtil } from './router/ui/AnimatorUtil';

export class TheRouter {
  public static isInit: boolean = false;
  public static isDebug: boolean = false;
  public static context: common.Context;
  public static bundleName: string = ''
  public static logCat: (tag: string, msg: string) => void | null = (_, msg) => {
  };

  /**
   * 初始化方法，建议在UIAbility中调用
   * @param context
   * @param initWithTaskPool
   */
  static init(context: common.Context, initWithTaskPool: boolean = false): void {
    if (!TheRouter.isInit) {
      TheRouter.isInit = true;
      TheRouter.bundleName = RouterUtil.getBundleName();
      TheRouter.context = context;
      RouterInject.getInstance().init(context, initWithTaskPool);
    }
  }

  /**
   * 创建路由导航
   * @param url
   * @returns
   */
  static build(url?: string | RouteItem): Navigator {
    if (typeof url === "string") {
      return new Navigator(url);
    } else if (url == null) {
      return new Navigator("");
    } else {
      return toNavigator(url);
    }
  }

  static inject(obj: ESObject, stackId?: string) {
    inject(obj, stackId)
  }

  /**
   * 判断 url 是否为 TheRouter 的 Action
   * Path 会被记录到路由表内，Action不会被记录，Action更像是一个消息事件，参考Android的广播
   */
  static isRouterAction(path: string): boolean {
    return RouterInject.getInstance().isRouterAction(path)
  }

  /**
   * 判断 url 是否为 TheRouter 的路由 Path
   * Path 会被记录到路由表内，Action不会被记录，Action更像是一个消息事件，参考Android的广播
   */
  static isRouterPath(path: string): boolean {
    return RouterInject.getInstance().matchRouteMap(path) != null
  }

  /**
   * 获取指定UI栈的参数，缺省时返回当前栈
   * @param stackId
   * @returns
   */
  static getCurrentParam(stackId?: string): ESObject {
    return NavigatorManager.getInstance().getCurrentParam(stackId);
  }

  /**
   * 获取指定 Path 的 Builder
   * @returns
   */
  static getPageBuilder(path: string): ESObject | undefined {
    return RouterInject.getInstance().getBuilderByPath(path)?.builder();
  }

  /**
   * 获取指定服务提供者提供的服务
   * @param serviceProvider
   * @returns
   */
  static get<T extends IServiceProvider>(serviceProvider: string): T {
    return RouterInject.getInstance().getService<T>(serviceProvider);
  }

  /**
   * 执行一个远程action
   * @param action
   * @param args 待响应的方法入参
   * @returns 远端方法执行后的返回值
   */
  static action<Return>(action: string, ...args: Object[]): Promise<Return> {
    return RouterInject.getInstance().action<Return>(action, ...args);
  }

  /**
   * 设置自定义路由表初始化逻辑，目前设置后会立刻调用自定义初始化逻辑，后续可能会修改初始化方式，但对外接口不会改变
   */
  static setRouteMapInitTask(task: () => string) {
    RouterInject.getInstance().addRemoteRouteMap(task())
  }

  static getPathStack(stackId?: string): TheRouterStack | null {
    return NavigatorManager.getInstance().getPathStack(stackId);
  }

  /**
   * 自定义全局路由跳转动画
   *
   * TheRouter跳转动画共有三处设置方式，可以对全局设置，可以对指定stack设置，可以对指定跳转设置。后者会覆盖前者，此处为全局生效的跳转动画。
   */
  static defaultNavigatorAnimation(anim?: IAnimator) {
    AnimatorUtil.defaultAnimator = anim;
  }

  /**
   * 自定义全局路由跳转结果回调
   *
   * 如果使用TheRouter跳转，传入了一个不识别的的path，则不会有任何处理。你也可以定义一个默认的全局回调，来处理跳转情况，如果落地页是 Fragment 则不会回调。
   * 当然，跳转结果的回调不止这一个用途，可以根据业务有自己的处理。
   * 回调也可以单独为某一次跳转设置，navigation()方法有重载可以传入设置。
   */
  static defaultNavigationCallback(callback?: NavigationCallback) {
    if (callback) {
      NavigatorManager.getInstance().defaultCallback = callback
    }
  }

  /**
   * 应用场景：用于修复客户端上路由 path 错误问题。
   * 例如：相对路径转绝对路径，或由于服务端下发的链接无法固定https或http，但客户端代码写死了 https 的 path，就可以用这种方式统一。
   * 注：必须在 TheRouter.build() 方法调用前添加处理器，否则处理器前的所有path不会被修改。
   */
  static addNavigatorPathFixHandle(handle: NavigatorPathFixHandle) {
    NavigatorManager.getInstance().fixHandles.add(handle)
    NavigatorManager.getInstance().fixHandles.sort((first, second) => {
      let result = 0;
      if (first == null) {
        result = -1
      } else if (second == null) {
        result = 1
      } else {
        result = first.priority - second.priority
      }
      return result;
    })
  }

  /**
   * 移除Path修改器
   */
  static removeNavigatorPathFixHandle(interceptor: NavigatorPathFixHandle): Boolean {
    return NavigatorManager.getInstance().fixHandles.remove(interceptor)
  }

  /**
   * 页面替换器
   * 应用场景：需要将某些path指定为新链接的时候使用。 也可以用在修复链接的场景，但是与 path 修改器不同的是，修改器通常是为了解决通用性的问题，替换器只在页面跳转时才会生效，更多是用来解决特性问题。
   *
   * 例如模块化的时候，首页壳模板组件中开发了一个SplashActivity广告组件作为应用的MainActivity，在闪屏广告结束的时候自动跳转业务首页页面。 但是每个业务不同，首页页面的 Path 也不相同，而不希望让每个业务线自己去改这个首页壳模板组件，此时就可以组件中先写占位符https://kymjs.com/splash/to/home，让接入方通过 Path 替换器解决。
   * 注：必须在 TheRouter.build().navigation() 方法调用前添加处理器，否则处理器前的所有跳转不会被替换。
   */
  static addPathReplaceInterceptor(interceptor: PathReplaceInterceptor) {
    NavigatorManager.getInstance().pathReplaceInterceptors.add(interceptor)
    NavigatorManager.getInstance().pathReplaceInterceptors.sort((first, second) => {
      let result = 0;
      if (first == null) {
        result = -1
      } else if (second == null) {
        result = 1
      } else {
        result = first.priority - second.priority
      }
      return result;
    })
  }

  static removePathReplaceInterceptor(interceptor: PathReplaceInterceptor): boolean {
    return NavigatorManager.getInstance().pathReplaceInterceptors.remove(interceptor)
  }

  /**
   * 路由替换器
   * 应用场景：常用在未登录不能使用的页面上。例如访问用户钱包页面，在钱包页声明的时候，可以在路由表上声明本页面是需要登录的，在路由跳转过程中，如果落地页是需要登录的，则先替换路由到登录页，同时将原落地页信息作为参数传给登录页，登录流程处理完成后可以继续执行之前的路由操作。
   *
   * 路由替换器的拦截点更靠后，主要用于框架已经从路由表中根据 path 找到路由以后，对找到的路由做操作。
   *
   * 这种逻辑在所有页面跳转前写不太合适，以前的做法通常是在落地页写逻辑判断用户是否具有权限，但其实在路由层完成更合适。
   * 注：必须在 TheRouter.build().navigation() 方法调用前添加处理器，否则处理器前的所有跳转不会被替换。
   */
  static addRouterReplaceInterceptor(interceptor: RouterReplaceInterceptor) {
    NavigatorManager.getInstance().routerReplaceInterceptors.add(interceptor);
    NavigatorManager.getInstance().routerReplaceInterceptors.sort((first, second) => {
      let result = 0;
      if (first == null) {
        result = -1
      } else if (second == null) {
        result = 1
      } else {
        result = first.priority - second.priority
      }
      return result;
    })
  }

  static removeRouterReplaceInterceptor(interceptor: RouterReplaceInterceptor): boolean {
    return NavigatorManager.getInstance().routerReplaceInterceptors.remove(interceptor);
  }

  /**
   * 路由AOP拦截器
   * 与前三个处理器不同的点在于，路由的AOP拦截器全局只能有一个。用于实现AOP的能力，在整个TheRouter跳转的过程中，跳转前，目标页是否找到的回调，跳转时，跳转后，都可以做一些自定义的逻辑处理。
   *
   * 使用场景：场景很多，最常用的是可以拦截一些跳转，例如debug页面在生产环境不打开，或定制startActivity跳转方法。
   */
  public setRouterInterceptor(interceptor: (route: RouteItem, callback: (route: RouteItem) => void) => void) {
    NavigatorManager.getInstance().routerInterceptor = interceptor;
  }
}
