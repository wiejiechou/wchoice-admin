import { reactive, ref } from "vue";
import type { ServiceForm } from "./types";
import { message } from "@/utils/message";

const COND_LABELS = ["①", "②", "③", "④", "⑤"];

export function useServiceItemForm(initialData?: Partial<ServiceForm>) {
  const formRef = ref();
  const form = reactive<ServiceForm>({
    id: initialData?.id || "",
    name: initialData?.name || "",
    unit: initialData?.unit || "",
    desc: initialData?.desc || "",
    conditions: initialData?.conditions?.length
      ? JSON.parse(JSON.stringify(initialData.conditions))
      : [{ label: "①", name: "標準", price: 0, time: 0 }]
  });

  /** 新增條件項 (上限 5) */
  const addCondition = () => {
    if (form.conditions.length >= 5) {
      message("最多支援 5 筆條件細項", { type: "warning" });
      return;
    }
    const nextIdx = form.conditions.length;
    form.conditions.push({
      label: COND_LABELS[nextIdx],
      name: "",
      price: 0,
      time: 0
    });
  };

  /** 移除條件項 (保底 1) */
  const removeCondition = (index: number) => {
    if (form.conditions.length <= 1) {
      message("至少需保留 1 筆條件細項", { type: "warning" });
      return;
    }
    form.conditions.splice(index, 1);
    // 重新排序 Label
    form.conditions.forEach((item, idx) => {
      item.label = COND_LABELS[idx];
    });
  };

  const submitForm = (callback: (data: ServiceForm) => void) => {
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
    addCondition,
    removeCondition,
    submitForm
  };
}
