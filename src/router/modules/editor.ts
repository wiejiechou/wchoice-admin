import { $t } from "@/plugins/i18n";
import { editor } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/editor",
  redirect: "/editor/index",
  meta: {
    icon: "ep/edit",
    title: $t("menus.pureEditor"),
    rank: editor
  },
  children: [
    {
      path: "/editor/index",
      name: "Editor",
      component: () => import("@/views/editor/index.vue"),
      meta: {
        title: $t("menus.pureEditor"),
        keepAlive: true,
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
