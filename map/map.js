/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-04-03 10:56:01
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-03 12:57:07
 */
const map = {
  'AtAvatar' : "components/avatar",
  'AtButton' : "components/button",
  'AtCascader' : "components/cascader",
  'AtCertiPicker' : "components/certi-picker",
  'AtCheckbox' : "components/checkbox",
 
  'AtDialog' : "components/dialog",
  'AtDialogContent' : "components/dialog/content",
  'AtDialogAction' : "components/dialog/action",
 
  'AtDivider' : "components/divider",
  'AtFloatLayout' : "components/float-layout",
  'AtForm' : "components/form",
  'AtSelectList' : "components/select-list",
  'AtImagePicker' : "components/image-picker",
  'AtInput' : "components/input",
 
  'AtList' : "components/list",
  'AtListItem' : "components/list/item",
 
  'AtLoading' : "components/loading",
  'AtLongList' : "components/long-list",
  'AtPicker' : "components/picker",
  'AtPreviewImage' : "components/preview-image",
  'AtProgress' : "components/progress",
  'AtRadio' : "components/radio",
  'AtSteps' : "components/steps",
  'AtSwitch' : "components/switch",
 
  'AtTabs' : "components/tabs",
  'AtTabsPane' : "components/tabs-pane",
 
  'AtTip' : "components/tip",
  'AtToast' : "components/toast",
  'Calendar' : "components/calendar",
 
  'AtActionSheet' : "components/action-sheet",
  'AtSwipeAction' : "components/swipe-action",
  'AtTimeline' : "components/timeline",
}
const exludesMap = {
  'AtDialogContent': "components/dialog", 
  'AtDialogAction': "components/dialog", 
  'AtListItem': "components/list", 
  'AtTabsPane': "components/tabs"
}

module.exports = {
  exludesMap,
  map
}