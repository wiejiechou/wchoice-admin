import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { isPhone, isEmail } from "@pureadmin/utils";

/** 自定義表單规则校驗 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "部門名稱為必填项", trigger: "blur" }],
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback();
        } else if (!isPhone(value)) {
          callback(new Error("請輸入正確的手机號碼格式"));
        } else {
          callback();
        }
      },
      trigger: "blur"
      // trigger: "click" // 如果想在點選確定按鈕時触发這個校驗，trigger 設定成 click 即可
    }
  ],
  email: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback();
        } else if (!isEmail(value)) {
          callback(new Error("請輸入正確的邮箱格式"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});
