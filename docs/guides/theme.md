# 品牌化與主題自定義指南

本文件旨在指導開發人員如何在 `wchoice-admin` (Vue Pure Admin) 中新增、修改自定義主題風格，並將其設定為系統預設值。

---

## 🎨 核心流程說明

自定義主題涉及三個核心層次：**樣式層 (CSS Variables)**、**邏輯層 (Hooks Registration)** 以及 **配置層 (Config Defaults)**。

### 第一步：定義樣式變數 (SCSS)

所有的主題顏色變數都集中在 `src/style/theme.scss`。

1. 打開 `src/style/theme.scss`。
2. 新增一個 `html[data-theme="your-theme-id"]` 選擇器。
3. 根據需求設定 CSS 變數（通常參考 `light` 或 `default` 進行調整）。

**範例 (Wang Choice Theme)：**

```scss
/* Wang Choice Theme — 深青金色 */
html[data-theme="wang-choice-theme"] {
  --pure-theme-sub-menu-active-text: #000000d9;
  --pure-theme-menu-bg: #fff;
  --pure-theme-menu-hover: #f6f6f6;
  --pure-theme-sub-menu-bg: #fff;
  --pure-theme-menu-text: rgb(0 0 0 / 60%);
  --pure-theme-sidebar-logo: #fff;
  --pure-theme-menu-title-hover: #000;
  --pure-theme-menu-active-before: #4091f7;
}
```

---

### 第二步：註冊主題邏輯 (TypeScript Hooks)

系統需要知道新的主題 ID 對應哪種主色調，以便更新 Element Plus 的 UI 組件。

1. 修改 `src/layout/hooks/useDataThemeChange.ts`。
2. 在 `themeColors` 陣列中新增一筆記錄。

**範例：**

```typescript
const themeColors = ref<Array<themeColorsType>>([
  // ... 其他既有主題
  { color: "#f39800", themeColor: "wang-choice-theme" }
]);
```

- `color`: 這是 Element Plus 的 Primary Color (主色)。
- `themeColor`: 必須與第一步在 SCSS 中定義的 `data-theme` 屬性值完全一致。

---

### 第三步：設定預設主題 (Platform Config)

若要讓新主題在使用者首次進入或清除快取後生效，需修改全域配置文件。

1. 修改 `public/platform-config.json`。
2. 更新 `"Theme"` 欄位。

**範例：**

```json
{
  "Title": "Wang Choice",
  "Theme": "wang-choice-theme"
  // ... 其他設定
}
```

---

## 🔡 4. 字型與視覺自定義 (Font Customization)

若要更換全域字型（如加入「芫荽字型 (Iansui)」），請依序執行以下三個步驟：

1. **修改 `package.json`**：加入字型套件依賴。
2. **在 `src/main.ts` 引入樣式**：
   ```typescript
   import "iansui/dist/iansui.css";
   ```
3. **在 `src/style/reset.scss` 設定優先級**：
   ```scss
   font-family: Iansui, "Helvetica Neue", ..., sans-serif;
   ```

---

## 📦 5. 依賴與 Lock 檔管理規範

在進行主題或字型調整時，若涉及 `package.json` 的變動，請遵守以下維護原則：

### A. 嚴禁手動編輯 `pnpm-lock.yaml`

`pnpm-lock.yaml` 是機器產生的環境快照，手動修改會導致 Hash 校驗失敗或依賴衝突。

### B. 常規維護流程

只需完成上述三個檔案的修改，接著在終端機執行：

```powershell
pnpm install
```

系統會根據 `package.json` 的變動**自動更新** `pnpm-lock.yaml`。開發者只需確認異動內容並一同提交至 Git 即可。

---

## 🔍 建置與部署注意事項

... (後續內容保持不變)

1. **開發環境驗證**：在執行 `pnpm dev` 時，確認側邊欄與按鈕顏色是否符合預期。
2. **靜態資源路徑**：若部署至 GitHub Pages，請確保 `pages.yml` 工作流中的 `VITE_PUBLIC_PATH` 正確替換為 `/wchoice-admin/`。
3. **快取清理**：由於系統會將主題設定儲存在 `LocalStorage`，若修改預設值後沒看到變化，請點擊系統選單中的「重置設定」或清理瀏覽器快取。

---

## 📅 版本記錄

- **2026-04-08**：紀錄 `wang-choice-theme` 實作經驗 (Antigravity vj.chou)
