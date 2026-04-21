/** 施作條件細項 */
export interface ServiceCondition {
  label: string; // ① ~ ⑤
  name: string; // 條件名稱
  price: number; // 單價
  time: number; // 時間 (min)
}

/** 服務項目列表項目 */
export interface ServiceItem {
  id: string; // UUID/ID
  name: string; // 項目名稱
  unit: string; // 計量單位
  defaultPrice: number; // 預設單價 (基準)
  defaultTime: number; // 預設時間 (基準)
  desc?: string; // 說明 (施作流程)
  note?: string; // 備註
  conditions: ServiceCondition[]; // 施作條件細項
  mTime: string; // 更新日期
  mUserName: string; // 更新人員
}

/** 服務項目表單對象 */
export interface ServiceForm {
  id?: string;
  name: string;
  unit: string;
  conditions: ServiceCondition[];
  desc?: string;
}

/** 搜尋表單 */
export interface SearchFormProps {
  name: string;
}
