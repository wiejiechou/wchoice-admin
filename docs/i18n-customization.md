# 國際化 (i18n) 客製化與新增語系指南

本文件記錄了在 WChoice Admin（基於 Vue Pure Admin）中新增自訂語系（例如：繁體中文 `zh-TW`），並將其設定為系統預設語言的標準作業流程 (SOP)。

未來若需新增其他語系（如日文 `ja`、韓文 `ko` 等），可依循此文件的步驟進行擴充。

---

## 建立語言包檔案

1. **新增 YAML 語言檔**
   在 `locales/` 目錄下建立新的語系檔案，例如 `locales/zh-TW.yaml`。
2. **翻譯欄位**
   確保新建立的 YAML 檔案中包含系統所需的所有鍵值（可參考既有的 `zh-CN.yaml` 進行翻譯轉換）。

---

## 核心配置層更新

將新增的語系掛載至 Vue I18n 與 Element Plus 環境，並修改系統初始化時的預設值。

### 1. 註冊 i18n 語系 (`src/plugins/i18n.ts`)

- **引入 UI 庫語系包**：引入 `element-plus` 的對應語言包。
- **掛載設定**：在 `localesConfigs` 中加入新的語系節點。
- **修改預設 Fallback (可選)**：若要將新語系設為系統預設，需修改 `siphonI18n`、`flatI18n` 以及最後匯出的 `createI18n` 實例的預設值。

```typescript
// 1. 引入 Element Plus 的繁體中文語言包
import zhTwLocale from "element-plus/es/locale/lang/zh-tw";

const siphonI18n = (function () {
  // ...
  // 2. 修改預設 Prefix 取代為 "zh-TW"
  return (prefix = "zh-TW") => {
    return cache[prefix];
  };
})();

export const localesConfigs = {
  // ...
  // 3. 註冊新的參數
  "zh-TW": {
    ...siphonI18n("zh-TW"),
    ...zhTwLocale
  },
};

// ...包含 flatI18n, transformI18n 中的兜底預設值也要一併替換為 zh-TW

export const i18n: I18n = createI18n({
  // 4. LocalStorage 取不到時的最終預設語系
  locale: storageLocal().getItem<StorageConfigs>(...)?.locale ?? "zh-TW",
  // ...
});
```

### 2. 全域設定檔 (`public/platform-config.json`)

將平台全域設定的 `Locale` 值改為新語系的 key。

```json
{
  "Locale": "zh-TW"
}
```

### 3. 響應式儲存初始值

當使用者首次載入系統，快取 (LocalStorage) 是空的，需確保填入剛才設定的預設語系。

- **`src/layout/hooks/useLayout.ts`**
  ```typescript
  if (!$storage.locale) {
    $storage.locale = { locale: $config?.Locale ?? "zh-TW" }; // zh 改為 zh-TW
    // ...
  }
  ```
- **`src/utils/responsive.ts`**
  ```typescript
  locale: Storage.getData("locale", nameSpace) ?? {
    locale: config.Locale ?? "zh-TW" // zh 改為 zh-TW
  },
  ```

---

## 狀態與邏輯層更新

### 1. 新增語系切換邏輯 (`src/layout/hooks/useTranslationLang.ts`)

提供供 UI 元件觸發的獨立切換函式，並修改元件掛載時的預設值。

```typescript
// 1. 增加專屬的切換 Method
function translationTw() {
  $storage.locale = { locale: "zh-TW" };
  locale.value = "zh-TW";
  ref && handleResize(ref.value);
}

// 2. 修改預設的 Locale 賦值
onBeforeMount(() => {
  locale.value = $storage.locale?.locale ?? "zh-TW";
});

// 3. 別忘了在 Return 中匯出 translationTw
return { translationTw, ... };
```

### 2. Element Plus / Plus Pro Components 狀態映射 (`src/App.vue`)

在此掛載全局的 Third-party UI 組件語言包，並依據 currentLocale 進行分派。

```typescript
// 1. 引入語言包
import zhTw from "element-plus/es/locale/lang/zh-tw";
import plusZhTw from "plus-pro-components/es/locale/lang/zh-tw";

// 2. 更新 currentLocale computed 行為
const currentLocale = computed(() => {
  if ($storage.locale?.locale === "zh-TW") {
    return { ...zhTw, ...plusZhTw };
  }
  // 其他舊有的條件邏輯...
});
```

---

## UI 介面更新

找到所有渲染語系切換清單的地方，通常包含系統導航列與首頁登入頁面，並新增對應的下拉選單選項 (Dropdown Item)。

**受影響的路徑：**

- `src/layout/components/lay-navbar/index.vue`
- `src/layout/components/lay-sidebar/NavHorizontal.vue`
- `src/layout/components/lay-sidebar/NavMix.vue`
- `src/views/login/index.vue`

**修改範例：**

```vue
<script setup>
// 解構匯出之前新定義的 translationTw
const { locale, translationTw } = useTranslationLang();
</script>

<template>
  <!-- 新增 Dropdown Item -->
  <el-dropdown-item
    :style="getDropdownItemStyle(locale, 'zh-TW')"
    :class="['dark:text-white!', getDropdownItemClass(locale, 'zh-TW')]"
    @click="translationTw"
  >
    <span v-show="locale === 'zh-TW'" class="check-zh-tw">
      <IconifyIconOffline :icon="Check" />
    </span>
    繁體中文
  </el-dropdown-item>
</template>

<style lang="scss" scoped>
/* 別忘記加上該選項左側 Check icon 的定位 CSS (如果專案原本有這層控制) */
.check-zh-tw {
  position: absolute;
  left: 20px;
}
</style>
```

---

## 常見問題與驗證

1. **為什麼修改完後，開啟網頁還是舊的語言？**
   答：這是因為你的瀏覽器 `LocalStorage` 中已經存有了舊的狀態 (`zh` 或 `en`)。請利用**無痕模式**或在開發人員工具中**清除 Site Data (Local Storage)** 後重新整理測試。
2. **Plus Pro Components 找不到對應的語言包？**
   答：請確保 `$ npm view plus-pro-components` 支援您要新增的語系，如果目前沒有支援，退而求其次可以在 `App.vue` 中的分派邏輯裡，使用英文或簡體中文做為其語言包的頂替 (Fallback)。
