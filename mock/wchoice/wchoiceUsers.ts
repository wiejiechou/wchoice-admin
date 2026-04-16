/**
 * 模擬用戶 Profile
 * wchoiceUser：王寵數位 一般用戶角色
 * wchoiceAdm： 王寵數位 系統管理者
 */
const wchoiceUser = {
  avatar: "./assets/avatar/wchoice.jpg",
  username: "wchoice",
  nickname: "王寵一般用戶",
  roles: ["wchoiceUser", "wchoiceAdm"], // 角色貼標 (暫時給予最大權限以利測試)
  permissions: ["*:*:*"],
  accessToken: "eyJhbGciOiJIUzUxMiJ9.wchoice",
  refreshToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceRefresh",
  expires: "2030/10/30 00:00:00"
};

const wchoiceAdm = {
  avatar: "./assets/avatar/wchoice.jpg",
  username: "wchoiceAdm",
  nickname: "王寵系統管理者",
  roles: ["wchoiceUser", "wchoiceAdm"], // 角色貼標
  permissions: ["*:*:*"],
  accessToken: "eyJhbGciOiJIUzUxMiJ9.wchoice",
  refreshToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceRefresh",
  expires: "2030/10/30 00:00:00"
};

export { wchoiceUser, wchoiceAdm };
