import type { CSSProperties, VNode, Component } from "vue";

type DoneFn = (cancel?: boolean) => void;
type EventType =
  | "open"
  | "close"
  | "openAutoFocus"
  | "closeAutoFocus"
  | "fullscreenCallBack";
type ArgsType = {
  /** `cancel` 點選取消按鈕、`sure` 點選確定按鈕、`close` 點選右上角關閉按鈕或空白頁或按下了esc鍵 */
  command: "cancel" | "sure" | "close";
};
type ButtonType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "text";

/** https://element-plus.org/zh-CN/component/dialog.html#attributes */
type DialogProps = {
  /** `Dialog` 的顯示与隱藏 */
  visible?: boolean;
  /** `Dialog` 的標題 */
  title?: string;
  /** `Dialog` 的寬度，預設 `50%` */
  width?: string | number;
  /** 是否為全屏 `Dialog`（會一直处于全屏狀態，除非彈框關閉），預設 `false`，`fullscreen` 和 `fullscreenIcon` 都传時只有 `fullscreen` 會生效 */
  fullscreen?: boolean;
  /** 是否顯示全屏操作圖标，預設 `false`，`fullscreen` 和 `fullscreenIcon` 都传時只有 `fullscreen` 會生效 */
  fullscreenIcon?: boolean;
  /** `Dialog CSS` 中的 `margin-top` 值，預設 `15vh` */
  top?: string;
  /** 是否需要遮罩層，預設 `true` */
  modal?: boolean;
  /** 是否允许穿透遮罩層，預設 `false`。使用時需將 `modal` 属性設定為 `false` */
  modalPenetrable?: boolean;
  /** 遮罩的自定義类名 */
  modalClass?: string;
  /** `header` 部分的自定義 `class` 名 */
  headerClass?: string;
  /** `body` 部分的自定義 `class` 名 */
  bodyClass?: string;
  /** `footer` 部分的自定義 `class` 名 */
  footerClass?: string;
  /** `Dialog` 自身是否插入至 `body` 元素上。嵌套的 `Dialog` 必须指定該属性并赋值為 `true`，預設 `false` */
  appendToBody?: boolean;
  /** `Dialog` 挂載到哪个 `DOM` 元素，該属性會覆盖 `append-to-body` 属性，預設 `body` */
  appendTo?: string | HTMLElement;
  /** 是否在 `Dialog` 出現時將 `body` 滚動锁定，預設 `true` */
  lockScroll?: boolean;
  /** `Dialog` 的自定義类名 */
  class?: string;
  /** `Dialog` 的自定義樣式 */
  style?: CSSProperties;
  /** `Dialog` 打開的延時時間，單位毫秒，預設 `0` */
  openDelay?: number;
  /** `Dialog` 關閉的延時時間，單位毫秒，預設 `0` */
  closeDelay?: number;
  /** 是否可以通過點選 `modal` 關閉 `Dialog`，預設 `true` */
  closeOnClickModal?: boolean;
  /** 是否可以通過按下 `ESC` 關閉 `Dialog`，預設 `true` */
  closeOnPressEscape?: boolean;
  /** 是否顯示關閉按鈕，預設 `true` */
  showClose?: boolean;
  /** 關閉前的回調，會暫停 `Dialog` 的關閉. 回調函数内執行 `done` 参数方法的時候才是真正關閉對話框的時候 */
  beforeClose?: (done: DoneFn) => void;
  /** 為 `Dialog` 啟用可拖拽功能，預設 `false` */
  draggable?: boolean;
  /** 拖動範圍可以超出可视區，預設 `false` */
  overflow?: boolean;
  /** 是否让 `Dialog` 的 `header` 和 `footer` 部分居中排列，預設 `false` */
  center?: boolean;
  /** 是否水平垂直對齐對話框，預設 `false` */
  alignCenter?: boolean;
  /** 當關閉 `Dialog` 時，销毁其中的元素，預設 `false` */
  destroyOnClose?: boolean;
  /** 自定義關閉圖标，預設 `Close` */
  closeIcon?: string | Component;
  /** 和原生的 `CSS` 的 `z-index` 相同，改变 `z` 轴的顺序 */
  zIndex?: number;
  /** `header` 的 `aria-level` 属性 */
  headerAriaLevel?: string;
  /** 對話框動畫的自定義過渡配置。可以是一个字符串（過渡名稱），也可以是一个包含 `Vue` 過渡属性的對象，預設 `dialog-fade` */
  transition?: string | object;
};

