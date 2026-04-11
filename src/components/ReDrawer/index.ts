import { ref } from "vue";
import reDrawer from "./index.vue";
import { useTimeoutFn } from "@vueuse/core";
import { withInstall } from "@pureadmin/utils";
import type {
  EventType,
  ArgsType,
  DrawerProps,
  DrawerOptions,
  ButtonProps
} from "./type";

const drawerStore = ref<Array<DrawerOptions>>([]);

/** 打開抽屉 */
const addDrawer = (options: DrawerOptions) => {
  const open = () =>
    drawerStore.value.push(Object.assign(options, { visible: true }));
  if (options?.openDelay) {
    useTimeoutFn(() => {
      open();
    }, options.openDelay);
  } else {
    open();
  }
};

/** 關閉抽屉 */
const closeDrawer = (options: DrawerOptions, index: number, args?: any) => {
  drawerStore.value[index].visible = false;
  options.closeCallBack && options.closeCallBack({ options, index, args });

  const closeDelay = options?.closeDelay ?? 200;
  useTimeoutFn(() => {
    drawerStore.value.splice(index, 1);
  }, closeDelay);
};

/**
 * @description 更改抽屉自身属性值
 * @param value 属性值
 * @param key 属性，預設`title`
 * @param index 彈框索引（預設`0`，代表只有一个彈框，對于嵌套彈框要改哪个彈框的属性值就把該彈框索引赋给`index`）
 */
const updateDrawer = (value: any, key = "title", index = 0) => {
  drawerStore.value[index][key] = value;
};

/** 關閉所有彈框 */
const closeAllDrawer = () => {
  drawerStore.value = [];
};

const ReDrawer = withInstall(reDrawer);

export type { EventType, ArgsType, DrawerOptions, DrawerProps, ButtonProps };
export {
  ReDrawer,
  drawerStore,
  addDrawer,
  closeDrawer,
  updateDrawer,
  closeAllDrawer
};
