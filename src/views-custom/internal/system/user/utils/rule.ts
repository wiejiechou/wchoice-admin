import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定義表單驗證規則 */
export const formRules = reactive<FormRules>({
  username: [
    { required: true, message: "帳號為必填項", trigger: "blur" },
    { min: 3, max: 20, message: "長度在 3 到 20 個字元", trigger: "blur" }
  ],
  nickname: [{ required: true, message: "姓名為必填項", trigger: "blur" }],
  password: [
    { required: true, message: "密碼為必填項", trigger: "blur" },
    { min: 6, message: "密碼長度不能少於 6 位", trigger: "blur" }
  ],
  phone: [
    {
      pattern: /^09\d{8}$/,
      message: "請輸入正確的手機號碼格式 (例如: 0912345678)",
      trigger: "blur"
    }
  ],
  email: [
    {
      type: "email",
      message: "請輸入正確的電子信箱格式",
      trigger: "blur"
    }
  ]
});
