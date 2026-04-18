/**
 * 模擬用戶 Profile
 * wchoiceCustomer：王寵數位 客戶
 */
const wchoiceCustomer = {
  avatar: "./assets/avatar/wchoice.jpg",
  username: "customer",
  nickname: "王寵客戶",
  roles: ["wchoiceCustomer"], // 角色貼標 (暫時給予最大權限以利測試)
  permissions: ["*:*:*"],
  accessToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceCustomer",
  refreshToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceCustomerRefresh",
  expires: "2030/10/30 00:00:00"
};

export { wchoiceCustomer };
