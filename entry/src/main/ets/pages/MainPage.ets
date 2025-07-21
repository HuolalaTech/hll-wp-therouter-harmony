import { Route, TheRouter } from '@therouter/library';
import { IService } from '../service/CustomService';
import { BaseConstant } from 'base';
import { InterceptDemo } from './InterceptDemo';


@Route({ path: BaseConstant.MAIN_PAGE, description: 'Demo首页' })
@Component
export struct MainPage {
  @State text: string = "测试Action"
  @State text1: string = "拦截器"
  @State text2: string = "单例ServiceProvider"
  @State text3: string = "默认（非单例）ServiceProvider"
  @State contentText: string = ""

  build() {
    Column() {
      Text(this.contentText)
        .height(40)
        .margin({ bottom: 10, top: 40 })
      Button("跳到模块A(HSP)")
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.build(BaseConstant.PAGE_A1).navigation();
        })
      Button("跳到模块B(HSP)")
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.build(BaseConstant.PAGE_B1).withString("hello", "来自主模块的参数").navigation();
        })
      Button("跳到模块Base(HAR)")
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.build(BaseConstant.PAGE_BASE1).navigation();
        })
      Button("跳到当前模块的其他页面(HAP)")
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.build(BaseConstant.LIST_PAGE1).withString("hello", "来自首页的参数").navigation();
        })
      Button("页面切换动画demo（华为推荐方案）")
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.build(BaseConstant.ANIM_PAGE1).navigation();
        })
      Button(this.text1)
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          this.text1 = "拦截器已添加，请查看代码示例"
          new InterceptDemo().addIntercept()
        })
      Button('测试远端下发的路由')
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          // 这里演示的是将一个不存在的path，映射到已有的页面上
          // 你也可以通过将已有的路由path，替换到一个提前声明过的页面，达到替换落地页的效果
          TheRouter.build('https://kymjs.com/dynamic/test_demo').navigation();
        })
      Button(this.text)
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          TheRouter.action<string>(BaseConstant.TEST_FUN_WITH_PARAMS, "hello").then((str) => {
            this.text = str;
          })
        })
      Button(this.text2)
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          const service = TheRouter.get<IService>(BaseConstant.CLASS_SERVICE);
          this.text2 = `本次对象为：${service.testFunWithReturn()}`;
        })
      Button(this.text3)
        .height(40)
        .margin({ bottom: 10 })
        .onClick(() => {
          const service = TheRouter.get<IService>(BaseConstant.CLASS_SERVICE2);
          this.text3 = `本次对象为：${service.testFunWithReturn()}`;
        })
    }
    .height('100%')
    .width('100%')
  }

  aboutToAppear(): void {
    TheRouter.inject(this)
    console.log("aboutToAppear entry MainPage")
  }

  aboutToDisappear(): void {
    console.log("aboutToDisappear entry MainPage")
  }
}