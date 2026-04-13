import { $t } from "@/plugins/i18n";
import { menuoverflow } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/menuoverflow",
  redirect: "/menuoverflow/index",
  meta: {
    title: $t("menus.pureMenuOverflow"),
    rank: menuoverflow
  },
  children: [
    {
      path: "/menuoverflow/index",
      name: "MenuOverflow",
      component: () => import("@/views/menuoverflow/index.vue"),
      meta: {
        title: $t("menus.pureChildMenuOverflow"),
        showParent: true,
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
