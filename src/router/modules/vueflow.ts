import { vueflow } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/vue-flow",
  redirect: "/vue-flow/index",
  meta: {
    icon: "ep/set-up",
    title: "vue-flow",
    rank: vueflow
  },
  children: [
    {
      path: "/vue-flow/index",
      name: "VueFlow",
      component: () => import("@/views/vue-flow/layouting/index.vue"),
      meta: {
        title: "vue-flow",
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
