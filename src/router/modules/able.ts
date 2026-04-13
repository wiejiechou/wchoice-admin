import { $t } from "@/plugins/i18n";
import { able } from "@/router/enums";
import { PERM_SETTINGS } from "../perm-declaration";

export default {
  path: "/able",
  redirect: "/able/watermark",
  meta: {
    icon: "ri/ubuntu-fill",
    title: $t("menus.pureAble"),
    rank: able
  },
  children: [
    {
      path: "/able/mqtt-client",
      name: "MqttClient",
      component: () => import("@/views/able/mqtt-client.vue"),
      meta: {
        title: $t("menus.pureMqtt"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/verify",
      name: "Verify",
      component: () => import("@/views/able/verify.vue"),
      meta: {
        title: $t("menus.pureVerify"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/watermark",
      name: "WaterMark",
      component: () => import("@/views/able/watermark.vue"),
      meta: {
        title: $t("menus.pureWatermark"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/print",
      name: "Print",
      component: () => import("@/views/able/print/index.vue"),
      meta: {
        title: $t("menus.purePrint"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/download",
      name: "Download",
      component: () => import("@/views/able/download.vue"),
      meta: {
        title: $t("menus.pureDownload"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/excel",
      name: "Excel",
      component: () => import("@/views/able/excel.vue"),
      meta: {
        title: $t("menus.pureExcel"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/components/ripple",
      name: "Ripple",
      component: () => import("@/views/able/ripple.vue"),
      meta: {
        title: $t("menus.pureRipple"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/debounce",
      name: "Debounce",
      component: () => import("@/views/able/debounce.vue"),
      meta: {
        title: $t("menus.pureDebounce"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/directives",
      name: "Directives",
      component: () => import("@/views/able/directives.vue"),
      meta: {
        title: $t("menus.pureOptimize"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/draggable",
      name: "Draggable",
      component: () => import("@/views/able/draggable.vue"),
      meta: {
        title: $t("menus.pureDraggable"),
        transition: {
          enterTransition: "animate__zoomIn",
          leaveTransition: "animate__zoomOut"
        },
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/pdf",
      name: "Pdf",
      component: () => import("@/views/able/pdf.vue"),
      meta: {
        title: $t("menus.purePdf"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/barcode",
      name: "BarCode",
      component: () => import("@/views/able/barcode.vue"),
      meta: {
        title: $t("menus.pureBarcode"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/qrcode",
      name: "QrCode",
      component: () => import("@/views/able/qrcode.vue"),
      meta: {
        title: $t("menus.pureQrcode"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/map",
      name: "MapPage",
      component: () => import("@/views/able/map.vue"),
      meta: {
        title: $t("menus.pureMap"),
        keepAlive: true,
        transition: {
          name: "fade"
        },
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/wavesurfer",
      name: "Wavesurfer",
      component: () => import("@/views/able/wavesurfer/index.vue"),
      meta: {
        title: $t("menus.pureWavesurfer"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/video",
      name: "VideoPage",
      component: () => import("@/views/able/video.vue"),
      meta: {
        title: $t("menus.pureVideo"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/video-frame",
      name: "VideoFrame",
      component: () => import("@/views/able/video-frame/index.vue"),
      meta: {
        title: $t("menus.pureVideoFrame"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/danmaku",
      name: "Danmaku",
      component: () => import("@/views/able/danmaku/index.vue"),
      meta: {
        title: $t("menus.pureDanmaku"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/infinite-scroll",
      name: "InfiniteScroll",
      component: () => import("@/views/able/infinite-scroll.vue"),
      meta: {
        title: $t("menus.pureInfiniteScroll"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/menu-tree",
      name: "MenuTree",
      component: () => import("@/views/able/menu-tree.vue"),
      meta: {
        title: $t("menus.pureMenuTree"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/line-tree",
      name: "LineTree",
      component: () => import("@/views/able/line-tree.vue"),
      meta: {
        title: $t("menus.pureLineTree"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/typeit",
      name: "Typeit",
      component: () => import("@/views/able/typeit.vue"),
      meta: {
        title: $t("menus.pureTypeit"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/sensitive",
      name: "Sensitive",
      component: () => import("@/views/able/sensitive.vue"),
      meta: {
        title: $t("menus.pureSensitive"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    },
    {
      path: "/able/pinyin",
      name: "Pinyin",
      component: () => import("@/views/able/pinyin.vue"),
      meta: {
        title: $t("menus.purePinyin"),
        roles: PERM_SETTINGS.DEMO_DEFAULT // 使用集中管理的權限定義
      }
    }
  ]
} satisfies RouteConfigsTable;
