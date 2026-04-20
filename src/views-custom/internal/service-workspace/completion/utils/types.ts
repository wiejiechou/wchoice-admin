import type { ServiceOrderItem } from "../../order/utils/types";

/** 結案單維護 (Case Closure) */
export interface CompletionItem extends ServiceOrderItem {
  /** 結案狀態 [pending_review: 待審核, completed: 已結案] */
  completionStatus: "pending_review" | "completed";
  /** 客戶滿意度 (1-5) */
  satisfactionRate?: number;
  /** 客戶意見回饋 */
  clientFeedback?: string;
  /** 發票號碼 */
  invoiceNo?: string;
  /** 尾款結算金額 */
  finalBalance: number;
  /** 結案日期 */
  completionDate?: string;
}

/** 搜尋表單 */
export interface SearchFormProps {
  buzentityName: string;
  serviceId: string;
  completionStatus: string;
}
