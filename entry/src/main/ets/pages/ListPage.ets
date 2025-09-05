import { Autowired, NavigationCallback, Route, RouteItem, TheRouter } from '@therouter/library';
import { BaseConstant } from 'base';

@Route({ path: BaseConstant.LIST_PAGE, launchMode: "MOVE_TO_TOP_SINGLETON" })
@Route({ path: BaseConstant.LIST_PAGE1, launchMode: "MOVE_TO_TOP_SINGLETON" })
@Route({ path: BaseConstant.LIST_PAGE2, launchMode: "MOVE_TO_TOP_SINGLETON" })
@Component
export struct ListPage {
  @State content: string = '';
  @Autowired()
  hello: string = '';
  @Autowired('createCount')
  count: string = '';

  aboutToAppear(): void {
    TheRouter.inject(this)
    this.content = "第" + (this.count || 0) + "次触发进入"
  }

  build() {
    Column() {
      Text(this.hello)
        .id('List')
        .fontSize(50)
        .margin({ top: 50 })
        .fontWeight(FontWeight.Bold)

      Text(this.content)
        .id('List')
        .margin({ top: 50 })

      Button('非单例模式再次开启当前页')
        .margin({ top: 50 })
        .onClick(() => {
          const defaultCallback: NavigationCallback = {
            onResult: (routeItem: RouteItem, popInfo: PopInfo) => {
            },
            onArrival: (navigator) => {
              // 需要刷新 content
              // 如果需要更新内容，有两种办法，
              // 要么重调用 TheRouter.inject(this)
              // 要么手动获取数据 TheRouter.getCurrentParam()['createCount']
              this.content = "第" + (TheRouter.getCurrentParam()['createCount'] || 0) + "次触发进入"
            },
            onLost: (navigator) => {
            }
          };
          TheRouter.build(BaseConstant.LIST_PAGE + "?hello=非单例")
            .withNumber("createCount", (Number.parseInt(TheRouter.getCurrentParam()['createCount']) || 0) + 1)
            .navigation(defaultCallback);
        })

      Button('单例模式再次开启当前页')
        .margin({ top: 50 })
        .onClick(() => {
          const defaultCallback: NavigationCallback = {
            onResult: (routeItem: RouteItem, popInfo: PopInfo) => {
            },
            onArrival: (navigator) => {
              // 需要刷新 content
              // 如果需要更新内容，有两种办法，
              // 要么重调用 TheRouter.inject(this)
              // 要么手动获取数据 TheRouter.getCurrentParam()['createCount']
              this.content = "第" + (TheRouter.getCurrentParam()['createCount'] || 0) + "次触发进入"
            },
            onLost: (navigator) => {
            }
          };
          TheRouter.build(BaseConstant.LIST_PAGE + "?hello=单例")
            .isSingleton()// 等价于后一句.withLaunchMode(LaunchMode.MOVE_TO_TOP_SINGLETON)，另外也可以直接通过注解定义默认launchMode
            // .withLaunchMode(LaunchMode.MOVE_TO_TOP_SINGLETON) // 与上一句效果相同，另外也可以直接通过注解定义默认launchMode
            .withNumber("createCount", (Number.parseInt(TheRouter.getCurrentParam()['createCount']) || 0) + 1)
            .navigation(defaultCallback);
        })

      Button('无动画关闭当前页')
        .margin({ top: 50 })
        .onClick(() => {
          TheRouter.build().withAnimation(false).pop()
        })
      Button('有动画关闭当前页')
        .margin({ top: 50 })
        .onClick(() => {
          TheRouter.build().pop()
        })
    }
    .height('100%')
    .width('100%')
  }

  onPageShow(): void {
    console.log("onPageShow", "entry")
  }

  /**
   * 如果自定义 onBackPress()，必须调用 TheRouter.inject(this)
   */
  onBackPress(): boolean | void {
    console.log("onBackPress", "entry")
  }
}