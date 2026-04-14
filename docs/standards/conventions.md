# WChoice Admin 開發規範與 AI 協作契約

> 本文件定義了專案在技術實作、UI 介面對齊與 AI Agent 交付時的強制性規範，旨在降低開發錯誤率並提升程式碼一致性。

---

## 🏗️ 技術棧與前端規範

### 1. Tailwind CSS v4 實務

- **版本對齊**：嚴格遵循 Tailwind CSS v4 規範。
- **後綴驚嘆號**：對於強制覆蓋或重要樣式，採用後置 `!` 語法（例如：`w-45!`、`pt-3!`），嚴禁使用 v3 的前置 `!w-[180px]`。
- **拒絕隨意值 (Arbitrary Values)**：優先使用系統標籤 (Tokens)，除非必要，禁止使用 `w-[123px]` 等寫死數值。
- **樣式隔離**：在 Vue 組件中使用 `<style lang="scss" scoped>`，並透過 `:deep()` 穿透修改外部元件樣式。

### 2. 組件開發策略 (Research-First)

- **範本對齊**：在開發新功能前，必須檢索 `src/views` 下的官方範例（如：Role, User, Dept），以這類成熟模組作為邏輯與介面範本。
- **元件重用**：優先搜尋現有可用的組件（如 `PureTableBar`、`pure-table`），如需建立新組件但功能與現有相似，**必須先提問諮詢**，嚴禁重複造輪子。

---

## 🛡️ AI Agent 交付檢查清單 (CI/CD Checklist)

在任何程式碼異動交付前，AI Agent 必須逐一核實以下清單：

### 1. 變數與邏輯完整性

- [ ] **Template Ref 核實**：若在 Template 中定義了 `ref="xxx"`，必須在 `<script setup>` 中顯式宣告 `const xxx = ref()`。
- [ ] **類型引入核實**：在從 `types.ts` 等外部檔案引入成員前，必須先讀取該檔案確認成員確實存在且已匯出。

### 2. 代碼品質驗證

- [ ] **針對性檢查**：修改檔案後，必須針對該特定檔案執行語法與類型檢查（例如：`npx eslint --fix [filename]`）。
- [ ] **清理未使用變數**：交付前應移除重構過程中殘留的 unused imports 或 unused variables。

### 3. 環境感知

- [ ] **版本準則**：以 `package.json` 中的技術版本為準，不使用過時的 API 或語法（如 Vue 2 語法或 Tailwind v3 語法）。

---

## 📅 版本記錄

- **2026-04-14 (v1.0)**：初始版本。記錄了報價單清單重構中的 `formRef` 缺失、`SearchFormProps` 導入報錯等教訓。
