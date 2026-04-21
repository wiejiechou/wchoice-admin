import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 表單校驗規則 */
export const serviceItemRules = reactive<FormRules>({
  name: [{ required: true, message: "服務項目名稱為必填", trigger: "blur" }],
  unit: [{ required: true, message: "計量單位為必填", trigger: "blur" }]
});
