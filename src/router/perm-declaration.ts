/**
 * 客製化檔案 - 定義權限角色組合，供路由配置使用
 * 這個檔案專門用來集中管理權限角色的定義，確保在路由配置中引用時的一致性和可維護性
 */

// 1. 基礎角色組合定義
const ROLES_ADMIN_COMMON = ["admin", "common"];
const ROLES_FULL_ACCESS = ["admin", "common", "wchoice"];

/**
 * 權限配置物件 (具名導出，支援 IDE 自動補全)
 */
export const PERM_SETTINGS = {
  /** 預設 Demo 權限：限制 admin 與 common 可見 */
  DEMO_DEFAULT: ROLES_ADMIN_COMMON,

  /** 延伸 Demo 權限：包含 wchoice 角色 */
  DEMO_EXTENDED: ROLES_FULL_ACCESS,

  /** 管理員專用 */
  ADMIN_ONLY: ["admin"]
} as const;

// 預設導出，提供更多元的引用方式
export default PERM_SETTINGS;
