import { chatai } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/chatai",
  redirect: "/chatai/index",
  meta: {
    icon: "ri/chat-search-line",
    title: "chat-ai",
    rank: chatai
  },
  children: [
    {
      path: "/chatai/index",
      name: "ChatAi",
      component: () => import("@/views/chatai/index.vue"),
      meta: {
        title: "chat-ai",
        extraIcon: "IF-pure-iconfont-new svg",
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
