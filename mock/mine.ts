import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker/locale/zh_TW";

export default defineFakeRoute([
  // 帳戶設定-個人資訊
  {
    url: "/mine",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          avatar: "/assets/avatar/admin.jpg",
          username: "admin",
          nickname: "系統管理員",
          email: "pureadmin@wang-choice.com",
          phone: "0988888789",
          description: "一個熱愛開源的前端工程師"
        }
      };
    }
  },
  // 帳戶設定-個人安全日誌
  {
    url: "/mine-logs",
    method: "get",
    response: () => {
      const list = [
        {
          id: 1,
          ip: faker.internet.ipv4(),
          address: "台灣台北市",
          system: "macOS",
          browser: "Chrome",
          summary: "帳號登入", // 詳情
          operatingTime: new Date() // 時間
        },
        {
          id: 2,
          ip: faker.internet.ipv4(),
          address: "台灣台南縣",
          system: "Windows",
          browser: "Firefox",
          summary: "綁定了手機號碼",
          operatingTime: new Date().setDate(new Date().getDate() - 1)
        }
      ];
      return {
        code: 0,
        message: "操作成功",
        data: {
          list,
          total: list.length, // 總條目數
          pageSize: 10, // 每頁顯示條目個數
          currentPage: 1 // 當前頁數
        }
      };
    }
  }
]);
