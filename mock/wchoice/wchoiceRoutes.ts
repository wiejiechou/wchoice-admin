/**
 * wchoice：為王寵數位建立的角色
 */

// 加入王寵專案中所需要的功能清單
const wchoiceQuotationRouter = {
  path: "/quotation",
  meta: {
    title: "報價管理",
    icon: "ri:list-unordered",
    rank: 0.1 // 選單排序 (刻意將數字調小, 使其排序在上方)
  },
  children: [
    {
      name: "QuotationList",
      path: "/quotation/list",
      component: "quotation/list",
      meta: {
        icon: "ri:file-list-3-line",
        title: "報價單維護",
        roles: ["wchoice"]
      }
    },

    {
      name: "QuotationModify",
      path: "/quotation/modify",
      component: "quotation/modify",
      meta: {
        showLink: false, // 不在選單中顯示
        title: "編輯報價單"
      }
    },
    {
      name: "QuotationTrace",
      path: "/quotation/trace",
      component: "quotation/trace",
      meta: {
        showLink: false, // 不在選單中顯示
        title: "報價進度追蹤"
      }
    }
  ]
};

export default wchoiceQuotationRouter;