//element-plus.org/zh-CN/component/popconfirm.html#attributes
type Popconfirm = {
  /** 標題 */
  title?: string;
  /** 確定按鈕文字 */
  confirmButtonText?: string;
  /** 取消按鈕文字 */
  cancelButtonText?: string;
  /** 確定按鈕類型，預設 `primary` */
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

type BtnClickDialog = {
  options?: DialogOptions;
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
  /** 確定按鈕的 `Popconfirm` 气泡確認框相關配置 */
  popconfirm?: Popconfirm;
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
    dialog,
    button
  }: {
    /** 當前 `Dialog` 信息 */
    dialog: BtnClickDialog;
    /** 當前 `button` 信息 */
    button: BtnClickButton;
  }) => void;
};

interface DialogOptions extends DialogProps {
  /** 内容區組件的 `props`，可通過 `defineProps` 接收 */
  props?: any;
  /** 是否隱藏 `Dialog` 按鈕操作區的内容 */
  hideFooter?: boolean;
  /** 確定按鈕的 `Popconfirm` 气泡確認框相關配置 */
  popconfirm?: Popconfirm;
  /** 點選確定按鈕后是否開啟 `loading` 加載動畫 */
  sureBtnLoading?: boolean;
  /**
   * @description 自定義對話框標題的内容渲染器
   * @see {@link https://element-plus.org/zh-CN/component/dialog.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%B4%E9%83%A8}
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
    options: DialogOptions;
    index: number;
  }) => VNode | Component;
  /** 自定義按鈕操作區的内容渲染器，會覆盖`footerButtons`以及預設的 `取消` 和 `確定` 按鈕 */
  footerRenderer?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => VNode | Component;
  /** 自定義底部按鈕操作 */
  footerButtons?: Array<ButtonProps>;
  /** `Dialog` 打開后的回調 */
  open?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** `Dialog` 關閉后的回調（只有點選右上角關閉按鈕或空白頁或按下了esc鍵關閉頁面時才會触发） */
  close?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** `Dialog` 關閉后的回調。 `args` 返回的 `command` 值解析：`cancel` 點選取消按鈕、`sure` 點選確定按鈕、`close` 點選右上角關閉按鈕或空白頁或按下了esc鍵  */
  closeCallBack?: ({
    options,
    index,
    args
  }: {
    options: DialogOptions;
    index: number;
    args: any;
  }) => void;
  /** 點選全屏按鈕時的回調 */
  fullscreenCallBack?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** 輸入焦點聚焦在 `Dialog` 内容時的回調 */
  openAutoFocus?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** 輸入焦點从 `Dialog` 内容失焦時的回調 */
  closeAutoFocus?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** 點選底部取消按鈕的回調，會暫停 `Dialog` 的關閉. 回調函数内執行 `done` 参数方法的時候才是真正關閉對話框的時候 */
  beforeCancel?: (
    done: Function,
    {
      options,
      index
    }: {
      options: DialogOptions;
      index: number;
    }
  ) => void;
  /** 點選底部確定按鈕的回調，會暫停 `Dialog` 的關閉. 回調函数内執行 `done` 参数方法的時候才是真正關閉對話框的時候 */
  beforeSure?: (
    done: Function,
    {
      options,
      index,
      closeLoading
    }: {
      options: DialogOptions;
      index: number;
      /** 關閉確定按鈕的 `loading` 加載動畫 */
      closeLoading: Function;
    }
  ) => void;
}

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions };
