import type { VNode } from "vue";
import { isFunction } from "@pureadmin/utils";
import { type MessageHandler, ElMessage } from "element-plus";

type messageStyle = "el" | "antd";
type messageTypes = "info" | "success" | "warning" | "error";
type messagePlacement =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

interface MessageParams {
  /** 消息類型，可选 `info` 、`success` 、`warning` 、`error` ，預設 `info` */
  type?: messageTypes;
  /** 是否纯色，預設 `false` */
  plain?: boolean;
  /** 自定義圖标，該属性會覆盖 `type` 的圖标 */
  icon?: any;
  /** 是否將 `message` 属性作為 `HTML` 片段處理，預設 `false` */
  dangerouslyUseHTMLString?: boolean;
  /** 消息風格，可选 `el` 、`antd` ，預設 `antd` */
  customClass?: messageStyle;
  /** 顯示時間，單位為毫秒。设為 `0` 则不會自動關閉，`element-plus` 預設是 `3000` ，平台改成預設 `2000` */
  duration?: number;
  /** 是否顯示關閉按鈕，預設值 `false` */
  showClose?: boolean;
  /** `Message` 消息距離窗口边缘的偏移量，預設 `16` */
  offset?: number;
  /** `Message` 消息放置位置，預設 `top` */
  placement?: messagePlacement;
  /** 設定組件的根元素，預設 `document.body` */
  appendTo?: string | HTMLElement;
  /** 合併内容相同的消息，不支持 `VNode` 類型的消息，預設值 `false` */
  grouping?: boolean;
  /** 重复次数，類似于 `Badge` 。當和 `grouping` 属性一起使用時作為初始数量使用，預設值 `1` */
  repeatNum?: number;
  /** 關閉時的回調函数, 参数為被關閉的 `message` 實例 */
  onClose?: Function | null;
}

/** 用法非常簡單，参考 src/views/components/message/index.vue 文件 */

/**
 * `Message` 消息提示函数
 */
const message = (
  message: string | VNode | (() => VNode),
  params?: MessageParams
): MessageHandler => {
  if (!params) {
    return ElMessage({
      message,
      customClass: "pure-message"
    });
  } else {
    const {
      icon,
      type = "info",
      plain = false,
      dangerouslyUseHTMLString = false,
      customClass = "antd",
      duration = 2000,
      showClose = false,
      offset = 16,
      placement = "top",
      appendTo = document.body,
      grouping = false,
      repeatNum = 1,
      onClose
    } = params;

    return ElMessage({
      message,
      icon,
      type,
      plain,
      dangerouslyUseHTMLString,
      duration,
      showClose,
      offset,
      placement,
      appendTo,
      grouping,
      repeatNum,
      // 全局搜 pure-message 即可知道該类的樣式位置
      customClass: customClass === "antd" ? "pure-message" : "",
      onClose: () => (isFunction(onClose) ? onClose() : null)
    });
  }
};

/**
 * 關閉所有 `Message` 消息提示函数
 */
const closeAllMessage = (): void => ElMessage.closeAll();

export { message, closeAllMessage };
