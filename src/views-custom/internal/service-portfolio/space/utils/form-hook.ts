import { reactive, ref } from "vue";
import type { SpaceForm } from "./types";
import { message } from "@/utils/message";

export function useSpaceForm(initialData?: Partial<SpaceForm>) {
  const formRef = ref();
  const form = reactive<SpaceForm>({
    spaceId: initialData?.spaceId || "",
    spaceName: initialData?.spaceName || "",
    spaceCode: initialData?.spaceCode || "",
    status: initialData?.status ?? "Y",
    remark: initialData?.remark || ""
  });

  const submitForm = (callback: (data: SpaceForm) => void) => {
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
