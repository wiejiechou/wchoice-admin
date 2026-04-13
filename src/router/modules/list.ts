import { $t } from "@/plugins/i18n";
import { list } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/list",
  redirect: "/list/card",
  meta: {
    icon: "ri/list-check",
    title: $t("menus.pureList"),
    rank: list
  },
  children: [
    {
      path: "/list/card",
      name: "CardList",
      component: () => import("@/views/list/card/index.vue"),
      meta: {
        icon: "ri/bank-card-line",
        title: $t("menus.pureCardList"),
        showParent: true,
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
