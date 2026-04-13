import { $t } from "@/plugins/i18n";
import { mind } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

const IFrame = () => import("@/layout/frame.vue");

export default {
  path: "/mind-map",
  redirect: "/mind-map/index",
  meta: {
    icon: "ri/mind-map",
    title: $t("menus.pureMindMap"),
    rank: mind
  },
  children: [
    {
      path: "/mind-map/index",
      name: "FrameMindMap",
      component: IFrame,
      meta: {
        title: $t("menus.pureMindMap"),
        keepAlive: true,
        frameSrc: "https://wanglin2.github.io/mind-map/#/",
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
