import type { CSSProperties, VNode, Component } from "vue";

type DoneFn = (cancel?: boolean) => void;
type EventType = "open" | "close" | "openAutoFocus" | "closeAutoFocus";
type ArgsType = {
  /** `cancel` 點選取消按鈕、`sure` 點選確定按鈕、`close` 點選右上角關閉按鈕或空白頁或按下了 `esc` 鍵 */
  command: "cancel" | "sure" | "close";
};
type ButtonType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "text";

type DrawerProps = {
  /** `Drawer` 的顯示与隱藏 */
  visible?: boolean;
  /** `Drawer` 自身是否插入至 `body` 元素上。嵌套的 `Drawer` 必须指定該属性并赋值為 `true`，預設 `false` */
  appendToBody?: boolean;
  /** 挂載到哪个 `DOM` 元素，會覆盖 `appendToBody` 属性，預設 `body` */
  appendTo?: string;
  /** 是否在 `Drawer` 出現時將 `body` 滚動锁定，預設 `true` */
  lockScroll?: boolean;
  /** 關閉前的回調，會暫停 `Drawer` 的關閉，回調函数内執行 `done` 参数方法的時候才是真正關閉對話框的時候 */
  beforeClose?: (done: DoneFn) => void;
  /** 是否可以通過點選 `modal` 關閉 `Drawer` ，預設 `true` */
  closeOnClickModal?: boolean;
  /** 是否可以通過按下 `ESC` 關閉 `Drawer` ，預設 `true` */
  closeOnPressEscape?: boolean;
  /** 是否顯示關閉按鈕，預設 `true` */
  showClose?: boolean;
  /** `Drawer` 打開的延時時間，單位毫秒，預設 `0` */
  openDelay?: number;
  /** `Drawer` 關閉的延時時間，單位毫秒，預設 `0` */
  closeDelay?: number;
  /** `Drawer` 自定義类名 */
  class?: string;
  /** `Drawer` 的自定義樣式 */
  style?: CSSProperties;
  /** 控制是否在關閉 `Drawer` 之后將子元素全部销毁，預設 `false` */
  destroyOnClose?: boolean;
  /** 是否需要遮罩層，預設 `true` */
  modal?: boolean;
  /** 是否允许穿透遮罩層，預設 `false`。使用時需將 `modal` 属性設定為 `false` */
  modalPenetrable?: boolean;
  /** `Drawer` 打開的方向，預設 `rtl` */
  direction?: "rtl" | "ltr" | "ttb" | "btt";
  /** 是否啟用可調整大小的功能，預設 `false` */
  resizable?: boolean;
  /** `Drawer` 窗体的大小, 當使用 `number` 類型時, 以像素為單位, 當使用 `string` 類型時, 請传入 `'x%'`, 否则便會以 `number` 類型解释，預設 `30%` */
  size?: string | number;
  /** `Drawer` 的標題 */
  title?: string;
  /** 控制是否顯示 `header` 欄, 預設為 `true`, 當此项為 `false` 時, `title attribute` 和 `title slot` 均不生效 */
  withHeader?: boolean;
  /** 遮罩層的自定義类名 */
  modalClass?: string;
  /** `header` 部分的自定義 `class` 名 */
  headerClass?: string;
  /** `body` 部分的自定義 `class` 名 */
  bodyClass?: string;
  /** `footer` 部分的自定義 `class` 名 */
  footerClass?: string;
  /** 設定 `z-index` */
  zIndex?: number;
  /** `header` 的 `aria-level` 属性，預設 `2` */
  headerAriaLevel?: string;
};

//element-plus.org/zh-CN/component/popConfirm.html#attributes
type PopConfirm = {
  /** 標題 */
  title?: string;
  /** 確認按鈕文字 */
  confirmButtonText?: string;
  /** 取消按鈕文字 */
  cancelButtonText?: string;
  /** 確認按鈕類型，預設 `primary` */
  confirmButtonType?: ButtonType;
  /** 取消按鈕類型，預設 `text` */
  cancelButtonType?: ButtonType;
  /** 自定義圖标，預設 `QuestionFilled` */
  icon?: string | Component;
  /** `Icon` 颜色，預設 `#f90` */
  iconColor?: string;
  /** 是否隱藏 `Icon`，預設 `false` */
  hideIcon?: boolean;
  /** 關閉時的延迟，預設 `200` */
  hideAfter?: number;
  /** 是否將 `popover` 的下拉列表插入至 `body` 元素，預設 `true` */
  teleported?: boolean;
  /** 當 `popover` 組件長時間不触发且 `persistent` 属性設定為 `false` 時, `popover` 將會被删除，預設 `false` */
  persistent?: boolean;
  /** 彈層寬度，最小寬度 `150px`，預設 `150` */
  width?: string | number;
};

