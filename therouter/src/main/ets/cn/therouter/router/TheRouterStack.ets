import { router } from '@kit.ArkUI';
import { RouterUtil } from '../utils/RouterUtil';
import { RouteItem } from './RouteItem';
import { KEY_ANIM, toLaunchMode } from './Navigator';
import { TheRouter } from '../TheRouter';
import { IAnimator } from './ui/IAnimator';

/**
 * 当前页面的Stack，框架外部一般不需要关心
 */
export class TheRouterStack extends NavPathStack {
  public uiContext: UIContext;
  public stackId: string;
  public hideNavbar: boolean;
  private changeLastStackId: (s: string) => void;
  private currentNdId = ''
  private currentPageId = ''
  private pageStack: Map<string, ESObject> = new Map();
  private defaultPageAnimator?: IAnimator;
  private currentAnimator?: IAnimator;

  constructor(uiContext: UIContext, stackId: string, hideNavbar: boolean, changeLastStackId: (s: string) => void) {
    super();
    this.uiContext = uiContext;
    this.stackId = stackId;
    this.hideNavbar = hideNavbar;
    this.changeLastStackId = changeLastStackId;
  }

  setDefaultAnimator(defaultAnimator?: IAnimator) {
    this.defaultPageAnimator = defaultAnimator;
  }

  getCurrentAnimator(): IAnimator | undefined {
    if (this.currentAnimator) {
      const result = this.currentAnimator;
      this.currentAnimator = undefined;
      return result;
    }
    return this.defaultPageAnimator;
  }

  changePageId(pageId: string, ndId: string) {
    this.currentNdId = ndId;
    this.currentPageId = pageId
  }

  registerPage(obj: ESObject) {
    this.pageStack.set(this.currentPageId, obj);
  }

  getPage(pageId: string): ESObject {
    return this.pageStack.get(pageId);
  }

  removePage(pageId: string): ESObject {
    return this.pageStack.delete(pageId);
  }

  navigation(type: NavigationOperation, routeItem: RouteItem,
    onResult?: (navigator: RouteItem, popInfo: PopInfo) => void): void {
    try {
      if (routeItem.param) {
        this.currentAnimator = routeItem.param[KEY_ANIM]
      } else {
        this.currentAnimator = undefined;
      }
      const info: NavPathInfo = {
        name: routeItem.path!,
        param: routeItem.param,
        onPop: (info: PopInfo) => {
          try {
            onResult?.(routeItem, info);
          } catch (e) {
            if (TheRouter.isDebug) {
              throw new Error(`onResult() error：${e}`);
            }
          }
        }
      };
      const options: NavigationOptions = {
        launchMode: toLaunchMode(routeItem.launchMode),
        animated: routeItem.animator
      };
      if (type === NavigationOperation.PUSH) {
        super.pushPath(info, options);
      } else if (type === NavigationOperation.REPLACE) {
        super.replacePath(info, options);
      } else {
        return;
      }
    } catch (e) {
    }
  }

  popPage(routeItem: RouteItem, targetPageInfo?: RouterUtil.PageInfo) {
    const srcPageInfo = RouterUtil.getSrcPage(this);
    if (targetPageInfo && (srcPageInfo.index <= targetPageInfo.index)) {
      return;
    }
    const oldPageUrl = routeItem.path;
    if (oldPageUrl !== routeItem.path) {
      targetPageInfo = RouterUtil.getTargetPage(this, routeItem.path);
    }

    if (!targetPageInfo) {
      return;
    }

    try {
      if (routeItem.param) {
        this.currentAnimator = routeItem.param[KEY_ANIM];
      } else {
        this.currentAnimator = undefined;
      }
      if (srcPageInfo!.index - targetPageInfo!.index >= 2) {
        super.popToIndex(targetPageInfo!.index + 1, false);
      }
      const popParam: ESObject = {
        srcPage: srcPageInfo.name,
        srcPageIndex: srcPageInfo.index,
        srcPageParam: super.getParamByIndex(srcPageInfo.index),
        param: routeItem.param
      };
      if (this.hideNavbar && targetPageInfo!.index === -1) { // When returning to the blank home page
        const parentPathStack = super.getParent();
        if (parentPathStack) {
          parentPathStack.pop(popParam, routeItem?.animator);
          this.changeLastStackId((parentPathStack as TheRouterStack).stackId);
        } else {
          router.back();
          this.changeLastStackId('');
        }
      } else {
        super.pop(popParam, routeItem?.animator);
        this.changeLastStackId(this.stackId);
      }
    } catch (e) {
    }
  }

  pushPath(info: NavPathInfo, animated?: boolean | undefined): void

