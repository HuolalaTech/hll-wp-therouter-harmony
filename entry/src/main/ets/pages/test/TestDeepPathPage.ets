import { Route, TheRouter } from '@therouter/library';
import { DynamicRouteMapDemo } from '../../pages/dynamic/DynamicRouteMapDemo';

@Route({ path: DynamicRouteMapDemo.TEST_DEEP_PATH, launchMode: "MOVE_TO_TOP_SINGLETON" })
@Component
export struct TestDeepPathPage {
  aboutToAppear(): void {
    TheRouter.inject(this)
  }

  build() {
    Column() {
      Text("深层包名的页面")
        .id('List')
        .fontSize(50)
        .margin({ top: 50 })
        .fontWeight(FontWeight.Bold)

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
}