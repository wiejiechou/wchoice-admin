// 根據角色動態產生路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { wchoiceCustomer } from "./wchoice/external/mockUsers";
import {
  wchoiceSales,
  wchoiceManager,
  wchoiceAdmin
} from "./wchoice/internal/mockUsers";

// 彙整所有王寵專案相關的模擬用戶
const allWchoiceUsers = [
  wchoiceCustomer,
  wchoiceSales,
  wchoiceManager,
  wchoiceAdmin
];

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      const { username } = body;

      // 1. 優先判斷超管與通用角色 (框架預設)
      if (username === "admin") {
        return {
          code: 0,
          message: "操作成功",
          data: {
            avatar: "./assets/avatar/admin.jpg",
            username: "admin",
            nickname: "系統管理員",
            roles: ["admin"],
            permissions: ["*:*:*"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: "2030/10/30 00:00:00"
          }
        };
      }

      // 2. 靈活查找 WChoice 業務角色 (v0.5 混合生態)
      const targetUser = allWchoiceUsers.find(
        user => user.username === username
      );
      if (targetUser) {
        return {
          code: 0,
          message: "操作成功",
          data: targetUser
        };
      }

      // 3. Fallback: 預設普通用戶
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
]);
