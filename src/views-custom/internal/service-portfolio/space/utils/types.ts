/** 作業區域清單項目 */
export interface SpaceItem {
  spaceId: string;
  spaceName: string;
  spaceCode: string;
  status: "Y" | "N";
  itemCount: number;
  remark?: string;
  cTime: string;
  cUserName: string;
  mTime: string;
  mUserName: string;
}

/** 作業區域表單對象 */
export interface SpaceForm {
  spaceId?: string;
  spaceName: string;
  spaceCode: string;
  status: "Y" | "N";
  remark?: string;
}

/** 搜尋表單 */
export interface SearchFormProps {
  spaceName: string;
  status: string;
}
