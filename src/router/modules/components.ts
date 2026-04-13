import { $t } from "@/plugins/i18n";
import { components } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/components",
  redirect: "/components/dialog",
  meta: {
    icon: "ep/menu",
    title: $t("menus.pureComponents"),
    rank: components
  },
  children: [
    {
      path: "/components/dialog",
      name: "DialogPage",
      component: () => import("@/views/components/dialog/index.vue"),
      meta: {
        title: $t("menus.pureDialog"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/drawer",
      name: "DrawerPage",
      component: () => import("@/views/components/drawer/index.vue"),
      meta: {
        title: $t("menus.pureDrawer"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/message",
      name: "Message",
      component: () => import("@/views/components/message.vue"),
      meta: {
        title: $t("menus.pureMessage"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/upload",
      name: "PureUpload",
      component: () => import("@/views/components/upload/index.vue"),
      meta: {
        title: $t("menus.pureUpload"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/check-card",
      name: "CheckCard",
      component: () => import("@/views/components/check-card.vue"),
      meta: {
        title: $t("menus.pureCheckCard"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/date-picker",
      name: "DatePicker",
      component: () => import("@/views/components/date-picker.vue"),
      meta: {
        title: $t("menus.pureDatePicker"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/datetime-picker",
      name: "DateTimePicker",
      component: () => import("@/views/components/datetime-picker.vue"),
      meta: {
        title: $t("menus.pureDateTimePicker"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/time-picker",
      name: "TimePicker",
      component: () => import("@/views/components/time-picker.vue"),
      meta: {
        title: $t("menus.pureTimePicker"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/icon-select",
      name: "IconSelect",
      component: () => import("@/views/components/icon-select.vue"),
      meta: {
        title: $t("menus.pureIconSelect"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/animatecss",
      name: "AnimateCss",
      component: () => import("@/views/components/animatecss.vue"),
      meta: {
        title: $t("menus.pureAnimatecss"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/cropping",
      name: "Cropping",
      component: () => import("@/views/components/cropping/index.vue"),
      meta: {
        title: $t("menus.pureCropping"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/segmented",
      name: "Segmented",
      component: () => import("@/views/components/segmented.vue"),
      meta: {
        title: $t("menus.pureSegmented"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/text",
      name: "PureText",
      component: () => import("@/views/components/text.vue"),
      meta: {
        title: $t("menus.pureText"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/slider",
      name: "PureSlider",
      component: () => import("@/views/components/slider/index.vue"),
      meta: {
        title: $t("menus.pureSlider"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/el-button",
      name: "PureButton",
      component: () => import("@/views/components/el-button.vue"),
      meta: {
        title: $t("menus.pureElButton"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/check-button",
      name: "CheckButton",
      component: () => import("@/views/components/check-button.vue"),
      meta: {
        title: $t("menus.pureCheckButton"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/button",
      name: "ButtonPage",
      component: () => import("@/views/components/button.vue"),
      meta: {
        title: $t("menus.pureButton"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/progress",
      name: "PureProgress",
      component: () => import("@/views/components/progress.vue"),
      meta: {
        title: $t("menus.pureProgress"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/tag",
      name: "PureTag",
      component: () => import("@/views/components/tag.vue"),
      meta: {
        title: $t("menus.pureTag"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/statistic",
      name: "Statistic",
      component: () => import("@/views/components/statistic.vue"),
      meta: {
        title: $t("menus.pureStatistic"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/collapse",
      name: "Collapse",
      component: () => import("@/views/components/collapse.vue"),
      meta: {
        title: $t("menus.pureCollapse"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/cascader",
      name: "Cascader",
      component: () => import("@/views/components/cascader.vue"),
      meta: {
        title: $t("menus.pureCascader"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/color-picker",
      name: "ColorPicker",
      component: () => import("@/views/components/color-picker.vue"),
      meta: {
        title: $t("menus.pureColorPicker"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/color-picker-panel",
      name: "ColorPickerPanel",
      component: () => import("@/views/components/color-picker-panel.vue"),
      meta: {
        title: $t("menus.pureColorPickerPanel"),
        extraIcon: "IF-pure-iconfont-new svg",
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/selector",
      name: "Selector",
      component: () => import("@/views/components/selector.vue"),
      meta: {
        title: $t("menus.pureSelector"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/waterfall",
      name: "Waterfall",
      component: () => import("@/views/components/waterfall/index.vue"),
      meta: {
        title: $t("menus.pureWaterfall"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/split-pane",
      name: "SplitPane",
      component: () => import("@/views/components/split-pane.vue"),
      meta: {
        title: $t("menus.pureSplitPane"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/swiper",
      name: "Swiper",
      component: () => import("@/views/components/swiper.vue"),
      meta: {
        title: $t("menus.pureSwiper"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/timeline",
      name: "TimeLine",
      component: () => import("@/views/components/timeline.vue"),
      meta: {
        title: $t("menus.pureTimeline"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/count-to",
      name: "CountTo",
      component: () => import("@/views/components/count-to.vue"),
      meta: {
        title: $t("menus.pureCountTo"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/contextmenu",
      name: "ContextMenu",
      component: () => import("@/views/components/contextmenu/index.vue"),
      meta: {
        title: $t("menus.pureContextmenu"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/json-editor",
      name: "JsonEditor",
      component: () => import("@/views/components/json-editor.vue"),
      meta: {
        title: $t("menus.pureJsonEditor"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/seamless-scroll",
      name: "SeamlessScroll",
      component: () => import("@/views/components/seamless-scroll.vue"),
      meta: {
        title: $t("menus.pureSeamless"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/virtual-list",
      name: "VirtualList",
      component: () => import("@/views/components/virtual-list/index.vue"),
      meta: {
        title: $t("menus.pureVirtualList"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
