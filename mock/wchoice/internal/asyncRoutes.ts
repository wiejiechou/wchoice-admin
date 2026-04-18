/**
 * roles：頁面等級權限
 * wchoiceSales：王寵數位 業務
 * wchoiceManager：王寵數位 行政人員
 * wchoiceAdmin： 王寵數位 系統管理者
 */
import { system } from "@/router/enums";

// L1. 客戶管理 (Customer CRM)
const wchoiceCustomerManagerRouter = {
  path: "/internal/customer",
  meta: {
    title: "客戶管理",
    icon: "ri:team-line",
    rank: 0.1
  },
  children: [
    {
      name: "InternalCustomer",
      path: "/internal/customer/list",
      component: "internal/customer/list",
      meta: {
        icon: "ri:user-star-line",
        title: "客戶維護",
        roles: ["wchoiceSales", "wchoiceManager", "wchoiceAdmin"]
      }
    }
  ]
};

// L1. 報價管理 (QuotationManagement)
const wchoiceQuotationRouter = {
  path: "/internal/quotation",
  meta: {
    title: "報價管理",
    icon: "ri:list-unordered",
    rank: 0.2
  },
  children: [
    {
      name: "QuotationMaintenance",
      path: "/internal/quotation/list",
      component: "internal/quotation/list",
      meta: {
        icon: "ri:file-list-3-line",
        title: "報價單維護",
        roles: ["wchoiceSales", "wchoiceManager", "wchoiceAdmin"]
      }
    }
  ]
};

// L1. 服務專區 (ServiceWorkspace)
const wchoiceServiceRouter = {
  path: "/internal/workspace",
  meta: {
    title: "服務專區",
    icon: "ri:briefcase-line",
    rank: 0.3
  },
  children: [
    {
      name: "OrderExecution",
      path: "/internal/workspace/order/list",
      component: "internal/service-workspace/order/list",
      meta: {
        icon: "ri:order-play-line",
        title: "派工與施作維護",
        roles: ["wchoiceSales", "wchoiceManager", "wchoiceAdmin"]
      }
    },
    {
      name: "OrderCompletion",
      path: "/internal/workspace/completion/list",
      component: "internal/service-workspace/completion/list",
      meta: {
        icon: "ri:checkbox-circle-line",
        title: "結案維護",
        roles: ["wchoiceSales", "wchoiceManager", "wchoiceAdmin"]
      }
    }
  ]
};

// L1. 服務內容管理 (ServicePortfolio)
const wchoiceItemRouter = {
  path: "/internal/portfolio",
  meta: {
    title: "服務內容管理",
    icon: "ri:list-settings-line",
    rank: 0.4
  },
  children: [
    {
      name: "SpaceMaintenance",
      path: "/internal/portfolio/space/list",
      component: "internal/service-portfolio/space/list",
      meta: {
        icon: "ri:layout-left-line",
        title: "作業區域維護",
        roles: ["wchoiceManager", "wchoiceAdmin"]
      }
    },
    {
      name: "ServiceItemMaintenance",
      path: "/internal/portfolio/service-item/list",
      component: "internal/service-portfolio/service-item/list",
      meta: {
        icon: "ri:tools-line",
        title: "服務項目維護",
        roles: ["wchoiceManager", "wchoiceAdmin"]
      }
    }
  ]
};

// L1. 系統管理 (SystemManagement)
const wchoiceSystemRouter = {
  path: "/internal/system",
  meta: {
    title: "系統管理",
    icon: "ri:settings-line",
    rank: system
  },
  children: [
    {
      name: "UserMaintenance",
      path: "/internal/system/user/list",
      component: "internal/system/user/list",
      meta: {
        icon: "ri:user-settings-line",
        title: "使用者維護",
        roles: ["wchoiceAdmin"]
      }
    },
    {
      name: "RoleMaintenance",
      path: "/internal/system/role/list",
      component: "internal/system/role/list",
      meta: {
        icon: "ri:admin-line",
        title: "角色維護",
        roles: ["wchoiceAdmin"]
      }
    }
  ]
};

// 匯出路由定義，確保其他模組能正確解析這些路由
export {
  wchoiceCustomerManagerRouter,
  wchoiceQuotationRouter,
  wchoiceServiceRouter,
  wchoiceItemRouter,
  wchoiceSystemRouter
};
