import { $t } from "@/plugins/i18n";
import { about } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/about",
  redirect: "/about/index",
  meta: {
    icon: "ri/file-info-line",
    title: $t("menus.pureAbout"),
    rank: about
  },
  children: [
    {
      path: "/about/index",
      name: "About",
      component: () => import("@/views/about/index.vue"),
      meta: {
        title: $t("menus.pureAbout"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
