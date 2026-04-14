import type { QuotationItem } from "./types";

/** 報價單 Mock 資料 (由 Prototype 轉化) */
export const QUOTATION_DATA: QuotationItem[] = [
  {
    id: "Q-20260407-001",
    client: "吹毛球痴",
    phone: "02-2732-xxxx",
    address: "台北市大安區基隆路二段",
    price: 8500,
    agent: "王小明",
    status: "pending",
    date: "2026-04-07"
  },
  {
    id: "Q-20260405-002",
    client: "毛小孩天堂",
    phone: "02-2964-xxxx",
    address: "新北市板橋區文化路一段",
    price: 12000,
    agent: "李專員",
    status: "approved",
    date: "2026-04-05"
  },
  {
    id: "Q-20260401-003",
    client: "汪汪美容",
    phone: "03-333-xxxx",
    address: "桃園市桃園區中正路",
    price: 6200,
    agent: "陳經理",
    status: "rejected",
    date: "2026-04-01"
  },
  {
    id: "Q-20260406-004",
    client: "喵星人Spa",
    phone: "04-2252-xxxx",
    address: "台中市西屯區台灣大道三段",
    price: 15800,
    agent: "張特助",
    status: "pending",
    date: "2026-04-06"
  }
];

/** 模擬從資料庫讀取完整的報價單詳情 */
export function getQuotationDetail(id: string) {
  const item = QUOTATION_DATA.find(q => q.id === id);
  if (!item) return null;

  // 模擬回填大項數據，其餘保持 Mock 預設值（或是針對不同 ID 模擬不同內容）
  return {
    clientName: item.client,
    contactPerson: "王大明",
    contactPhone: item.phone,
    clientAddress: item.address,
    salesName: item.agent,
    salesPhone: "0912-345-678",
    expiryDate: "2026-05-01",
    executionPriority: "美容區 > 會客區",
    executionNotes: "請注意櫃體轉角防護",
    // regions 會在 hook 中交由 useQuotationForm 處理（若沒傳入則使用 MOCK_REGIONS）
    // 這裡我們可以模擬特定項目的勾選
    regions: undefined
  };
}
