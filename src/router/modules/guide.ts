import { $t } from "@/plugins/i18n";
import { guide } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/guide",
  redirect: "/guide/index",
  meta: {
    icon: "ep/guide",
    title: $t("menus.pureGuide"),
    rank: guide
  },
  children: [
    {
      path: "/guide/index",
      name: "Guide",
      component: () => import("@/views/guide/index.vue"),
      meta: {
        title: $t("menus.pureGuide"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
