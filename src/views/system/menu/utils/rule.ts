import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定義表單规则校驗 */
export const formRules = reactive(<FormRules>{
  title: [{ required: true, message: "選單名稱為必填项", trigger: "blur" }],
  name: [{ required: true, message: "路由名稱為必填项", trigger: "blur" }],
  path: [{ required: true, message: "路由路径為必填项", trigger: "blur" }],
  auths: [{ required: true, message: "權限标识為必填项", trigger: "blur" }]
});
