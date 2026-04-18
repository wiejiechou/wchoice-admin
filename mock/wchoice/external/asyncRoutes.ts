/**
 * roles：頁面等級權限
 * wchoiceCustomer：王寵數位 顧客
 */

// L1. 外部顧客視角 (External Ecosystem)
const wchoiceExternalRouter = {
  path: "/external",
  meta: {
    title: "我的王寵服務",
    icon: "ri:user-smile-line",
    rank: 10
  },
  children: [
    {
      name: "ExternalQuotation",
      path: "/external/my-quotation/list",
      component: "external/my-quotation/list",
      meta: {
        icon: "ri:file-list-3-line",
        title: "我的報價",
        roles: ["wchoiceCustomer"]
      }
    },
    {
      name: "ExternalOrder",
      path: "/external/my-order/list",
      component: "external/my-order/list",
      meta: {
        icon: "ri:shopping-bag-3-line",
        title: "我的訂單",
        roles: ["wchoiceCustomer"]
      }
    },
    {
      name: "ExternalProfile",
      path: "/external/profile/index",
      component: "external/profile/index",
      meta: {
        icon: "ri:user-settings-line",
        title: "基本資料",
        roles: ["wchoiceCustomer"]
      }
    }
  ]
};

// 匯出路由定義，確保其他模組能正確解析這些路由
export { wchoiceExternalRouter };
