# 目錄結構

- [資料出處](https://pure-admin.cn/pages/directory/)

```
root
├── .github  # GitHub 設定檔
│   ├── ISSUE_TEMPLATE  # 問題回報參考範本
│   ├── workflows git  # 工作流 (Workflows)
├── .husky  # 程式碼提交前校驗 (Git Hooks) 設定檔
├── .vscode  # IDE 工具推薦設定
│   │   ├── extensions.json  # 一鍵安裝平台推薦的 VS Code 套件
│   │   ├── settings.json  # 設定擴充套件或 VS Code 編輯器的相關屬性
│   │   ├── vue3.0.code-snippets  # Vue 3.0 程式碼片段 (Snippets)
│   │   ├── vue3.2.code-snippets  # Vue 3.2 程式碼片段 (Snippets)
│   │   └── vue3.3.code-snippets  # Vue 3.3 程式碼片段 (Snippets)
├── build  # 建置工具
│   │   ├── cdn.ts  # 打包時採用 CDN 模式
│   │   ├── compress.ts  # 打包時啟用 Gzip 或 Brotli 壓縮
│   │   ├── info.ts  # 輸出打包資訊（檔案大小、耗時）
│   │   ├── optimize.ts  # Vite 相依套件預建置 (Pre-bundling) 設定項目
│   │   ├── plugins.ts  # Vite 相關外掛存放處
│   │   ├── utils.ts  # 建置工具常用方法抽離
├── locales  # 多國語系 (i18n) 檔案存放處
│   │   ├── en.yaml  # 英文語系設定
│   │   ├── zh-CN.yaml  # 簡體中文設定
│   │   ├── zh-TW.yaml  # 繁體中文設定
├── mock  # Mock 模擬後端資料
│   │   ├── wchoice  # [客製化] WChoice 業務模組 Mock 數據
│   │   │   ├── wchoiceRoutes.ts  # 業務路由定義 (L1 模組化匯出)
│   │   │   ├── wchoiceUsers.ts  # 業務用戶與權限數據
│   │   ├── asyncRoutes.ts  # 模擬後端回傳動態路由 (入口，引導各模組)
│   │   ├── ...
├── node_modules  # 專案相依套件
├── public  # 靜態資源
│   │   ├── audio  # 音訊檔案
│   │   ├── html  # 靜態 iframe 頁面
│   │   ├── wasm  # WebAssembly 檔案及相關膠水程式碼 (Glue code)
│   │   ├── favicon.ico  # 網站圖示 (Favicon)
│   │   ├── logo.svg  # 標誌 (Logo)
│   │   ├── platform-config.json  # 全局設定檔（打包後修改亦可生效）
├── src
│   ├── api  # API 請求統一管理
│   ├── assets  # 字體、圖片等靜態資源
│   ├── components  # 自定義通用元件
│   │   ├── ReAnimateSelector  # [animate.css](https://animate.style/) 選擇器元件
│   │   ├── ReAuth  # 按鈕等級權限元件（根據路由 meta 中的 auths 欄位判斷）
│   │   ├── ReBarcode  # 條碼元件
│   │   ├── ReCol  # 封裝 Element Plus 的 el-col 元件
│   │   ├── ReCountTo  # 數字動畫元件
│   │   ├── ReCropper  # 圖片裁剪元件
│   │   ├── ReCropperPreview  # 圖片裁剪預覽元件
│   │   ├── ReDialog  # 基於 Element Plus el-dialog 開發的函式調用彈窗
│   │   ├── ReFlicker  # 圓點、方形閃爍動畫元件
│   │   ├── ReFlop  # 時間翻牌元件
│   │   ├── ReFlowChart  # LogicFlow 流程圖元件
│   │   ├── ReIcon  # 圖示元件
│   │   ├── ReImageVerify  # 圖形驗證碼元件
│   │   ├── ReMap  # 高德地圖元件
│   │   ├── RePerms  # 按鈕等級權限元件（根據登入介面回傳的 permissions 欄位判斷）
│   │   ├── RePureTableBar  # 配合 `@pureadmin/table` 實現快速便捷的表格操作 (https://github.com/pure-admin/pure-admin-table)
│   │   ├── ReQrcode  # 二維碼 (QR Code) 元件
│   │   ├── ReSeamlessScroll  # 無縫捲動元件
│   │   ├── ReSegmented  # 分段控制器元件
│   │   ├── ReSelector  # 選擇器元件
│   │   ├── ReSplitPane  # 切割面板元件
│   │   ├── ReText  # 支援 Tooltip 提示的文字省略元件
│   │   ├── ReTreeLine  # 樹形連接線元件（基於 Element Plus）
│   │   ├── ReTypeit  # 打字機效果元件
│   │   ├── ReVxeTableBar  # 配合 vxe-table 實現快速便捷的表格操作
│   ├── config  # 獲取平台動態全局設定
│   ├── directives  # 自定義指令 (Directives)
│   │   ├── auth  # 按鈕等級權限指令（根據路由 meta 中的 auths 欄位判斷）
│   │   ├── copy  # 文字複製指令（預設按兩下複製）
│   │   ├── longpress  # 長按指令
│   │   ├── optimize  # 防抖 (Debounce)、節流 (Throttle) 指令
│   │   ├── perms  # 按鈕等級權限指令（根據登入介面回傳的 permissions 欄位判斷）
│   │   ├── ripple  # 水波紋效果指令
│   ├── layout  # 主要頁面佈局
│   ├── plugins  # 處理函式庫或外掛，匯出更方便的 API
│   ├── router  # 路由設定
│   │   ├── modules  # 靜態路由模組 (含官方 Demo)
│   │   ├── index.ts  # 路由入口，自動掃描 modules
│   │   ├── perm-declaration.ts  # [客製化] 權限角色集中管理定義
│   │   └── utils.ts  # 路由工具，已擴大掃描 views-custom
│   ├── store  # Pinia 狀態管理
│   ├── style  # 全局樣式
│   │   ├── dark.scss  # 暗黑模式樣式適配檔案
│   │   ├── element-plus.scss  # 全局覆蓋 Element Plus 樣式檔案
│   │   ├── reset.scss  # 全局重設樣式檔案 (CSS Reset)
│   │   ├── sidebar.scss  # Layout 佈局樣式檔案
│   │   ├── tailwind.css  # Tailwind CSS 自定義樣式設定檔
│   │   ├── ...
│   ├── utils  # 全局工具方法
│   │   ├── http  # 封裝 Axios 檔案
│   │   ├── localforage  # 二次封裝 localForage，支援設定過期時間與完整類型提示 (https://localforage.docschina.org/)
│   │   ├── progress  # 封裝 nprogress (進度條)
│   │   └── auth.ts  # 處理使用者資訊與 Token 相關邏輯
│   │   └── chinaArea.ts  # 漢字轉區域碼
│   │   └── globalPolyfills.ts  # 解決因安裝相依套件出現 `global is not defined` 的錯誤
│   │   └── message.ts  # 訊息提示函式
│   │   ├── mitt.ts  # 觸發公共事件，類似 EventBus
│   │   ├── preventDefault.ts  # 阻止 F12、右鍵選單、文字選中、圖片拖動等預設行為的方法
│   │   ├── print.ts  # 列印函式
│   │   ├── propTypes.ts  # 二次封裝 Vue 的 propTypes
│   │   ├── responsive.ts  # 全局響應式 Storage 設定
│   │   ├── sso.ts  # 前端單擊登入 (SSO) 邏輯處理
│   │   ├── tree.ts  # 樹狀結構相關處理函式
│   ├── views  # 官方範例業務頁面存放處
│   ├── views-custom  # [客製化] 專案實際業務邏輯頁面存放處 (採 L1/L2 結構)
111: │   │   ├── item-portfolio  # 報價項目管理 (作業區域、服務項目)
112: │   │   ├── quotation       # 報價管理 (報價清單維護)
113: │   │   ├── service-workspace # 服務管理 (服務單、派工、結案)
114: │   │   └── system           # 系統管理 (使用者維護、角色維護)
│   ├── App.vue  # 入口頁面元件
│   ├── main.ts  # 入口檔案
├── types  # 全局 TypeScript 類型定義 (Type Definitions)
│   │   ├── directives.d.ts  # 全局自定義指令類型宣告
│   │   ├── global-components.d.ts  # 自定義全局元件的 Volar 類型提示宣告
│   │   ├── global.d.ts  # 全局類型宣告，無需引入即可在 .vue、.ts、.tsx 中使用
│   │   ├── index.d.ts  # 零散的全局類型宣告
│   │   ├── router.d.ts  # 全局路由類型宣告
│   │   ├── shims-tsx.d.ts  # 提供 .tsx 檔案的類型支援與語法識別
│   │   └── shims-vue.d.ts  # 協助 TypeScript 識別 .vue 與 .scss 等非標準檔案類型
├── .browserslistrc  # 設定目標瀏覽器環境支援範圍
├── .dockerignore  # 排除不需要上傳到 Docker 伺服端的檔案或目錄
├── .editorconfig  # 跨編輯器檔案格式與樣式定義設定 https://editorconfig.org/
├── .env  # 全局環境變數設定（當 .env 檔案與 .env.development、.env.production、.env.staging 這三個檔案之一存在相同的設定 key 時，.env 優先權較低）
├── .env.development  # 開發環境變數設定
├── .env.production  # 正式環境變數設定
├── .env.staging  # 預發布 (Staging) 環境變數設定
├── .gitattributes  # 自定義指定檔案屬性
├── .gitignore  # Git 提交忽略檔案清單
├── .gitpod.yml  # Gitpod 部署設定
├── .lintstagedrc  # lint-staged 設定（僅檢查提交的檔案）
├── .markdownlint.json  # Markdown 格式檢查設定
├── .npmrc  # npm 設定檔
├── .nvmrc  # 指定專案建議使用的 Node.js 版本 (NVM)
├── .prettierignore  # Prettier 代碼格式化忽略檔案
├── .prettierrc.js  # Prettier 外掛設定
├── .stylelintignore  # Stylelint 樣式檢查忽略檔案
├── CHANGELOG.en_US.md  # 版本更新日誌（英文版）
├── CHANGELOG.md  # 版本更新日誌
├── CHANGELOG.zh_CN.md  # 版本更新日誌（簡體中文版）
├── Dockerfile  # 用於建置 Docker 鏡像 (Image)
├── LICENSE  # 授權條款
├── README.en-US.md  # 專案說明文件（英文版）
├── README.md  # 專案說明文件
├── commitlint.config.js  # Git 提交訊息格式檢查設定
├── eslint.config.js  # ESLint 代碼語法檢查設定
├── index.html  # HTML 主進入點
├── package.json  # 套件管理與腳本指令設定
├── pnpm-lock.yaml  # 相依套件版本鎖定檔案
├── postcss.config.js  # PostCSS 外掛設定
├── stylelint.config.js  # Stylelint 樣式檢查設定
├── tailwind.config.ts  # Tailwind CSS 設定
├── tsconfig.json  # TypeScript 編譯設定
└── vite.config.ts  # Vite 建置工具設定
```
