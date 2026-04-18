/** 模擬角色測試數據 */
export const ROLE_DATA = [
  {
    id: 1,
    name: "超級管理員",
    code: "super_admin",
    status: 1,
    remark: "擁有系統所有操作權限",
    createTime: "2024-01-01 10:00:00"
  },
  {
    id: 2,
    name: "一般用戶",
    code: "common_user",
    status: 1,
    remark: "僅擁有基礎檢視與操作權限",
    createTime: "2024-01-05 15:20:00"
  },
  {
    id: 3,
    name: "審核員",
    code: "auditor",
    status: 0,
    remark: "負責單據審核流程",
    createTime: "2024-02-10 11:45:00"
  }
];
