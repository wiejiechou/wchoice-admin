import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker/locale/zh_TW";

export default defineFakeRoute([
  // 使用者管理
  {
    url: "/user",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          avatar: "./assets/avatar/admin.jpg",
          username: "admin",
          nickname: "系統管理員",
          phone: "0988888789",
          email: faker.internet.email(),
          sex: 0,
          id: 1,
          status: 1,
          dept: {
            // 部門 ID
            id: 103,
            // 部門名稱
            name: "研發部門"
          },
          remark: "管理員",
          createTime: 1605456000000
        },
        {
          avatar: "./assets/avatar/user.jpg",
          username: "common",
          nickname: "普通用戶",
          phone: "0928888345",
          email: faker.internet.email(),
          sex: 1,
          id: 2,
          status: 1,
          dept: {
            id: 105,
            name: "測試部門"
          },
          remark: "普通使用者",
          createTime: 1605456000000
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      if (body.phone) list = list.filter(item => item.phone === body.phone);
      if (body.deptId) list = list.filter(item => item.dept.id === body.deptId);
      return {
        code: 0,
        message: "操作成功",
        data: {
          list,
          total: list.length, // 總項目數
          pageSize: 10, // 每頁顯示數量
          currentPage: 1 // 目前頁碼
        }
      };
    }
  },
  // 使用者管理-獲取所有角色列表
  {
    url: "/list-all-role",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "操作成功",
        data: [
          { id: 1, name: "超級管理員" },
          { id: 2, name: "普通角色" }
        ]
      };
    }
  },
  // 使用者管理-根據 userId 獲取對應角色 ID 列表（userId：使用者 ID）
  {
    url: "/list-role-ids",
    method: "post",
    response: ({ body }) => {
      if (body.userId) {
        if (body.userId == 1) {
          return {
            code: 0,
            message: "操作成功",
            data: [1]
          };
        } else if (body.userId == 2) {
          return {
            code: 0,
            message: "操作成功",
            data: [2]
          };
        }
      } else {
        return {
          code: 10001,
          message: "請求參數缺失或格式不正確",
          data: []
        };
      }
    }
  },
  // 角色管理
  {
    url: "/role",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          createTime: 1605456000000, // 時間戳記（毫秒 ms）
          updateTime: 1684512000000,
          id: 1,
          name: "超級管理員",
          code: "admin",
          status: 1, // 狀態 1 啟用 0 停用
          remark: "超級管理員擁有最高權限"
        },
        {
          createTime: 1605456000000,
          updateTime: 1684512000000,
          id: 2,
          name: "普通角色",
          code: "common",
          status: 1,
          remark: "普通角色擁有部分權限"
        }
      ];
      list = list.filter(item => item.name.includes(body?.name));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      if (body.code) list = list.filter(item => item.code === body.code);
      return {
        code: 0,
        message: "操作成功",
        data: {
          list,
          total: list.length, // 總項目數
          pageSize: 10, // 每頁顯示數量
          currentPage: 1 // 目前頁碼
        }
      };
    }
  },
  // 角色管理-權限-選單權限
  {
    url: "/role-menu",
    method: "post",
    response: () => {
      return {
        code: 0,
        message: "操作成功",
        data: [
          // 外部頁面
          {
            parentId: 0,
            id: 100,
            menuType: 0, // 選單類型（0代表選單、1代表 iframe、2代表外鏈、3代表按鈕）
            title: "menus.pureExternalPage"
          },
          {
            parentId: 100,
            id: 101,
            menuType: 0,
            title: "menus.pureExternalDoc"
          },
          {
            parentId: 101,
            id: 102,
            menuType: 2,
            title: "menus.pureExternalLink"
          },
          {
            parentId: 101,
            id: 103,
            menuType: 2,
            title: "menus.pureUtilsLink"
          },
          {
            parentId: 100,
            id: 104,
            menuType: 1,
            title: "menus.pureEmbeddedDoc"
          },
          {
            parentId: 104,
            id: 105,
            menuType: 1,
            title: "menus.pureEpDoc"
          },
          {
            parentId: 104,
            id: 106,
            menuType: 1,
            title: "menus.pureTailwindcssDoc"
          },
          {
            parentId: 104,
            id: 107,
            menuType: 1,
            title: "menus.pureVueDoc"
          },
          {
            parentId: 104,
            id: 108,
            menuType: 1,
            title: "menus.pureViteDoc"
          },
          {
            parentId: 104,
            id: 109,
            menuType: 1,
            title: "menus.purePiniaDoc"
          },
          {
            parentId: 104,
            id: 110,
            menuType: 1,
            title: "menus.pureRouterDoc"
          },
          // 權限管理
          {
            parentId: 0,
            id: 200,
            menuType: 0,
            title: "menus.purePermission"
          },
          {
            parentId: 200,
            id: 201,
            menuType: 0,
            title: "menus.purePermissionPage"
          },
          {
            parentId: 200,
            id: 202,
            menuType: 0,
            title: "menus.purePermissionButton"
          },
          {
            parentId: 202,
            id: 203,
            menuType: 3,
            title: "新增"
          },
          {
            parentId: 202,
            id: 204,
            menuType: 3,
            title: "修改"
          },
          {
            parentId: 202,
            id: 205,
            menuType: 3,
            title: "刪除"
          },
          // 系統管理
          {
            parentId: 0,
            id: 300,
            menuType: 0,
            title: "menus.pureSysManagement"
          },
          {
            parentId: 300,
            id: 301,
            menuType: 0,
            title: "menus.pureUser"
          },
          {
            parentId: 300,
            id: 302,
            menuType: 0,
            title: "menus.pureRole"
          },
          {
            parentId: 300,
            id: 303,
            menuType: 0,
            title: "menus.pureSystemMenu"
          },
          {
            parentId: 300,
            id: 304,
            menuType: 0,
            title: "menus.pureDept"
          },
          // 系統監控
          {
            parentId: 0,
            id: 400,
            menuType: 0,
            title: "menus.pureSysMonitor"
          },
          {
            parentId: 400,
            id: 401,
            menuType: 0,
            title: "menus.pureOnlineUser"
          },
          {
            parentId: 400,
            id: 402,
            menuType: 0,
            title: "menus.pureLoginLog"
          },
          {
            parentId: 400,
            id: 403,
            menuType: 0,
            title: "menus.pureOperationLog"
          },
          {
            parentId: 400,
            id: 404,
            menuType: 0,
            title: "menus.pureSystemLog"
          },
          // 標籤頁操作
          {
            parentId: 0,
            id: 500,
            menuType: 0,
            title: "menus.pureTabs"
          },
          {
            parentId: 500,
            id: 501,
            menuType: 0,
            title: "menus.pureTabs"
          },
          {
            parentId: 500,
            id: 502,
            menuType: 0,
            title: "query 傳參模式"
          },
          {
            parentId: 500,
            id: 503,
            menuType: 0,
            title: "params 傳參模式"
          }
        ]
      };
    }
  },
  // 角色管理-權限-選單權限-根據角色 ID 查詢對應選單
  {
    url: "/role-menu-ids",
    method: "post",
    response: ({ body }) => {
      if (body.id == 1) {
        return {
          code: 0,
          message: "操作成功",
          data: [
            100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201,
            202, 203, 204, 205, 300, 301, 302, 303, 304, 400, 401, 402, 403,
            404, 500, 501, 502, 503
          ]
        };
      } else if (body.id == 2) {
        return {
          code: 0,
          message: "操作成功",
          data: [
            100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 404, 500,
            501, 502, 503
          ]
        };
      }
    }
  },
  // 選單管理
  {
    url: "/menu",
    method: "post",
    response: () => {
      return {
        code: 0,
        message: "操作成功",
        data: [
          // 外部頁面
          {
            parentId: 0,
            id: 100,
            menuType: 0, // 選單類型（0代表選單、1代表 iframe、2代表外鏈、3代表按鈕）
            title: "menus.pureExternalPage",
            name: "PureIframe",
            path: "/iframe",
            component: "",
            rank: 7,
            redirect: "",
            icon: "ri:links-fill",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 100,
            id: 101,
            menuType: 0,
            title: "menus.pureExternalDoc",
            name: "PureIframeExternal",
            path: "/iframe/external",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 101,
            id: 102,
            menuType: 2,
            title: "menus.pureExternalLink",
            name: "https://pure-admin.cn/",
            path: "/external",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 101,
            id: 103,
            menuType: 2,
            title: "menus.pureUtilsLink",
            name: "https://pure-admin-utils.netlify.app/",
            path: "/pureUtilsLink",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 100,
            id: 104,
            menuType: 1,
            title: "menus.pureEmbeddedDoc",
            name: "PureIframeEmbedded",
            path: "/iframe/embedded",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 105,
            menuType: 1,
            title: "menus.pureEpDoc",
            name: "FrameEp",
            path: "/iframe/ep",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://element-plus.org/zh-CN/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 106,
            menuType: 1,
            title: "menus.pureTailwindcssDoc",
            name: "FrameTailwindcss",
            path: "/iframe/tailwindcss",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://tailwindcss.com/docs/installation",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 107,
            menuType: 1,
            title: "menus.pureVueDoc",
            name: "FrameVue",
            path: "/iframe/vue3",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://cn.vuejs.org/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 108,
            menuType: 1,
            title: "menus.pureViteDoc",
            name: "FrameVite",
            path: "/iframe/vite",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://cn.vitejs.dev/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 109,
            menuType: 1,
            title: "menus.purePiniaDoc",
            name: "FramePinia",
            path: "/iframe/pinia",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://pinia.vuejs.org/zh/index.html",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 104,
            id: 110,
            menuType: 1,
            title: "menus.pureRouterDoc",
            name: "FrameRouter",
            path: "/iframe/vue-router",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "https://router.vuejs.org/zh/",
            frameLoading: true,
            keepAlive: true,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          // 權限管理
          {
            parentId: 0,
            id: 200,
            menuType: 0,
            title: "menus.purePermission",
            name: "PurePermission",
            path: "/permission",
            component: "",
            rank: 9,
            redirect: "",
            icon: "ep:lollipop",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 200,
            id: 201,
            menuType: 0,
            title: "menus.purePermissionPage",
            name: "PermissionPage",
            path: "/permission/page/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 200,
            id: 202,
            menuType: 0,
            title: "menus.purePermissionButton",
            name: "PermissionButton",
            path: "/permission/button",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 202,
            id: 203,
            menuType: 0,
            title: "menus.purePermissionButtonRouter",
            name: "PermissionButtonRouter",
            path: "/permission/button/router",
            component: "permission/button/index",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 203,
            id: 210,
            menuType: 3,
            title: "新增",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:add",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 203,
            id: 211,
            menuType: 3,
            title: "修改",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:edit",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 203,
            id: 212,
            menuType: 3,
            title: "刪除",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:delete",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 202,
            id: 204,
            menuType: 0,
            title: "menus.purePermissionButtonLogin",
            name: "PermissionButtonLogin",
            path: "/permission/button/login",
            component: "permission/button/perms",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 204,
            id: 220,
            menuType: 3,
            title: "新增",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:add",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 204,
            id: 221,
            menuType: 3,
            title: "修改",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:edit",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 204,
            id: 222,
            menuType: 3,
            title: "刪除",
            name: "",
            path: "",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "permission:btn:delete",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          // 系統管理
          {
            parentId: 0,
            id: 300,
            menuType: 0,
            title: "menus.pureSysManagement",
            name: "PureSystem",
            path: "/system",
            component: "",
            rank: 10,
            redirect: "",
            icon: "ri:settings-3-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 301,
            menuType: 0,
            title: "menus.pureUser",
            name: "SystemUser",
            path: "/system/user/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ri:admin-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 302,
            menuType: 0,
            title: "menus.pureRole",
            name: "SystemRole",
            path: "/system/role/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ri:admin-fill",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 303,
            menuType: 0,
            title: "menus.pureSystemMenu",
            name: "SystemMenu",
            path: "/system/menu/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ep:menu",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 300,
            id: 304,
            menuType: 0,
            title: "menus.pureDept",
            name: "SystemDept",
            path: "/system/dept/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "ri:git-branch-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          // 系統監控
          {
            parentId: 0,
            id: 400,
            menuType: 0,
            title: "menus.pureSysMonitor",
            name: "PureMonitor",
            path: "/monitor",
            component: "",
            rank: 11,
            redirect: "",
            icon: "ep:monitor",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 401,
            menuType: 0,
            title: "menus.pureOnlineUser",
            name: "OnlineUser",
            path: "/monitor/online-user",
            component: "monitor/online/index",
            rank: null,
            redirect: "",
            icon: "ri:user-voice-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 402,
            menuType: 0,
            title: "menus.pureLoginLog",
            name: "LoginLog",
            path: "/monitor/login-logs",
            component: "monitor/logs/login/index",
            rank: null,
            redirect: "",
            icon: "ri:window-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 403,
            menuType: 0,
            title: "menus.pureOperationLog",
            name: "OperationLog",
            path: "/monitor/operation-logs",
            component: "monitor/logs/operation/index",
            rank: null,
            redirect: "",
            icon: "ri:history-fill",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 400,
            id: 404,
            menuType: 0,
            title: "menus.pureSystemLog",
            name: "SystemLog",
            path: "/monitor/system-logs",
            component: "monitor/logs/system/index",
            rank: null,
            redirect: "",
            icon: "ri:file-search-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          // 標籤頁操作
          {
            parentId: 0,
            id: 500,
            menuType: 0,
            title: "menus.pureTabs",
            name: "PureTabs",
            path: "/tabs",
            component: "",
            rank: 12,
            redirect: "",
            icon: "ri:bookmark-2-line",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 500,
            id: 501,
            menuType: 0,
            title: "menus.pureTabs",
            name: "Tabs",
            path: "/tabs/index",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          },
          {
            parentId: 500,
            id: 502,
            menuType: 0,
            title: "query 傳參模式",
            name: "TabQueryDetail",
            path: "/tabs/query-detail",
            component: "",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "/tabs/index",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: false,
            showParent: false
          },
          {
            parentId: 500,
            id: 503,
            menuType: 0,
            title: "params 傳參模式",
            name: "TabParamsDetail",
            path: "/tabs/params-detail/:id",
            component: "params-detail",
            rank: null,
            redirect: "",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "/tabs/index",
            auths: "",
            frameSrc: "",
            frameLoading: true,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: false,
            showParent: false
          }
        ]
      };
    }
  },
  // 部門管理
  {
    url: "/dept",
    method: "post",
    response: () => {
      return {
        code: 0,
        message: "操作成功",
        data: [
          {
            name: "杭州總公司",
            parentId: 0,
            id: 100,
            sort: 0,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1, // 狀態 1 啟用 0 停用
            type: 1, // 1 公司 2 分公司 3 部門
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "鄭州分公司",
            parentId: 100,
            id: 101,
            sort: 1,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 2,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "研發部門",
            parentId: 101,
            id: 103,
            sort: 1,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "市場部門",
            parentId: 102,
            id: 108,
            sort: 1,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "深圳分公司",
            parentId: 100,
            id: 102,
            sort: 2,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 2,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "市場部門",
            parentId: 101,
            id: 104,
            sort: 2,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "財務部門",
            parentId: 102,
            id: 109,
            sort: 2,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "測試部門",
            parentId: 101,
            id: 105,
            sort: 3,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 0,
            type: 3,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "財務部門",
            parentId: 101,
            id: 106,
            sort: 4,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          },
          {
            name: "維運部門",
            parentId: 101,
            id: 107,
            sort: 5,
            phone: "0988888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 0,
            type: 3,
            createTime: 1605456000000,
            remark: "這裡是備註資訊這裡是備註資訊這裡是備註資訊這裡是備註資訊"
          }
        ]
      };
    }
  },
  // 線上使用者
  {
    url: "/online-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: "admin",
          ip: faker.internet.ipv4(),
          address: "中國河南省信陽市",
          system: "macOS",
          browser: "Chrome",
          loginTime: new Date()
        },
        {
          id: 2,
          username: "common",
          ip: faker.internet.ipv4(),
          address: "中國廣東省深圳市",
          system: "Windows",
          browser: "Firefox",
          loginTime: new Date()
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      return {
        code: 0,
        message: "操作成功",
        data: {
          list,
          total: list.length, // 總項目數
          pageSize: 10, // 每頁顯示數量
          currentPage: 1 // 目前頁碼
        }
      };
    }
  },
  // 登入日誌
  {
    url: "/login-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: "admin",
          ip: faker.internet.ipv4(),
          address: "中國河南省信陽市",
          system: "macOS",
          browser: "Chrome",
          status: 1, // 登入狀態 1 成功 0 失敗
          behavior: "帳號登入",
          loginTime: new Date()
        },
        {
          id: 2,
          username: "common",
          ip: faker.internet.ipv4(),
          address: "中國廣東省深圳市",
          system: "Windows",
          browser: "Firefox",
          status: 0,
          behavior: "第三方登入",
          loginTime: new Date()
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      return {
        code: 0,
        message: "操作成功",
        data: {
          list,
          total: list.length, // 總項目數
          pageSize: 10, // 每頁顯示數量
          currentPage: 1 // 目前頁碼
        }
      };
    }
  },
  // 操作日誌
  {
    url: "/operation-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: "admin",
          ip: faker.internet.ipv4(),
          address: "中國河南省信陽市",
          system: "macOS",
          browser: "Chrome",
          status: 1, // 操作狀態 1 成功 0 失敗
          summary: "選單管理-新增選單", // 操作概要
          module: "系統管理", // 所屬模組
          operatingTime: new Date() // 操作時間
        },
        {
          id: 2,
          username: "common",
          ip: faker.internet.ipv4(),
          address: "中國廣東省深圳市",
          system: "Windows",
          browser: "Firefox",
          status: 0,
          summary: "列表分頁查詢",
          module: "線上使用者",
          operatingTime: new Date()
        }
      ];
      list = list.filter(item => item.module.includes(body?.module));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      return {
        code: 0,
        message: "操作成功",
        data: {
          list,
          total: list.length, // 總項目數
          pageSize: 10, // 每頁顯示數量
          currentPage: 1 // 目前頁碼
        }
      };
    }
  },
  // 系統日誌
  {
    url: "/system-logs",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          id: 1, // 日誌 ID
          /**
           * 日誌層級
           * 0 debug 調試（最低層級的日誌，用於調試和開發階段）
           * 1 info 信息（預設層級，用於記錄一般的信息）
           * 2 warn 警告（表示可能出現的問題或潛在的錯誤，但不會影響系統的正常運作）
           * 3 error 錯誤（表示發生了錯誤，但不會導致系統崩潰）
           * 4 fatal 致命（最高層級的日誌，表示發生了嚴重錯誤，導致系統無法繼續執行）
           */
          level: 1,
          module: "選單管理", // 所屬模組
          url: "/menu", // 請求介面
          method: "post", // 請求方法
          ip: faker.internet.ipv4(),
          address: "中國河南省信陽市",
          system: "macOS",
          browser: "Chrome",
          /**
           * 請求耗時（單位：ms 毫秒）
           * 正常耗時：一般認為在幾百毫秒（0.1-0.5秒）範圍內的請求耗時較為正常
           * 較慢耗時：在 1 秒以上的耗時可以被認為是較慢的請求，但具體是否較慢還需要根據具體業務場景和效能要求來判斷
           */
          takesTime: 10,
          requestTime: new Date() // 請求時間
        },
        {
          id: 2,
          level: 0,
          module: "地圖",
          url: "/get-map-info",
          method: "get",
          ip: faker.internet.ipv4(),
          address: "中國廣東省深圳市",
          system: "Windows",
          browser: "Firefox",
          takesTime: 1200,
          requestTime: new Date()
        }
      ];
      list = list.filter(item => item.module.includes(body?.module));
      return {
        code: 0,
        message: "操作成功",
        data: {
          list,
          total: list.length, // 總項目數
          pageSize: 10, // 每頁顯示數量
          currentPage: 1 // 目前頁碼
        }
      };
    }
  },
  // 系統日誌-根據 ID 查詢日誌詳情
  {
    url: "/system-logs-detail",
    method: "post",
    response: ({ body }) => {
      if (body.id == 1) {
        return {
          id: 1,
          level: 1,
          module: "選單管理",
          url: "/menu",
          method: "post",
          ip: faker.internet.ipv4(),
          address: "中國河南省信陽市",
          system: "macOS",
          browser: "Chrome",
          takesTime: 10,
          responseHeaders: {
            traceId: "1495502411171032",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=5",
            "Content-Length": 17019
          },
          responseBody: {
            code: 0,
            message: "操作成功",
            data: [
              {
                parentId: 0,
                id: 400,
                menuType: 0,
                title: "menus.pureSysMonitor",
                name: "PureMonitor",
                path: "/monitor",
                component: "",
                rank: 11,
                redirect: "",
                icon: "ep:monitor",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                fixedTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 401,
                menuType: 0,
                title: "menus.pureOnlineUser",
                name: "OnlineUser",
                path: "/monitor/online-user",
                component: "monitor/online/index",
                rank: null,
                redirect: "",
                icon: "ri:user-voice-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                fixedTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 402,
                menuType: 0,
                title: "menus.pureLoginLog",
                name: "LoginLog",
                path: "/monitor/login-logs",
                component: "monitor/logs/login/index",
                rank: null,
                redirect: "",
                icon: "ri:window-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                fixedTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 403,
                menuType: 0,
                title: "menus.pureOperationLog",
                name: "OperationLog",
                path: "/monitor/operation-logs",
                component: "monitor/logs/operation/index",
                rank: null,
                redirect: "",
                icon: "ri:history-fill",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                fixedTag: false,
                showLink: true,
                showParent: false
              },
              {
                parentId: 400,
                id: 404,
                menuType: 0,
                title: "menus.pureSystemLog",
                name: "SystemLog",
                path: "/monitor/system-logs",
                component: "monitor/logs/system/index",
                rank: null,
                redirect: "",
                icon: "ri:file-search-line",
                extraIcon: "",
                enterTransition: "",
                leaveTransition: "",
                activePath: "",
                auths: "",
                frameSrc: "",
                frameLoading: true,
                keepAlive: false,
                hiddenTag: false,
                fixedTag: false,
                showLink: true,
                showParent: false
              }
            ]
          },
          requestHeaders: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7",
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.admin",
            Connection: "keep-alive",
            "Content-Length": 0,
            Cookie:
              "_ga=GA1.1.231800979.1704562367; _ga_M74ZHEQ1M1=GS1.1.1709299375.7.1.1709299476.0.0.0; Hm_lvt_6a7dac00248d3b6ad8479d7249bb29c5=1709032753,1709359575; Hm_lvt_23a157b7d0d9867f7a51e42628f052f5=1708960489,1709485849,1709879672; authorized-token={%22accessToken%22:%22eyJhbGciOiJIUzUxMiJ9.admin%22%2C%22expires%22:1919520000000}; multiple-tabs=true",
            Host: "192.168.2.121:8848",
            Origin: "http://192.168.2.121:8848",
            Referer: "http://192.168.2.121:8848/",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
          },
          requestBody: {
            title: "系統監控"
          },
          traceId: "1495502411171032",
          requestTime: new Date()
        };
      } else if (body.id == 2) {
        return {
          id: 2,
          level: 0,
          module: "地圖",
          url: "/get-map-info?plateNumber=豫A59778U",
          method: "get",
          ip: faker.internet.ipv4(),
          address: "中國廣東省深圳市",
          system: "Windows",
          browser: "Firefox",
          takesTime: 1200,
          responseHeaders: {
            traceId: "2280443117103208",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=5",
            "Content-Length": 28693
          },
          responseBody: {
            plateNumber: "豫A59778U",
            driver: "子騫",
            orientation: 289,
            lng: 113.8564,
            lat: 34.373
          },
          requestHeaders: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7",
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.admin",
            Connection: "keep-alive",
            "Content-Length": 0,
            Cookie:
              "_ga=GA1.1.231800979.1704562367; _ga_M74ZHEQ1M1=GS1.1.1709299375.7.1.1709299476.0.0.0; Hm_lvt_6a7dac00248d3b6ad8479d7249bb29c5=1709032753,1709359575; Hm_lvt_23a157b7d0d9867f7a51e42628f052f5=1708960489,1709485849,1709879672; authorized-token={%22accessToken%22:%22eyJhbGciOiJIUzUxMiJ9.admin%22%2C%22expires%22:1919520000000}; multiple-tabs=true",
            Host: "192.168.2.121:8848",
            Origin: "http://192.168.2.121:8848",
            Referer: "http://192.168.2.121:8848/",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
          },
          requestBody: null,
          traceId: "2280443117103208",
          requestTime: new Date()
        };
      }
    }
  }
]);
