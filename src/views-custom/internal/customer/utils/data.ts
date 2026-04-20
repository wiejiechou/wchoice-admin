import type { CustomerItem } from "./types";

export const CUSTOMER_DATA: CustomerItem[] = [
  {
    buzentityUId: "uuid-001",
    buzentityId: "54321098",
    buzentityName: "寵物森林營運總部",
    buzentityAddr: "台北市內湖區瑞光路 500 號",
    headerName: "林林森",
    contactName: "王小明",
    contactInfo: "02-2345-6789 / 0912-345-678",
    isActive: "Y",
    remark: "連鎖總部項目，需配合採購流程",
    cTime: "2026-04-01 10:00:00",
    cUserName: "Admin",
    mTime: "2026-04-15 14:30:00",
    mUserName: "Admin"
  },
  {
    buzentityUId: "uuid-002",
    buzentityId: "12345678",
    buzentityName: "喵喵屋連鎖旗艦店",
    buzentityAddr: "新北市板橋區縣民大道二段 7 號",
    headerName: "陳大喵",
    contactName: "李思思",
    contactInfo: "02-8765-4321",
    isActive: "Y",
    remark: "固定每季進行全面深層清消",
    cTime: "2026-04-05 09:20:00",
    cUserName: "Admin",
    mTime: "2026-04-10 11:15:00",
    mUserName: "vjchou"
  },
  {
    buzentityUId: "uuid-003",
    buzentityId: "13572468",
    buzentityName: "汪汪美容院 (停業中)",
    buzentityAddr: "桃園市中壢區中正路 100 號",
    headerName: "張阿汪",
    contactName: "汪汪主",
    contactInfo: "0988-777-666",
    isActive: "N",
    remark: "目前內部整修，暫停服務",
    cTime: "2025-12-01 16:45:00",
    cUserName: "System",
    mTime: "2026-01-20 18:00:00",
    mUserName: "vjchou"
  }
];

/** 根據統編查詢詳情 */
export function getCustomerDetail(id: string) {
  return CUSTOMER_DATA.find(item => item.buzentityId === id);
}
