/** 服務單維護 (Services Order) 列表項目 */
export interface ServiceOrderItem {
  /** 服務單編號 (唯一值) */
  serviceId: string;
  /** 客戶名稱 (從報價單搬移，唯讀) */
  buzentityName: string;
  /** 服務地址 (從報價單搬移，唯讀) */
  buzentityAddr: string;
  /** 聯絡人 (允許編輯) */
  contactName: string;
  /** 聯絡電話 (允許編輯) */
  contactInfo: string;
  /** 金額 (不允許編輯) */
  orderAmount: number;
  /** 服務進度 [pending_dispatch: 派工中, in_execution: 施作中, pending_completion: 待驗收] */
  orderStatus: "pending_dispatch" | "in_execution" | "pending_completion";
  /** 服務專員 */
  salesName: string;
  /** 服務專線 */
  salesContactInfo: string;
  /** 建立日期 */
  cTime: string;
  /** 建立人員 */
  cUserName: string;
  /** 更新日期 */
  mTime: string;
  /** 更新人員 */
  mUserName: string;
}

/** 服務項目介面 (從報價單邏輯移植) */
export interface ServiceItem {
  id: string;
  name: string;
  checked: boolean;
  price: number;
  count: number;
  unit: string;
  time_min: number;
  attribute: string;
  photos: Array<{
    uid: string;
    name: string;
    url: string;
    is_cover?: boolean;
  }>;
  options?: Array<{
    label: string;
    price: number;
    time_min: number;
  }>;
  selectedOptionIndex?: number;
  isExpanded?: boolean;
  notes?: string;
}

/** 服務配置區塊 */
export interface ServiceSection {
  id: string;
  title: string;
  items: ServiceItem[];
}

/** 服務區域 (Tab) */
export interface ServiceRegion {
  id: string;
  name: string;
  active: boolean;
  sections: ServiceSection[];
}

/** 服務單完整表單結構 (對齊原 QuotationForm 但更名以符合服務語境) */
export interface ServiceOrderForm {
  // 客戶資訊
  clientName: string;
  contactPerson: string;
  contactPhone: string;
  clientAddress: string;

  // 業務資訊
  salesName: string;
  salesPhone: string;
  expiryDate: string;

  // 施工資訊
  executionPriority: string;
  executionNotes: string;

  // 動態服務項目
  regions: ServiceRegion[];

  // 結算數據
  totalPrice?: number;
  totalTimeMin?: number;
  totalDoubleHours?: number;
}

/** 派工單對象 (Dispatch Record) */
export interface DispatchRecord {
  /** 派工 ID */
  dispatchId: string;
  /** 施工人員名稱 */
  workerName: string;
  /** 預計施作日期 (yyyy-MM-dd) */
  planDate: string;
  /** 施工進度 [assigned: 已指派, arrived: 已到場, completed: 已施作完成] */
  executionStatus: "assigned" | "arrived" | "completed";
  /** 施工人員回填紀錄 (Checklist / Notes) */
  workerNotes?: string;
}

/** 施工單 Check List 項 */
export interface ExecutionCheckItem {
  /** 基於報價單項目的 ID */
  itemId: string;
  /** 項目名稱 */
  itemName: string;
  /** 規格屬性 */
  attribute: string;
  /** 施作數量 */
  count: number;
  /** 單位 */
  unit: string;
  /** 完工狀態 (是否已施作) */
  isDone: boolean;
  /** 現場照片 (由施工人員上傳) */
  photos: string[];
}

/** 搜尋表單項 */
export interface SearchFormProps {
  buzentityName: string;
  serviceId: string;
  orderStatus: string;
}
