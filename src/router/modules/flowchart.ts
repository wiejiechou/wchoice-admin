import { $t } from "@/plugins/i18n";
import { flowchart } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/flow-chart",
  redirect: "/flow-chart/index",
  meta: {
    icon: "ep/set-up",
    title: $t("menus.pureFlowChart"),
    rank: flowchart
  },
  children: [
    {
      path: "/flow-chart/index",
      name: "FlowChart",
      component: () => import("@/views/flow-chart/index.vue"),
      meta: {
        title: $t("menus.pureFlowChart"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
