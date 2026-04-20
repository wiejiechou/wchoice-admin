import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 客戶維護表單驗證規則 */
export const customerRules = reactive<FormRules>({
  buzentityId: [{ required: true, message: "請輸入統一編號", trigger: "blur" }],
  buzentityName: [
    { required: true, message: "請輸入客戶名稱", trigger: "blur" }
  ],
  buzentityAddr: [
    { required: true, message: "請輸入客戶地址", trigger: "blur" }
  ],
  contactName: [{ required: true, message: "請輸入聯絡人", trigger: "blur" }],
  contactInfo: [{ required: true, message: "請輸入聯絡電話", trigger: "blur" }]
});
