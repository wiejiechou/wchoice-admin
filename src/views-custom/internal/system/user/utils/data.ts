/** 模擬使用者測試數據 (僅保留 wchoiceUsers.ts 定義之用戶) */
export const USER_DATA = [
  {
    id: 1,
    username: "wchoiceAdm",
    nickname: "王寵系統管理者",
    sex: "1",
    phone: "0912345678",
    deptId: "1",
    deptName: "總經理室",
    status: 1,
    remark: "系統管理權限",
    createTime: "2024-01-01 10:00:00"
  },
  {
    id: 2,
    username: "wchoice",
    nickname: "王寵一般用戶",
    sex: "0",
    phone: "0988000111",
    deptId: "2",
    deptName: "研發部",
    status: 1,
    remark: "一般查詢權限",
    createTime: "2024-02-15 14:30:00"
  }
];

export const DEPT_OPTIONS = [
  { label: "總經理室", value: "1" },
  { label: "研發部", value: "2" },
  { label: "運營部", value: "3" },
  { label: "財務部", value: "4" }
];
