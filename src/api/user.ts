import { http } from "@/utils/http";

export type UserResult = {
  code: number;
  message: string;
  data: {
    /** 頭像 */
    avatar: string;
    /** 使用者名稱 */
    username: string;
    /** 暱稱 */
    nickname: string;
    /** 目前登入使用者的角色 */
    roles: Array<string>;
    /** 按鈕等級權限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用於呼叫刷新`accessToken`的介面時所需的`token` */
    refreshToken: string;
    /** `accessToken`的過期時間（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  code: number;
  message: string;
  data: {
    /** `token` */
    accessToken: string;
    /** 用於呼叫刷新`accessToken`的介面時所需的`token` */
    refreshToken: string;
    /** `accessToken`的過期時間（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type UserInfo = {
  /** 頭像 */
  avatar: string;
  /** 使用者名稱 */
  username: string;
  /** 暱稱 */
  nickname: string;
  /** 信箱 */
  email: string;
  /** 聯絡電話 */
  phone: string;
  /** 簡介 */
  description: string;
};

export type UserInfoResult = {
  code: number;
  message: string;
  data: UserInfo;
};

type ResultTable = {
  code: number;
  message: string;
  data?: {
    /** 清單資料 */
    list: Array<any>;
    /** 總條目數 */
    total?: number;
    /** 每頁顯示條目個數 */
    pageSize?: number;
    /** 目前頁數 */
    currentPage?: number;
  };
};

/** 登入 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/login", { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

/** 帳戶設定-個人資訊 */
export const getMine = (data?: object) => {
  return http.request<UserInfoResult>("get", "/mine", { data });
};

/** 帳戶設定-個人安全日誌 */
export const getMineLogs = (data?: object) => {
  return http.request<ResultTable>("get", "/mine-logs", { data });
};
