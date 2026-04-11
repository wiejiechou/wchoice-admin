import { removeToken, setToken, type DataInfo } from "./auth";
import { subBefore, getQueryMap } from "@pureadmin/utils";

/**
 * 简版前端單點登入，根據实际业務自行编寫，平台啟動后本地可以跳后面這個鏈接进行測試 http://localhost:8848/#/permission/page/index?username=sso&roles=admin&accessToken=eyJhbGciOiJIUzUxMiJ9.admin
 * 划重點：
 * 判断是否為單點登入，不為则直接返回不再进行任何逻辑處理，下面是單點登入后的逻辑處理
 * 1.清空本地旧信息；
 * 2.获取url中的重要参数信息，然后通過 setToken 保存在本地；
 * 3.删除不需要顯示在 url 的参数
 * 4.使用 window.location.replace 跳转正確頁面
 */
(function () {
  // 获取 url 中的参数
  const params = getQueryMap(location.href) as DataInfo<Date>;
  const must = ["username", "roles", "accessToken"];
  const mustLength = must.length;
  if (Object.keys(params).length !== mustLength) return;

  // url 参数满足 must 里的全部值，才判定為單點登入，避免非單點登入時刷新頁面無限循环
  let sso = [];
  let start = 0;

  while (start < mustLength) {
    if (Object.keys(params).includes(must[start]) && sso.length <= mustLength) {
      sso.push(must[start]);
    } else {
      sso = [];
    }
    start++;
  }

  if (sso.length === mustLength) {
    // 判定為單點登入

    // 清空本地旧信息
    removeToken();

    // 保存新信息到本地
    setToken(params);

    // 删除不需要顯示在 url 的参数
    delete params.roles;
    delete params.accessToken;

    const newUrl = `${location.origin}${location.pathname}${subBefore(
      location.hash,
      "?"
    )}?${JSON.stringify(params)
      .replace(/["{}]/g, "")
      .replace(/:/g, "=")
      .replace(/,/g, "&")}`;

    // 替换历史记录项
    window.location.replace(newUrl);
  } else {
    return;
  }
})();
