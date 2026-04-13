import { $t } from "@/plugins/i18n";
import { table } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/table",
  redirect: "/table/index",
  meta: {
    icon: "ri/table-line",
    title: $t("menus.pureTable"),
    rank: table
  },
  children: [
    {
      path: "/table/index",
      name: "PureTable",
      component: () => import("@/views/table/index.vue"),
      meta: {
        title: $t("menus.pureTableBase"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/table/high",
      name: "PureTableHigh",
      component: () => import("@/views/table/high.vue"),
      meta: {
        title: $t("menus.pureTableHigh"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/table/edit",
      name: "PureTableEdit",
      component: () => import("@/views/table/edit.vue"),
      meta: {
        title: $t("menus.pureTableEdit"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/table/virtual",
      name: "VxeTable",
      component: () => import("@/views/table/virtual.vue"),
      meta: {
        title: $t("menus.pureVxeTable"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