  pushPath(info: NavPathInfo, options?: NavigationOptions | undefined): void

  pushPath(info: NavPathInfo, options?: NavigationOptions | boolean | undefined): void {
    TheRouter.build(info.name)
      .with(info.param)
      .withAnimation(typeof options === 'boolean' ? undefined : options?.animated)
      .withLaunchMode(typeof options === 'boolean' ? LaunchMode.STANDARD : options?.launchMode)
      .navigation({
        onResult: (r, p) => {
          info?.onPop?.(p);
        }
      });
  }

  pushPathByName(name: string, param: Object, animated?: boolean | undefined): void

  pushPathByName(name: string, param: Object, onPop: Callback<PopInfo>, animated?: boolean | undefined): void

  pushPathByName(name: string, param: Object, onPop?: boolean | undefined | Callback<PopInfo>,
    animated?: boolean | undefined): void {
    TheRouter.build(name)
      .with(param)
      .withAnimation(animated)
      .navigation({
        onResult: (r, p) => {
          typeof onPop === 'function' ? onPop?.(p) : undefined;
        }
      });
  }

  pushDestination(info: NavPathInfo, animated?: boolean | undefined): Promise<void>

  pushDestination(info: NavPathInfo, options?: NavigationOptions | undefined): Promise<void>

  pushDestination(info: NavPathInfo, options?: NavigationOptions | boolean | undefined): Promise<void> {
    TheRouter.build(info.name)
      .with(info.param)
      .withAnimation(typeof options === 'boolean' ? undefined : options?.animated)
      .withLaunchMode(typeof options === 'boolean' ? LaunchMode.STANDARD : options?.launchMode)
      .navigation({
        onResult: (r, p) => {
          info?.onPop?.(p);
        }
      });
    return Promise.resolve();
  }

  pushDestinationByName(name: string, param: Object, animated?: boolean | undefined): Promise<void>

  pushDestinationByName(name: string, param: Object, onPop: Callback<PopInfo>,
    animated?: boolean | undefined): Promise<void>

  pushDestinationByName(name: string, param: Object, onPop?: Callback<PopInfo> | boolean | undefined,
    animated?: boolean | undefined): Promise<void> {
    TheRouter.build(name)
      .with(param)
      .withAnimation(animated)
      .navigation({
        onResult: (r, p) => {
          typeof onPop === 'function' ? onPop?.(p) : undefined;
        }
      });
    return Promise.resolve();
  }

  replacePath(info: NavPathInfo, animated?: boolean | undefined): void

  replacePath(info: NavPathInfo, options?: NavigationOptions | undefined): void

  replacePath(info: NavPathInfo, options?: NavigationOptions | boolean | undefined): void {
    TheRouter.build(info.name)
      .with(info.param)
      .withAnimation(typeof options === 'boolean' ? undefined : options?.animated)
      .withLaunchMode(typeof options === 'boolean' ? LaunchMode.STANDARD : options?.launchMode)
      .replace({
        onResult: (r, p) => {
          info?.onPop?.(p);
        }
      });
  }

  replacePathByName(name: string, param: Object, animated?: boolean | undefined): void {
    TheRouter.build(name)
      .with(param)
      .withAnimation(animated)
      .replace();
  }

  pop(animated?: boolean | undefined): NavPathInfo | undefined

  pop(result: Object, animated?: boolean | undefined): NavPathInfo | undefined

  pop(result?: Object, animated?: boolean | undefined): NavPathInfo | undefined {
    const targetPageInfo = RouterUtil.getTargetPage(this);
    this.popPage({
      path: targetPageInfo?.name,
      param: result,
      animator: animated
    }, targetPageInfo);
    return targetPageInfo ? {
      name: targetPageInfo.name
    } : undefined;
  }

  popToName(name: string, animated?: boolean | undefined): number

  popToName(name: string, result: Object, animated?: boolean | undefined): number

  popToName(name: string, result?: Object, animated?: boolean | undefined): number {
    const targetPageInfo = RouterUtil.getTargetPage(this, name);
    this.popPage({
      path: name,
      param: result,
      animator: animated,
    }, targetPageInfo);
    return targetPageInfo?.index ?? -1;
  }

  popToIndex(index: number, animated?: boolean | undefined): void

  popToIndex(index: number, result: Object, animated?: boolean | undefined): void

  popToIndex(index: number, result?: Object, animated?: boolean | undefined): void {
    const targetPageInfo = RouterUtil.getTargetPage(this, undefined, this.size() - index - 2);
    this.popPage({
      path: targetPageInfo?.name,
      param: result,
      animator: animated
    }, targetPageInfo);
  }
}