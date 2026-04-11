import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定義表單规则校驗 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "角色名稱為必填项", trigger: "blur" }],
  code: [{ required: true, message: "角色标识為必填项", trigger: "blur" }]
});
