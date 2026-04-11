import type { OptionsType } from "@/components/ReSegmented";

const menuTypeOptions: Array<OptionsType> = [
  {
    label: "選單",
    value: 0
  },
  {
    label: "iframe",
    value: 1
  },
  {
    label: "外鏈",
    value: 2
  },
  {
    label: "按鈕",
    value: 3
  }
];

const showLinkOptions: Array<OptionsType> = [
  {
    label: "顯示",
    tip: "會在選單中顯示",
    value: true
  },
  {
    label: "隱藏",
    tip: "不會在選單中顯示",
    value: false
  }
];

const fixedTagOptions: Array<OptionsType> = [
  {
    label: "固定",
    tip: "當前選單名稱固定顯示在標籤頁且不可關閉",
    value: true
  },
  {
    label: "不固定",
    tip: "當前選單名稱不固定顯示在標籤頁且可關閉",
    value: false
  }
];

const keepAliveOptions: Array<OptionsType> = [
  {
    label: "缓存",
    tip: "會保存該頁面的整体狀態，刷新后會清空狀態",
    value: true
  },
  {
    label: "不缓存",
    tip: "不會保存該頁面的整体狀態",
    value: false
  }
];

const hiddenTagOptions: Array<OptionsType> = [
  {
    label: "允许",
    tip: "當前選單名稱或自定義信息允许添加到標籤頁",
    value: false
  },
  {
    label: "禁止",
    tip: "當前選單名稱或自定義信息禁止添加到標籤頁",
    value: true
  }
];

const showParentOptions: Array<OptionsType> = [
  {
    label: "顯示",
    tip: "會顯示父級選單",
    value: true
  },
  {
    label: "隱藏",
    tip: "不會顯示父級選單",
    value: false
  }
];

const frameLoadingOptions: Array<OptionsType> = [
  {
    label: "開啟",
    tip: "有首次加載動畫",
    value: true
  },
  {
    label: "關閉",
    tip: "無首次加載動畫",
    value: false
  }
];

export {
  menuTypeOptions,
  showLinkOptions,
  fixedTagOptions,
  keepAliveOptions,
  hiddenTagOptions,
  showParentOptions,
  frameLoadingOptions
};
