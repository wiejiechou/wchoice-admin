/** 服務項目介面 */
export interface ServiceItem {
  id: string;
  name: string;
  checked: boolean;
  price: number; // 當前單價 (基於選項)
  count: number;
  unit: string;
  time_min: number; // 當前工時 (基於選項)
  attribute: string;
  photos: Array<{
    uid: string;
    name: string;
    url: string;
    is_cover?: boolean;
  }>;
  // 新增：複合選項
  options?: Array<{
    label: string;
    price: number;
    time_min: number;
  }>;
  selectedOptionIndex?: number; // 當前選中的選項索引
  isExpanded?: boolean; // 是否展開細節
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

/** 報價單完整資料結構 */
export interface QuotationForm {
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

/** 搜尋表單項 */
export interface SearchFormProps {
  /** 客戶名稱 */
  client: string;
  /** 報價狀態 */
  status: string;
  /** 服務地址 */
  address: string;
}

/** 報價單列表項 (Summary) */
export interface QuotationItem {
  id: string;
  client: string;
  phone: string;
  address: string;
  price: number;
  agent: string;
  status: string;
  date: string;
}
