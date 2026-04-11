import { isString, isEmpty } from "@pureadmin/utils";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import {
  useRouter,
  useRoute,
  type LocationQueryRaw,
  type RouteParamsRaw
} from "vue-router";

export function useDetail() {
  const route = useRoute();
  const router = useRouter();
  const getParameter = isEmpty(route.params) ? route.query : route.params;

  function toDetail(
    parameter: LocationQueryRaw | RouteParamsRaw,
    model: "query" | "params"
  ) {
    // ⚠️ 这里要特别注意下，因為vue-router在解析路由参数的時候會自動转化成字符串類型，比如在使用useRoute().route.query或useRoute().route.params時，得到的参数都是字符串類型
    // 所以在传参的時候，如果参数是数字類型，就需要在此处 toString() 一下，保證传参跟路由参数類型一致都是字符串，这是必不可少的环节！！！
    Object.keys(parameter).forEach(param => {
      if (!isString(parameter[param])) {
        parameter[param] = parameter[param].toString();
      }
    });
    if (model === "query") {
      // 保存信息到標籤頁
      useMultiTagsStoreHook().handleTags("push", {
        path: `/tabs/query-detail`,
        name: "TabQueryDetail",
        query: parameter,
        meta: {
          title: {
            zh: `No.${parameter.id} - 詳情信息`,
            en: `No.${parameter.id} - DetailInfo`
          },
          // 如果使用的是非國際化精简版title可以像下面这么寫
          // title: `No.${index} - 詳情信息`,
          // 最大打開標籤数
          dynamicLevel: 3
        }
      });
      // 路由跳转
      router.push({ name: "TabQueryDetail", query: parameter });
    } else if (model === "params") {
      useMultiTagsStoreHook().handleTags("push", {
        path: `/tabs/params-detail/:id`,
        name: "TabParamsDetail",
        params: parameter,
        meta: {
          title: {
            zh: `No.${parameter.id} - 詳情信息`,
            en: `No.${parameter.id} - DetailInfo`
          }
          // 如果使用的是非國際化精简版title可以像下面这么寫
          // title: `No.${index} - 詳情信息`,
        }
      });
      router.push({ name: "TabParamsDetail", params: parameter });
    }
  }

  // 用于頁面刷新，重新获取瀏覽器地址欄参数并保存到標籤頁
  const initToDetail = (model: "query" | "params") => {
    if (getParameter) toDetail(getParameter, model);
  };

  return { toDetail, initToDetail, getParameter, router };
}
