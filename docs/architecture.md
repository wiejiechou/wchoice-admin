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

- **UI 與 邏輯分離**：通過 `Hooks` (位於 `utils` 或 `views/xxx/utils`) 抽離複雜邏輯，保持 `.vue` 檔案簡潔。
- **動態路由**：支援由後端驅動的動態菜單與路由生成，並結合前進/後退緩存。

### B. 配置管理 (Platform Config)

- **Runtime Configuration**：`public/platform-config.json` 允許在專案打包後，無需重新編譯即可修改全局配置（如 API Base URL、平台標題等）。
- **環境變數**：支援 `.env`, `.env.development`, `.env.staging`, `.env.production` 多套環境切換。

## 🔐 3. 權限與安全 (Auth & Security)

- **路由守衛**：透過網址導航守衛進行 Token 驗證與權限檢查。
- **按鈕權限**：提供 `v-auth` 或 `v-perms` 自定義指令，精確控制組件/按鈕的顯示。
- **HTTP 封裝**：統一封裝 Axios，集中處理 Token 注入與 401/403 等異常攔截。

## 🚀 4. 自動化維運 (DevOps)

### A. CI/CD 工作流

- **GitHub Actions**：
  - `pages.yml`：自動化建置並部署至 GitHub Pages。流程包含環境檢查、Vite 打包與 Artifact 上傳。
  - `linter.yml`：自動進行程式碼質量檢查。

### B. 容器化支援

- **Docker**：專案內建 `Dockerfile` 支援快速生成 Nginx 映射鏡像，適合 K8s 或雲端容器環境部署。

## 🛠 5. 擴展與維護規範

- **Directory Standard**：嚴格遵循專案既有的目錄規範（詳見 `docs/directory-structure.md`）。
- **Commit Style**：遵循 Angular 提交規範 (`feat/fix/chore...`)。
- **Style Consistency**：自動化 Prettier 與 Stylelint 校驗。

---

## 📅 更新記錄

- **2026-04-08**：初次建立架構摘要 (Antigravity vj.chou)
