# 選單維護與權限管理 (Menu & RBAC Management)

本說明文件對應 WChoice-Admin 的選單管理架構與角色存取控制 (RBAC) 之實作機制。本專案以 `vue-pure-admin` 為基底，將選單分為靜態與動態兩種類型，並以 `router.meta` 為核心實現全端權限對齊。

## 1. 路由類型與載入機制

### 1.1 靜態路由 (Static Routes)

- **位置**：`src/router/modules/**/*.ts`
- **載入方式**：由 Vite 提供的 `import.meta.glob` 靜態批次掃描載入（自動排除系統核心關聯的 `home.ts`, `remaining.ts`, `error.ts`，這三個檔案不可刪除或隨意修改，若需隱藏可加上 `showLink: false`）。
- **用途**：不需要走後端權限驗證的系統基礎頁面，如：系統首頁 (`/home`)、登入頁 (`/login`)、錯誤處理頁 (`/error/404`、`/error/403`) 與無 Layout 的外部內嵌頁面（配置在 `remaining.ts`）。
- **處理機制**：透過 `src/router/index.ts` 將巢狀結構轉換以確保 Vue 的 `keep-alive` 頁面快取機制能正常生效。

### 1.2 動態路由 (Dynamic Routes / Async Routes)

- **位置**：由後台或後端動態配置下發。開發與 Mock 階段主要定義於 `mock/asyncRoutes.ts`。
- **載入方式**：使用者登入後，在 `src/router/utils.ts` 內的 `initRouter()` 函式會呼叫 API (`/get-async-routes`) 取回路由陣列。
- **路徑與對應元件模式**：
  系統底層核心 `addAsyncRoutes` 會重新生成規範路由：
  1. **只傳 path 模式**：如果後端只傳遞了 `path` 欄位，這時配置的 `path` 必須與專案內實際業務 `.vue` 或 `.tsx` 檔案的路徑嚴格保持一致。
  2. **傳 path 和 component 模式**：如果後端不僅提供 `path`，也提供了 `component` 欄位，系統會以 `component` 的值去對應 `.vue` 檔案。此模式下，`path` 就能彈性定義（只需確保首字元有 `/`）。

---

## 2. 選單與路由的進階配置屬性

路由的配置主要為 `RouteConfigsTable` 介面，依賴 `meta` 區塊達成選單外觀、頁面行為的管理。

### 2.1 頁面與選單外觀屬性

- **`title`**：頁面或標籤頁名稱（支援國際化配置，例如：`"menus.hsabnormal"`）。
- **`icon`**：選單圖示。
- **`rank`**：選單排序，針對頂級路由控制，數字越小排列越優先。
- **`showLink`**：是否在側邊選單中顯示。設為 `false` 可隱藏路由使其僅成背景跳轉連結。

### 2.2 二級 / 多級選單生成模式

- **模式一（單一子選單）**：當父級選單下**只有一個子選單**，但在左側選單欄中仍希望長成一般具有目錄的父級折疊樣式時，**必須**在該子選單的 `meta` 加上 `showParent: true`。
- **模式二（多個子選單）**：當父級選單下包含二個或以上子選單時，它會自然渲染為折疊目錄。

### 2.3 其他進階控制屬性

- **`keepAlive`**：是否針對此路由進行快取。
- **`activePath`**：隱藏選單（`showLink: false`）的路由被觸發時，透過 `activePath` 可以指定側邊欄高亮某一個預設目錄項。
- **`frameSrc`**：配置連結來源，配合無 Layout (`remaining.ts`) 使純網頁被內嵌入系統框架中。

---

## 3. 角色權限對應 (RBAC Mapping)

### 3.1 頁面層級權限控制 (Page Level)

透過為該路由的 `meta.roles` 設定對應可以提存取的陣列來達成。例如：

```ts
meta: {
  title: "專案列表",
  roles: ["admin", "wchoice"] // 只有包含在此陣列的角色能看到並進入
}
```

前端具體的安全攔截點：

1. **目錄繪製攔截 (UI隱藏)**：左側選單繪製時，會調用 `src/router/utils.ts` 內的 `filterNoPermissionTree` 函式，交集使用者的 `roles` 與路由的 `meta.roles`；不符者將自 `wholeMenus` 被剔除，這層保證使用者看不見不該見的入口。
2. **路由防護網 (跳轉攔截)**：在 `src/router/index.ts` 的 `router.beforeEach` 內，如果有 `to.meta?.roles` 標示，但是登入者的權限陣列未包含時，會直接返回導跳 `{ path: "/error/403" }`。

### 3.2 按鈕層級權限控制 (Button Level)

針對同一頁面中細小功能（增刪改查），同樣能透過 `meta.auths` 管理功能標籤：

```ts
meta: {
  title: "員工管理",
  auths: ["btn:add", "btn:edit", "btn:delete"]
}
```

畫面元件可藉由 Vue 特有指令 `v-auth` 或利用函數 `hasAuth("btn:add")` 控制特定的按鈕繪製與否。

---

## 4. WChoice 角色導入策略規劃

針對接下來需實現的專案需求：

> 「確保 `wchoice` 使用者角色之選單結構與原型的選單一致，而 `admin` 角色仍維持全系統權限」

目前的實作策略藍圖如下：

1. **帳號基底打底**：在 `mock/login.ts` 內，創建 `wchoice` 專屬配置帳號，夾帶指定角色金鑰 `roles: ["wchoice"]`。
2. **配置 wchoice 專屬路由**：進入 `mock/asyncRoutes.ts`，根據原型清單配置核心業務選單結構（例如報價、專案清單等），並配置賦權：`meta.roles: ["admin", "wchoice"]`。
3. **系統模組權限分離**：對於不需要開放給 `wchoice` 角色的模組（如 System, Monitor、權限中心），確認路由權限強制設定為 `meta.roles: ["admin"]`，從此隱藏並封鎖。
4. **效果模擬檢測**：後續採雙帳號模式登入，檢驗側選單的生成與禁止跳越頁面的防護機制。
