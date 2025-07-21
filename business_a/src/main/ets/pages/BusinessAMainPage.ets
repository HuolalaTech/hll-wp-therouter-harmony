import { Route, TheRouter } from '@therouter/library';
import { BaseConstant } from 'base';

@Route({ path: BaseConstant.PAGE_A1, params: ["hello", "路由表默认参数"] })
@Route({ path: BaseConstant.PAGE_A2 })
@Component
export struct BusinessAMainPage {
  build() {
    Column() {
      Text('A').margin({ top: 50 })
      // 因为在顶部注解中加了默认参数，通过 PAGE_A1 打开时，会自动向当前页传递参数 k:v = hello:world
      // 但如果外部也传入了hello的参数，则会覆盖路由上的默认参数
      Text(TheRouter.getCurrentParam()["hello"])
        .id('List')
        .margin({ top: 50 })
      Button("再次打开当前页")
        .height(40)
        .margin({ bottom: 10, top: 40 })
        .onClick(() => {
          TheRouter.build(BaseConstant.PAGE_A1).withString("hello", "来自首页的参数").navigation();
        })
      Button("另一个Path打开当前页(一对多Path)")
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.build(BaseConstant.PAGE_A2).withString("hello", "一对多Path").navigation();
        })
    }
    .height('100%')
    .width('100%')
  }

  /**
   * 如果自定义 onBackPress()，必须调用 TheRouter.inject(this)
   */
  onBackPress(): boolean | void {
    console.log("onBackPress business_aMainPage")
  }

  aboutToAppear(): void {
    TheRouter.inject(this)
    console.log("aboutToAppear business_aMainPage")
  }

  aboutToDisappear(): void {
    console.log("aboutToDisappear business_aMainPage")
  }
}