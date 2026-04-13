import { ppt } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

const IFrame = () => import("@/layout/frame.vue");

export default {
  path: "/ppt",
  redirect: "/ppt/index",
  meta: {
    icon: "ri/file-ppt-2-line",
    title: "PPT",
    rank: ppt
  },
  children: [
    {
      path: "/ppt/index",
      name: "FramePpt",
      component: IFrame,
      meta: {
        title: "PPT",
        keepAlive: true,
        frameSrc: "https://pipipi-pikachu.github.io/PPTist/",
        frameLoading: false,
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
