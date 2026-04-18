/**
 * 模擬用戶 Profile
 * wchoiceSales：王寵數位 業務人員
 * wchoiceManager：王寵數位 行政管理人員
 * wchoiceAdmin： 王寵數位 系統管理人員
 */
const wchoiceSales = {
  avatar: "./assets/avatar/wchoice.jpg",
  username: "sales",
  nickname: "王寵業務",
  roles: ["wchoiceSales"], // 角色貼標 (暫時給予最大權限以利測試)
  permissions: ["*:*:*"],
  accessToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceSales",
  refreshToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceSalesRefresh",
  expires: "2030/10/30 00:00:00"
};

const wchoiceManager = {
  avatar: "./assets/avatar/wchoice.jpg",
  username: "manager",
  nickname: "王寵行政管理",
  roles: ["wchoiceSales", "wchoiceManager"], // 角色貼標
  permissions: ["*:*:*"],
  accessToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceManager",
  refreshToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceManagerRefresh",
  expires: "2030/10/30 00:00:00"
};

const wchoiceAdmin = {
  avatar: "./assets/avatar/wchoice.jpg",
  username: "sysadmin",
  nickname: "王寵系統管理",
  roles: ["wchoiceSales", "wchoiceAdmin"], // 角色貼標
  permissions: ["*:*:*"],
  accessToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceAdmin",
  refreshToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceAdminRefresh",
  expires: "2030/10/30 00:00:00"
};

export { wchoiceSales, wchoiceManager, wchoiceAdmin };
