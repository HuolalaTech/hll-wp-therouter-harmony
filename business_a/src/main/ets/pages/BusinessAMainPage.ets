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

  ////////////////////////////////// 如果自定义生命周期方法，必须调用 TheRouter.inject(this) ////////////////////////////////
  onBackPress(): boolean | void {
    console.log("onBackPress business_aMainPage")
    TheRouter.build().withString("hello", "向上个页面传参数").pop()
    // 因为上面调用了 pop()，这里不需要重复调用，所以 return true。
    // 实际业务中，上面的 pop() 也可以是点击某个按钮以后执行。
    return true;
  }

  aboutToAppear(): void {
    TheRouter.inject(this)
    console.log("aboutToAppear business_aMainPage")
  }

  aboutToRecycle(): void {
    console.log("aboutToRecycle business_aMainPage")
  }

  onWillApplyTheme(theme: Theme): void {
    console.log("onWillApplyTheme business_aMainPage")
  }

  onPageShow(): void {
    console.log("onPageShow business_aMainPage")
  }

  onPageHide(): void {
    console.log("onPageHide business_aMainPage")
  }

  onFormRecycle(): string {
    console.log("onFormRecycle business_aMainPage")
    return ""
  }

  onFormRecover(statusData: string): void {
    console.log("onFormRecover business_aMainPage")
  }

  onNewParam(param: ESObject): void {
    console.log("onNewParam business_aMainPage")
  }

  onDidBuild(): void {
    console.log("onDidBuild business_aMainPage")
  }

  aboutToDisappear(): void {
    console.log("aboutToDisappear business_aMainPage")
  }
}