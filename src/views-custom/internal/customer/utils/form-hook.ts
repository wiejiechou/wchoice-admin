import { reactive, ref } from "vue";
import type { CustomerForm } from "./types";
import { message } from "@/utils/message";

export function useCustomerForm(initialData?: Partial<CustomerForm>) {
  const formRef = ref();
  const form = reactive<CustomerForm>({
    buzentityUId: initialData?.buzentityUId || "",
    buzentityId: initialData?.buzentityId || "",
    buzentityName: initialData?.buzentityName || "",
    buzentityAddr: initialData?.buzentityAddr || "",
    headerName: initialData?.headerName || "",
    contactName: initialData?.contactName || "",
    contactInfo: initialData?.contactInfo || "",
    isActive: initialData?.isActive ?? "Y",
    remark: initialData?.remark || ""
  });

  const submitForm = (callback: (data: CustomerForm) => void) => {
    formRef.value.validate(valid => {
      if (valid) {
        callback({ ...form });
      } else {
        message("填寫內容有誤，請檢查紅線標註欄位", { type: "warning" });
      }
    });
  };

  return {
    form,
    formRef,
    submitForm
  };
}
