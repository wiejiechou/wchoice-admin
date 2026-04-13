import { $t } from "@/plugins/i18n";
import { formdesign } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

const IFrame = () => import("@/layout/frame.vue");

export default {
  path: "/form-design",
  redirect: "/form-design/index",
  meta: {
    icon: "ri/terminal-window-line",
    title: $t("menus.pureFormDesign"),
    rank: formdesign
  },
  children: [
    {
      path: "/form-design/index",
      name: "FormDesign",
      component: IFrame,
      meta: {
        title: $t("menus.pureFormDesign"),
        keepAlive: true,
        frameSrc:
          "https://haixin-fang.github.io/vue-form-design/playground/index.html",
        frameLoading: false,
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
