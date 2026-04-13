import { $t } from "@/plugins/i18n";
import { ganttastic } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/ganttastic",
  redirect: "/ganttastic/index",
  meta: {
    icon: "ri/bar-chart-horizontal-line",
    title: $t("menus.pureGanttastic"),
    rank: ganttastic
  },
  children: [
    {
      path: "/ganttastic/index",
      name: "Ganttastic",
      component: () => import("@/views/ganttastic/index.vue"),
      meta: {
        title: $t("menus.pureGanttastic"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
