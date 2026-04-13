import { $t } from "@/plugins/i18n";
import { markdown } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/markdown",
  redirect: "/markdown/index",
  meta: {
    icon: "ri/markdown-line",
    title: $t("menus.pureMarkdown"),
    rank: markdown
  },
  children: [
    {
      path: "/markdown/index",
      name: "Markdown",
      component: () => import("@/views/markdown/index.vue"),
      meta: {
        title: $t("menus.pureMarkdown"),
        extraIcon: "IF-pure-iconfont-new svg",
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
