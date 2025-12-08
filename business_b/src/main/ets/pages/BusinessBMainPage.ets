import { Route, TheRouter } from '@therouter/library';
import { BaseConstant } from 'base';

@Route({ path: BaseConstant.PAGE_B1 })
@Component
export struct BusinessBMainPage {
  build() {
    Column() {
      Text('B')
      Button("跳到模块A")
        .height(40)
        .margin({ bottom: 10, top: 40 })
        .onClick(() => {
          TheRouter.build(BaseConstant.PAGE_A1).withString("hello", "来自首页的参数").navigation();
        })
      Button("跳到模块A：一对多Path")
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.build(BaseConstant.PAGE_A2).withString("hello", "一对多Path").navigation();
        })
    }
    .height('100%')
    .width('100%')
  }

  aboutToAppear(): void {
    // 所有生命周期方法，均依赖 inject() 的执行
    TheRouter.inject(this)
    console.log("aboutToAppear business_b MainPage")
  }

  aboutToDisappear(): void {
    console.log("aboutToDisappear business_b MainPage")
  }

  /**
   * onAppear 的执行时机比较特殊，是在 inject() 调用的时候执行的
   */
  onAppear(event: () => void): CommonAttribute {
    console.log("onAppear business_b BusinessBMainPage")
    return this
  }

  onDisAppear(event: () => void): CommonAttribute {
    console.log("onDisAppear business_b BusinessBMainPage")
    return this
  }

  onShown() {
    console.log("onShown business_b BusinessBMainPage")
  }

  onPageShow(): void {
    console.log("onPageShow business_b BusinessBMainPage")
  }

  onPageHide(): void {
    console.log("onPageHide business_b BusinessBMainPage")
  }

  onHidden() {
    console.log("onHidden business_b BusinessBMainPage")
  }

  onWillAppear() {
    console.log("onWillAppear business_b BusinessBMainPage")
  }

  onWillDisappear() {
    console.log("onWillDisappear business_b BusinessBMainPage")
  }

  onWillShow() {
    console.log("onWillShow business_b BusinessBMainPage")
  }

  onWillHide() {
    console.log("onWillHide business_b BusinessBMainPage")
  }

  onBackPress(): boolean | void {
    console.log("onBackPress business_b BusinessBMainPage")
  }
}