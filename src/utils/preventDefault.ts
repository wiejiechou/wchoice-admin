import { useEventListener } from "@vueuse/core";

/** 是否為`img`標籤 */
function isImgElement(element) {
  return typeof HTMLImageElement !== "undefined"
    ? element instanceof HTMLImageElement
    : element.tagName.toLowerCase() === "img";
}

// 在 src/main.ts 引入并調用即可 import { addPreventDefault } from "@/utils/preventDefault"; addPreventDefault();
export const addPreventDefault = () => {
  // 阻止通過鍵盤F12快捷鍵打開瀏覽器開发者工具面板
  useEventListener(
    window.document,
    "keydown",
    ev => ev.key === "F12" && ev.preventDefault()
  );
  // 阻止瀏覽器預設的右鍵選單彈出（不會影响自定義右鍵事件）
  useEventListener(window.document, "contextmenu", ev => ev.preventDefault());
  // 阻止頁面元素选中
  useEventListener(window.document, "selectstart", ev => ev.preventDefault());
  // 瀏覽器中圖片通常預設是可拖動的，并且可以在新標籤頁或窗口中打開，或者將其拖動到其他应用程序中，此处將其禁用，使其預設不可拖動
  useEventListener(
    window.document,
    "dragstart",
    ev => isImgElement(ev?.target) && ev.preventDefault()
  );
};
