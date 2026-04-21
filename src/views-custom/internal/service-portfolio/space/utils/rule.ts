import { reactive } from "vue";
import type { FormRules } from "element-plus";

export const spaceRules = reactive<FormRules>({
  spaceName: [{ required: true, message: "請輸入區域名稱", trigger: "blur" }],
  spaceCode: [
    { required: true, message: "請輸入識別代碼", trigger: "blur" },
    {
      pattern: /^[A-Z_]+$/,
      message: "識別代碼應為英文大寫與底線",
      trigger: "blur"
    }
  ]
});