type BtnClickDrawer = {
  options?: DrawerOptions;
  index?: number;
};
type BtnClickButton = {
  btn?: ButtonProps;
  index?: number;
};
/** https://element-plus.org/zh-CN/component/button.html#button-attributes */
type ButtonProps = {
  /** 按鈕文字 */
  label: string;
  /** 按鈕尺寸 */
  size?: "large" | "default" | "small";
  /** 按鈕類型 */
  type?: "primary" | "success" | "warning" | "danger" | "info";
  /** 是否為朴素按鈕，預設 `false` */
  plain?: boolean;
  /** 是否為文字按鈕，預設 `false` */
  text?: boolean;
  /** 是否顯示文字按鈕背景颜色，預設 `false` */
  bg?: boolean;
  /** 是否為鏈接按鈕，預設 `false` */
  link?: boolean;
  /** 是否為圆角按鈕，預設 `false` */
  round?: boolean;
  /** 是否為圆形按鈕，預設 `false` */
  circle?: boolean;
  /** 確認按鈕的 `PopConfirm` 气泡確認框相關配置 */
  popConfirm?: PopConfirm;
  /** 是否為加載中狀態，預設 `false` */
  loading?: boolean;
  /** 自定義加載中狀態圖标組件 */
  loadingIcon?: string | Component;
  /** 按鈕是否為禁用狀態，預設 `false` */
  disabled?: boolean;
  /** 圖标組件 */
  icon?: string | Component;
  /** 是否開啟原生 `autofocus` 属性，預設 `false` */
  autofocus?: boolean;
  /** 原生 `type` 属性，預設 `button` */
  nativeType?: "button" | "submit" | "reset";
  /** 自動在两个中文字符之间插入空格 */
  autoInsertSpace?: boolean;
  /** 自定義按鈕颜色, 并自動计算 `hover` 和 `active` 触发后的颜色 */
  color?: string;
  /** `dark` 模式, 意味着自動設定 `color` 為 `dark` 模式的颜色，預設 `false` */
  dark?: boolean;
  /** 自定義元素標籤 */
  tag?: string | Component;
  /** 點選按鈕后触发的回調 */
  btnClick?: ({
    drawer,
    button
  }: {
    /** 當前 `Drawer` 信息 */
    drawer: BtnClickDrawer;
    /** 當前 `button` 信息 */
    button: BtnClickButton;
  }) => void;
};

interface DrawerOptions extends DrawerProps {
  /** 内容區組件的 `props`，可通過 `defineProps` 接收 */
  props?: any;
  /** 是否隱藏 `Drawer` 按鈕操作區的内容 */
  hideFooter?: boolean;
  /** 確認按鈕的 `PopConfirm` 气泡確認框相關配置 */
  popConfirm?: PopConfirm;
  /** 點選確定按鈕后是否開啟 `loading` 加載動畫 */
  sureBtnLoading?: boolean;
  /**
   * @description 自定義抽屉標題的内容渲染器
   * @see {@link https://element-plus.org/zh-CN/component/drawer.html#%E6%8F%92%E6%A7%BD}
   */
  headerRenderer?: ({
    close,
    titleId,
    titleClass
  }: {
    close: Function;
    titleId: string;
    titleClass: string;
  }) => VNode | Component;
  /** 自定義内容渲染器 */
  contentRenderer?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => VNode | Component;
  /** 自定義按鈕操作區的内容渲染器，會覆盖`footerButtons`以及預設的 `取消` 和 `確定` 按鈕 */
  footerRenderer?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => VNode | Component;
  /** 自定義底部按鈕操作 */
  footerButtons?: Array<ButtonProps>;
  /** `Drawer` 打開后的回調 */
  open?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;
  /** `Drawer` 關閉后的回調（只有點選右上角關閉按鈕或空白頁或按下了esc鍵關閉頁面時才會触发） */
  close?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;
  /** `Drawer` 關閉后的回調。 `args` 返回的 `command` 值解析：`cancel` 點選取消按鈕、`sure` 點選確定按鈕、`close` 點選右上角關閉按鈕或空白頁或按下了esc鍵  */
  closeCallBack?: ({
    options,
    index,
    args
  }: {
    options: DrawerOptions;
    index: number;
    args: any;
  }) => void;
  /** 輸入焦點聚焦在 `Drawer` 内容時的回調 */
  openAutoFocus?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;
  /** 輸入焦點从 `Drawer` 内容失焦時的回調 */
  closeAutoFocus?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;

  /** 點選底部取消按鈕的回調，會暫停 `Drawer` 的關閉. 回調函数内執行 `done` 参数方法的時候才是真正關閉對話框的時候 */
  beforeCancel?: (
    done: Function,
    {
      options,
      index
    }: {
      options: DrawerOptions;
      index: number;
    }
  ) => void;
  /** 點選底部確定按鈕的回調，會暫停 `Drawer` 的關閉. 回調函数内執行 `done` 参数方法的時候才是真正關閉對話框的時候 */
  beforeSure?: (
    done: Function,
    {
      options,
      index,
      closeLoading
    }: {
      options: DrawerOptions;
      index: number;
      closeLoading: Function;
    }
  ) => void;
}

export type { ButtonProps, DrawerOptions, ArgsType, DrawerProps, EventType };
