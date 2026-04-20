/** 客戶維護 (Business Entity) 列表項目 */
export interface CustomerItem {
  buzentityUId: string; // UUID
  buzentityId: string; // 統一編號
  buzentityName: string; // 客戶名稱
  buzentityAddr: string; // 客戶地址
  headerName?: string; // 負責人
  contactName: string; // 聯絡人
  contactInfo: string; // 聯絡電話
  isActive: "Y" | "N"; // 是否有效
  remark?: string; // 備註
  cTime: string; // 建立日期
  cUserName: string; // 建立人員
  mTime: string; // 更新日期
  mUserName: string; // 更新人員
}

/** 客戶維護 表單對象 */
export interface CustomerForm {
  buzentityUId?: string;
  buzentityId: string;
  buzentityName: string;
  buzentityAddr: string;
  headerName?: string;
  contactName: string;
  contactInfo: string;
  isActive: "Y" | "N";
  remark?: string;
}

/** 搜尋表單 */
export interface SearchFormProps {
  buzentityId: string;
  buzentityName: string;
  isActive: string;
}
