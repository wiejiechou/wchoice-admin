// 根據角色動態產生路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return {
          code: 0,
          message: "操作成功",
          data: {
            avatar: "./assets/avatar/admin.jpg",
            username: "admin",
            nickname: "系統管理員",
            // 一個使用者可能有多個角色
            roles: ["admin"],
            // 按鈕等級權限
            permissions: ["*:*:*"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: "2030/10/30 00:00:00"
          }
        };
      } else if (body.username === "wchoice") {
        return {
          code: 0,
          message: "操作成功",
          data: {
            avatar: "./assets/avatar/wchoice.jpg",
            username: "wchoice",
            nickname: "王寵系統用戶",
            roles: ["wchoice"], // 新角色
            permissions: ["*:*:*"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.wchoice",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.wchoiceRefresh",
            expires: "2030/10/30 00:00:00"
          }
        };
      } else {
        return {
          code: 0,
          message: "操作成功",
          data: {
            avatar: "./assets/avatar/user.jpg",
            username: "common",
            nickname: "普通用戶",
            roles: ["common"],
            permissions: ["permission:btn:add", "permission:btn:edit"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
            expires: "2030/10/30 00:00:00"
          }
        };
      }
    }
  }
]);
