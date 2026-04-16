# WChoice Admin 開發規範與 AI 協作契約

> 本文件定義了專案在技術實作、UI 介面對齊與 AI Agent 交付時的強制性規範，旨在降低開發錯誤率並提升程式碼一致性。

---

## 🏗️ 技術棧與前端規範

### 0. 黃金範本 (Golden Sample) - 強制參考

- **參考路徑**：`src/views-custom/quotation/`
- **地位**：本模組為 WChoice Admin 的 **「組件化與互動範本」**。
- **核心實作模式**：
  - 列表與 Hook 分離：`list.vue` -> `utils/hook.tsx`
  - 表單組件化：`form.vue` (接受 props, 透過 emit 回推數據)
  - 互動模型：`ReDrawer` (size: 100%)
  - 數據聚合：`computed` (取代 watch)
  - 事件驅動：`emit('close')` (取代 onClose prop，避免渲染函數事件識別衝突)

### 1. 代碼風格與格式規範 (Styling & Formatting)

- **多屬性標籤排版**：
  - 當一個標籤/組件擁有 **3 個屬性以上** 或 **單行長度過長** 時，必須將屬性進行換行排版，每個屬性獨立佔據一行。
  - **範例**：
    ```vue
    <el-button type="primary" size="large" plain @click="handleSubmit(true)">
      儲存
    </el-button>
    ```
  - **規範依據**：專案 `.prettierrc.js` 與 ESLint `vue/max-attributes-per-line`。

### 2. Tailwind CSS v4 實務

- **版本對齊**：嚴格遵循 Tailwind CSS v4 規範。
- **後綴驚嘆號**：對於強制覆蓋或重要樣式，採用後置 `!` 語法（例如：`w-45!`、`pt-3!`），嚴禁使用 v3 的前置 `!w-[180px]`。
- **拒絕隨意值 (Arbitrary Values)**：優先使用系統標籤 (Tokens)，除非必要，禁止使用 `w-[123px]` 等寫死數值。
- **樣式隔離**：在 Vue 組件中使用 `<style lang="scss" scoped>`，並透過 `:deep()` 穿透修改外部元件樣式。

### 2. 組件開發策略 (Research-First)

