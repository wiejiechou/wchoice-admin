/**
 * roles：頁面等級權限
 * wchoiceUser：王寵數位 一般用戶角色
 * wchoiceAdm： 王寵數位 系統管理者
 */
import { system } from "@/router/enums";

// L1. 報價項目管理 (ItemPortfolio)
const wchoiceItemRouter = {
  path: "/item-portfolio",
  meta: {
    title: "報價項目管理",
    icon: "ri:list-settings-line",
    rank: 0.1
  },
  children: [
    {
      name: "SpaceMaintenance",
      path: "/item-portfolio/space/list",
      component: "item-portfolio/space/list",
      meta: {
        icon: "ri:layout-left-line",
        title: "作業區域維護",
        roles: ["wchoiceUser"]
      }
    },
    {
      name: "ServiceItemMaintenance",
      path: "/item-portfolio/service-item/list",
      component: "item-portfolio/service-item/list",
      meta: {
        icon: "ri:tools-line",
        title: "服務項目維護",
        roles: ["wchoiceUser"]
      }
    }
  ]
};

// L1. 報價管理 (QuotationManagement)
const wchoiceQuotationRouter = {
  path: "/quotation",
  meta: {
    title: "報價管理",
    icon: "ri:list-unordered",
    rank: 0.2
  },
  children: [
    {
      name: "QuotationMaintenance",
      path: "/quotation/list",
      component: "quotation/list",
      meta: {
        icon: "ri:file-list-3-line",
        title: "報價清單維護",
        roles: ["wchoiceUser"]
      }
    },
    {
      name: "QuotationModify",
      path: "/quotation/modify",
      component: "quotation/modify",
      meta: {
        showLink: false,
        title: "編輯報價單"
      }
    },
    {
      name: "QuotationTrace",
      path: "/quotation/trace",
      component: "quotation/trace",
      meta: {
        showLink: false,
        title: "報價進度追蹤"
      }
    }
  ]
};

// L1. 服務管理 (ServiceWorkspace)
const wchoiceServiceRouter = {
  path: "/service-workspace",
  meta: {
    title: "服務管理",
    icon: "ri:briefcase-line",
    rank: 0.3
  },
  children: [
    {
      name: "ServiceOrderMaintenance",
      path: "/service-workspace/order/list",
      component: "service-workspace/order/list",
      meta: {
        icon: "ri:order-play-line",
        title: "服務單維護",
        roles: ["wchoiceUser"]
      }
    },
    {
      name: "DispatchMaintenance",
      path: "/service-workspace/dispatch/list",
      component: "service-workspace/dispatch/list",
      meta: {
        icon: "ri:user-shared-line",
        title: "派工單維護",
        roles: ["wchoiceUser"]
      }
    },
    {
      name: "CompletionMaintenance",
      path: "/service-workspace/completion/list",
      component: "service-workspace/completion/list",
      meta: {
        icon: "ri:checkbox-circle-line",
        title: "結案單維護",
        roles: ["wchoiceUser"]
      }
    }
  ]
};

// L1. 系統管理 (SystemManagement)
const wchoiceSystemRouter = {
  path: "/system",
  meta: {
    title: "系統管理",
    icon: "ri:settings-line",
    rank: system
  },
  children: [
    {
      name: "UserMaintenance",
      path: "/system/user/list",
      component: "system/user/list",
      meta: {
        icon: "ri:user-settings-line",
        title: "使用者維護",
        roles: ["wchoiceAdm"]
      }
    },
    {
      name: "RoleMaintenance",
      path: "/system/role/list",
      component: "system/role/list",
      meta: {
        icon: "ri:admin-line",
        title: "角色維護",
        roles: ["wchoiceAdm"]
      }
    }
  ]
};

export {
  wchoiceItemRouter,
  wchoiceQuotationRouter,
  wchoiceServiceRouter,
  wchoiceSystemRouter
};
