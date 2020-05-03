/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 15:46:17
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-12 13:35:53
 */
/*
 * @Author: your name
 * @Date: 2019-12-27 17:18:43
 * @LastEditTime : 2020-01-17 19:08:52
 * @LastEditors  : lhuanyu
 * @Description: In User Settings Edit
 * @FilePath: \taro-x\src\index.ts
 */
import Taro from "@tarojs/taro";

Taro.initPxTransform({
  designWidth: 750,
  deviceRatio: {}
});

export { default as AtAvatar } from "./components/avatar/index";
export { default as AtButton } from "./components/button/index";
export { default as AtCascader } from "./components/cascader/index";
export { default as AtCertiPicker } from "./components/certi-picker/index";
export { default as AtCheckbox } from "./components/checkbox/index";

export { default as AtDialog } from "./components/dialog/index";
export { default as AtDialogContent } from "./components/dialog/content";
export { default as AtDialogAction } from "./components/dialog/action";

export { default as AtDivider } from "./components/divider/index";
export { default as AtFloatLayout } from "./components/float-layout/index";
export { default as AtForm } from "./components/form/index";
export { default as AtSelectList } from "./components/select-list/index";
export { default as AtImagePicker } from "./components/image-picker/index";
export { default as AtInput } from "./components/input/index";

export { default as AtList } from "./components/list/index";
export { default as AtListItem } from "./components/list/item";

export { default as AtLoading } from "./components/loading/index";
export { default as AtLongList } from "./components/long-list/index";
export { default as AtPicker } from "./components/picker/index";
export { default as AtPreviewImage } from "./components/preview-image/index";
export { default as AtProgress } from "./components/progress/index";
export { default as AtRadio } from "./components/radio/index";
export { default as AtSteps } from "./components/steps/index";
export { default as AtSwitch } from "./components/switch/index";

export { default as AtTabs } from "./components/tabs/index";
export { default as AtTabsPane } from "./components/tabs-pane/index";

export { default as AtTip } from "./components/tip/index";
export { default as AtToast } from "./components/toast/index";
export { default as Calendar } from "./components/calendar/index";
export { default as AtActionSheet } from "./components/action-sheet/index";
export { default as AtSwipeAction } from "./components/swipe-action/index";
export { default as AtTimeline } from "./components/timeline/index";


