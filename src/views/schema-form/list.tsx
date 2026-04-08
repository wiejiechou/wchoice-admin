import Base from "./form/base.vue";
import Dialog from "./form/dialog.vue";
import Drawer from "./form/drawer.vue";
import Steps from "./form/steps.vue";
import Search from "./form/search.vue";

const rendContent = (val: string) =>
  `程式碼位置：src/views/schema-form/form/${val}.vue`;

export const list = [
  {
    key: "base",
    content: rendContent("base"),
    title: "基礎表單",
    component: Base
  },
  {
    key: "dialog",
    content: rendContent("dialog"),
    title: "彈框表單",
    component: Dialog
  },
  {
    key: "drawer",
    content: rendContent("drawer"),
    title: "抽屜表單",
    component: Drawer
  },
  {
    key: "steps",
    content: rendContent("steps"),
    title: "逐步表單",
    component: Steps
  },
  {
    key: "search",
    content: rendContent("search"),
    title: "搜尋表單",
    component: Search
  }
];