- **範本對齊**：在開發新功能前，必須檢索 `src/views` 下的官方範例（如：Role, User, Dept），以這類成熟模組作為邏輯與介面範本。
- **元件重用**：優先搜尋現有可用的組件（如 `PureTableBar`、`pure-table`），如需建立新組件但功能與現有相似，**必須先提問諮詢**，嚴禁重複造輪子。
- **單一表單策略 (Single-Form-Strategy)**：針對商業邏輯高度重疊（如計算、檢核規則一致）的「新增」與「編輯」功能，**必須共用同一份 `form.vue`**，透過 `initialData` Prop 區分狀態，落實 DRY (Don't Repeat Yourself) 原則。

---

## 🎨 UI 互動規範

### 1. 複雜表單與 RWD 支援

- **全螢幕抽屜 (Drawer First)**：針對欄位較多或排版複雜的業務表單（如：報價單、訂單明細），優先採用 `size="100%"` 的全螢幕抽屜模式。
- **排除 Modal 與 Page**：在平板 (7吋以上) 裝置上，全螢幕抽屜能提供比 Modal 更好的沈浸感，並避免開啟多個 Page 路由標籤 (Tabs) 造成的管理困擾。

### 2. 狀態連動邏輯

- **宣告式計算 (Computed-over-Watch)**：處理合計金額、稅金、總工時等衍生數值時，**強制使用 `computed`**。嚴禁使用深度 `watch` 或在 UI 事件中手動改寫 state，以確保數據流的一致性。

### 3. 複雜組件狀態同步 (State Synchronization)

- **本地累加器模式 (Local Accumulator Pattern)**：針對具備內部狀態且支援批次操作的元件（如：照片上傳 `el-upload`），必須解決 **「Props 非同步更新陷阱」**。
- **問題背景**：批次選取 3 張照片時，`on-change` 會同步連續觸發 3 次，但此時 `props.modelValue` 尚未完成更新。若依賴 props 進行累加，後面的事件會覆蓋前面的資料。
- **解決方案**：
  1. 引入 **`localFiles` (ref)** 作為元件內部的「單一事實來源」。
  2. `handleChange` 同步操作本地 ref，確保連續事件正確累加。
  3. 使用 `watch(props.modelValue, ...)` 處理編輯模式的數據回填。
  4. 刪除操作時，除了更新本地 ref，必須顯式清除內部元件（如 `el-upload`）的私有列表，防止「舊檔復活」現象。

### 4. 研發導向實務 (Research-Driven Implementation)

- **官方範例優先 (Demo-First-Search)**：在實作架構功能（如：Excel 匯出、表頭過濾、複雜圖表）前，**必須先搜尋 `src/views` 下的官方 Demo**。
- **一致性價值**：透過檢索官方對應功能（如 `src/views/table`），能確保新功能與 `pure-admin` 頂層框架的數據流、樣式主題及依賴套件（如 `xlsx`）完全對齊，避免重複引入同類套件或破壞 UI 一致性。

### 5. 響應式解構規範 (Reactivity & Destructuring Hygiene)

- **解構鎖定 (Destructuring Sync)**：在使用 Hook 模式 (`const { ... } = useXXX()`) 時，必須嚴格核對 `.vue` 檔案中的解構列表與 Hook 匯出的成員。
- **靜默失敗警報**：若 `v-model` 綁定後無法輸入或無即時過濾效果，首要檢查點即為 **「是否在解構時遺漏該變數」**。在 Vue 3 `script setup` 中，解構遺漏會導致 Template 綁定到一個非預期的局部變數或導致 undefined 綁定。
- **位置觀則 (Placement Strategy)**：對於「快速過濾」功能，若表格欄位過窄，優先選擇將輸入框置於 `PureTableBar` 的 `buttons` 區域，而非嵌入 `headerRenderer`，以維持整潔的視覺層級。

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

### 4. 斷根思維原則 (Root-Cause Thinking)

- **拒絕修殘補灶 (Anti-Patching)**：嚴禁陷入「修好 A 卻錯了 B，修好 B 又錯了 A」的循環往復 Bug。
- **第二輪警報**：若一項 Bug 進入第二輪修復且呈現反覆狀態，**必須立即停止補丁式修正**。
- **架構重對齊**：此時應跳脫現有實作，重新從 **數據流向、狀態歸屬、組件生命週期** 等架構層面進行深度分析，設計一套能從根本解決問題的方案（如：`WChoiceUploader` 透過本地累加器徹底解耦狀態）。

---

## 📅 版本記錄

- **2026-04-16 (v1.5)**：新增「路由與目錄管理策略」。確立 L1/L2 層次化佈局規範，並要求選單 Path 與實體目錄必須 1:1 映射，以支援精準的路徑權限制定。
- **2026-04-14 (v1.4)**：新增「研發導向實務」與「響應式解構規範」。強調實作前必須檢索官方 `src/views` 範本，並強化 Hook 解構時的變數對齊意識，避免 UI 綁定失效。
- **2026-04-14 (v1.3)**：追加「斷根思維原則」，明確要求 AI Agent 在遇到反覆 Bug 時必須由架構層面重新設計，拒絕補丁式修復。
- **2026-04-14 (v1.2)**：新增「本地累加器模式」規範。解決了 `WChoiceUploader` 在批次上傳與刪除同步時的非同步狀態覆蓋與舊檔復活問題。
- **2026-04-14 (v1.1)**：追加程式碼格式化（多屬性換行）規範、確立 Emit-First 組件通訊原則，並定義新增/編輯共用表單之開發策略。
- **2026-04-14 (v1.0)**：初始版本。記錄了報價單清單重構中的 `formRef` 缺失、`SearchFormProps` 導入報報錯等教訓。
