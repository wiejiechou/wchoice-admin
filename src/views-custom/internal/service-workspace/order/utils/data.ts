import type { ServiceOrderItem } from "./types";

/** 服務單 Mock 數據 (模擬繼承自報價單的結果) */
export const SERVICE_ORDER_DATA: ServiceOrderItem[] = [
  {
    serviceId: "S-20260420-001",
    buzentityName: "喵喵屋連鎖旗艦店",
    buzentityAddr: "新北市板橋區縣民大道二段 7 號",
    contactName: "李思思",
    contactInfo: "02-8765-4321",
    orderAmount: 12000,
    orderStatus: "pending_dispatch", // 派工中
    salesName: "王小明",
    salesContactInfo: "0912-345-678",
    cTime: "2026-04-18 10:00:00",
    cUserName: "Admin",
    mTime: "2026-04-20 14:30:00",
    mUserName: "Admin"
  },
  {
    serviceId: "S-20260420-002",
    buzentityName: "寵物森林營運總部",
    buzentityAddr: "台北市內湖區瑞光路 500 號",
    contactName: "林林森",
    contactInfo: "02-2345-6789",
    orderAmount: 8500,
    orderStatus: "in_execution", // 施作中
    salesName: "李專員",
    salesContactInfo: "0922-000-111",
    cTime: "2026-04-15 09:00:00",
    cUserName: "Admin",
    mTime: "2026-04-19 11:00:00",
    mUserName: "vjchou"
  }
];
