import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自訂表單規則校驗 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "角色名稱為必填項", trigger: "blur" }],
  code: [{ required: true, message: "角色識別為必填項", trigger: "blur" }]
});
