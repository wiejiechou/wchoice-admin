# WChoice Admin 技術架構摘要

本文件彙整了 `wchoice-admin` (基於 `vue-pure-admin` 模板) 的核心架構設計與技術規範，作為後續開發與維運的參考基準。

## 🏗 1. 核心技術棧 (Core Tech Stack)

- **前端框架**：[Vue 3](https://vuejs.org/) (Composition API)
- **構建工具**：[Vite](https://vitejs.dev/)
- **UI 組件庫**：[Element Plus](https://element-plus.org/)
- **程式語言**：[TypeScript](https://www.typescriptlang.org/)
- **狀態管理**：[Pinia](https://pinia.vuejs.org/)
- **樣式系統**：[Tailwindcss](https://tailwindcss.com/) + [SCSS](https://sass-lang.com/)
- **包管理**：[pnpm](https://pnpm.io/) (核心依賴管理與速度優化)

## 📂 2. 架構設計理念

### A. 開放性、封閉原則

### B. 模組重用與開發規範 (Reusability)

- **範例先行**：在開發 `src/views-custom` 定製功能前，必須先調研 `src/views` 下的官方範例（如表格、表單、Hooks 等），嚴禁「土法煉鋼」或「黑盒開發」。
- **元件重用**：優先複用框架封裝的元件 (如 `RePureTableBar`, `v-auth` 等)，確保與原體系的交互體驗一致。

### C. 配置管理 (Platform Config)

- **Runtime Configuration**：`public/platform-config.json` 允許在專案打包後，無需重新編譯即可修改全局配置（如 API Base URL、平台標題等）。
- **環境變數**：支援 `.env`, `.env.development`, `.env.staging`, `.env.production` 多套環境切換。

## 🔐 3. 權限與安全 (Auth & Security)

- **權限宣告中心**：建立 `src/router/perm-declaration.ts` 集中管理角色組合（如 `DEMO_DEFAULT`, `ADMIN_ONLY`），實現路由配置與角色定義的解耦。
- **路徑過濾策略**：針對官方 Demo 路由，透過引用 `PERM_SETTINGS.DEMO_DEFAULT` 統一口徑，便於在演示或正式版中一鍵調整（如對 `wchoice` 角色隱藏）。
- **路由守衛**：透過網址導航守衛進行 Token 驗證與權限檢查。
- **按鈕權限**：提供 `v-auth` 或 `v-perms` 自定義指令，精確控制組件/按鈕的顯示。
- **HTTP 封裝**：統一封裝 Axios，集中處理 Token 注入與 401/403 等異常攔攔。

## 🚀 4. 自動化維運 (DevOps)

### A. CI/CD 工作流

- **GitHub Actions**：
  - `pages.yml`：自動化建置並部署至 GitHub Pages。流程包含環境檢查、Vite 打包與 Artifact 上傳。
  - `linter.yml`：自動進行程式碼質量檢查。

### B. 容器化支援

- **Docker**：專案內建 `Dockerfile` 支援快速生成 Nginx 映射鏡像，適合 K8s 或雲端容器環境部署。

## 🛠 5. 擴展與維護規範

- **Directory Standard**：嚴格遵循專案既有的目錄規範，並區隔官方與自定義視圖（詳見 `docs/directory-structure.md`）。
- **Commit Style**：遵循 Angular 提交規範 (`feat/fix/chore...`)。
- **Style Consistency**：自動化 Prettier 與 Stylelint 校驗。

---

## 📅 更新記錄

- **2026-04-13**：重構權限宣告體系，引入 `PERM_SETTINGS` 管理靜態與動態路由選單 (Antigravity)
- **2026-04-08**：初次建立架構摘要 (Antigravity vj.chou)
