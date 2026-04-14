# WChoice Admin 開發進度交接文件 (Handoff)

本文件紀錄了截至目前的開發進度、環境配置現況以及後續待處理的架構工作。

## 📈 1. 目前進度摘要 (Progress Overview)

### A. 環境與 CI/CD 配置 ✅

- **Git 身份對齊**：已完成 `wiejiechou` 帳號的 Local Git 配置。
- **倉庫連結**：成功連線至 `https://github.com/wiejiechou/wchoice-admin.git`。
- **GitHub Pages**：
  - 更新 `.github/workflows/pages.yml` 使用 GitHub 官方 Actions 部署模式。
  - 成功解決 403 (權限) 與 404 (資源路徑) 問題。
  - 站點已上線：[https://wiejiechou.github.io/wchoice-admin/](https://wiejiechou.github.io/wchoice-admin/)

### B. 視覺與品牌化 (Branding) ✅

- **主題開發**：完成 `wang-choice-theme` 自定義主題（主色：`#f39800`）。
- **系統預設值**：已於 `platform-config.json` 將其設定為啟動預設主題。
- **字型引入**：成功匯入「芫荽字型 (Iansui)」，並完成全域 CSS Reset 指引。

### C. 文件體系建立 ✅

已建立以下技術文件歸檔於 `docs/`：

1. `deploy.md`：部署經驗與疑難排解。
2. `architecture.md`：架構核心摘要。
3. `theme-customization.md`：主題與字型自定義指南。
4. `directory-structure.md`：目錄結構說明。

---

## 🛠 2. 技術細節備忘

- **依賴管理**：`pnpm-lock.yaml` 透過 `pnpm install` 自動維護，嚴禁手動編輯。
- **資源路徑**：部署腳本中透過 `sed` 指令動態修正 `VITE_PUBLIC_PATH = /wchoice-admin/`。

---

## 🚀 3. 待辦事項 (Pending Tasks)

### 🟢 已完成：i18n 語系規劃

- **現況**：已掛載 `zh-TW` 並設為全域預設語系。
- **已執行步驟**：
  - [x] 建立 `zh-TW.yaml`。
  - [x] 在 `i18n.ts` 註冊 `zh-TW` 及 Element Plus 繁中語言包。
  - [x] 修改 `platform-config.json` 預設 Locale 為 `zh-TW`。
  - [x] 在 `useLayout.ts`、`responsive.ts` 及 `useTranslationLang.ts` 寫入預設 fallback。
  - [x] 於 UI 導航列與首頁登入加入繁體中文切換選項。

### 🔴 高優先級：熟悉選單維護與管理方式

- **目標**：掌握在 `wchoice-admin` 專案中配置路由與選單結構的標準做法，釐清靜態與動態路由的管理機制。
- **待執行步驟**：
  - [ ] 閱讀 `src/router` 以及相關文檔。
  - [ ] 確認角色權限 (RBAC) 在前端的映射方式。

### 🟡 中優先級：API 介接與環境環境

- **待執行步驟**：
  - [ ] 確認生產環境 API 端點。
  - [ ] 配置 `.env.production` 或修訂 `platform-config.json` 中的後端代理。

---

## 📅 最後更新日期

2026-04-08 (Antigravity vj.chou)
