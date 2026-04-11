import { http } from "@/utils/http";

type Result = {
  code: number;
  message: string;
  data: Array<any>;
};

/** 地圖數據 */
export const mapJson = (params?: object) => {
  return http.request<Result>("get", "/get-map-info", { params });
};

/** 文件上傳 */
export const formUpload = data => {
  return http.request<Result>(
    "post",
    "https://pureadmin.free.beeceptor.com/images",
    { data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
