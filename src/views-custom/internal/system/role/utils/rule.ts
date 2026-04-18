import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 角色表單驗證規則 */
export const formRules = reactive<FormRules>({
  name: [{ required: true, message: "角色名稱為必填項", trigger: "blur" }],
  code: [{ required: true, message: "角色標識為必填項", trigger: "blur" }]
});
