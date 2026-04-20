import type { CompletionItem } from "./types";
import { SERVICE_ORDER_DATA } from "../../order/utils/data";

/** 結案單 Mock 數據 (繼承自服務單並擴充結案資訊) */
export const COMPLETION_DATA: CompletionItem[] = [
  {
    ...SERVICE_ORDER_DATA[1],
    completionStatus: "pending_review",
    finalBalance: 8500
  },
  {
    ...SERVICE_ORDER_DATA[0],
    serviceId: "S-20260315-999",
    buzentityName: "喵喵屋連鎖旗艦店 (歷史單)",
    completionStatus: "completed",
    satisfactionRate: 5,
    clientFeedback: "非常專業，準時完成。",
    invoiceNo: "GV-12345678",
    finalBalance: 0,
    completionDate: "2026-03-20"
  }
];
