import vue from "@vitejs/plugin-vue";
import { pathResolve } from "./utils";
import { viteBuildInfo } from "./info";
import svgLoader from "vite-svg-loader";
import Icons from "unplugin-icons/vite";
import type { PluginOption } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import tailwindcss from "@tailwindcss/vite";
import { configCompressPlugin } from "./compress";
import removeNoMatch from "vite-plugin-router-warn";
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { vitePluginFakeServer } from "vite-plugin-fake-server";
import { VitePWA } from "vite-plugin-pwa"; // 加入對行動端的支持

export async function getPluginsList(
  VITE_CDN: boolean,
  VITE_COMPRESSION: ViteCompression
): Promise<PluginOption[]> {
  const lifecycle = process.env.npm_lifecycle_event;
  return [
    tailwindcss(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === "deep-chat"
        }
      }
    }),
    // jsx、tsx语法支持
    vueJsx(),
    VueI18nPlugin({
      include: [pathResolve("../locales/**")]
    }),
    /**
     * 在頁面上按住組合鍵時，滑鼠在頁面移動即會在 DOM 上出現遮罩層並顯示相關信息，點擊一下將自動打開 IDE 並將遊標定位到元素對應的代碼位置
     * Mac 預設組合鍵 Option + Shift
     * Windows 預設組合鍵 Alt + Shift
     * 更多用法看 https://inspector.fe-dev.cn/guide/start.html
     */
    codeInspectorPlugin({
      bundler: "vite",
      hideConsole: true
    }),
    viteBuildInfo(),
    /**
     * 開發環境下移除非必要的vue-router動態路由警告No match found for location with path
     * 非必要具體看 https://github.com/vuejs/router/issues/521 和 https://github.com/vuejs/router/issues/359
     * vite-plugin-router-warn只在開發環境下啟用，只處理vue-router檔案並且只在服務啟動或重新啟動時運行一次，效能消耗可忽略不計
     */
    removeNoMatch(),
    // mock支持
    vitePluginFakeServer({
      logger: false,
      include: "mock",
      infixName: false,
      enableProd: true
    }),
    // svg组件化支持
    svgLoader(),
    // 自动按需加载图标
    Icons({
      compiler: "vue3",
      scale: 1
    }),
    VITE_CDN ? (await import("./cdn")).cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    // 加入對於行動端的支持
    // 定義 Manifest 品牌資訊、自動更新規則及 Workbox 快取策略
    VitePWA({
      // 確保使用者重新整理頁面時，新的 Service Worker 會自動接管並更新應用程式。
      registerType: "autoUpdate",
      // 定義編譯後需要被額外快取的靜態資產。
      includeAssets: [
        "favicon.ico",
        "logo.svg",
        "device/apple-touch-icon-180x180.png"
      ],
      manifest: {
        name: "Wang Choice",
        short_name: "WChoice",
        description: "Wang Choice Application System",
        theme_color: "#F39800",
        icons: [
          {
            src: "device/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "device/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "device/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "device/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        // 調高單一檔案快取上限至 5MB。
        // 原專案中的大型模組（如 pdf.js, index.js）超過預設 2MB，若不調高會導致編譯失敗。
        maximumFileSizeToCacheInBytes: 5000000,
        // 定義需要被 PWA 引擎預先掃描並快取的檔案格式。
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        // 如果未來有需要快取的外部 CDN 資源，可在此處加入 runtimeCaching。
        runtimeCaching: []
      }
    }),
    // 線上環境刪除console
    removeConsole({ external: ["src/assets/iconfont/iconfont.js"] }),
    // 打包分析
    lifecycle === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : (null as any)
  ];
}
