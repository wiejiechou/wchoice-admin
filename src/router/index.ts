import "@/utils/sso";
import Cookies from "js-cookie";
import { getConfig } from "@/config";
import NProgress from "@/utils/progress";
import { transformI18n } from "@/plugins/i18n";
import { buildHierarchyTree } from "@/utils/tree";
import remainingRouter from "./modules/remaining";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { usePermissionStoreHook } from "@/store/modules/permission";
import {
  isUrl,
  openLink,
  cloneDeep,
  isAllEmpty,
  storageLocal
} from "@pureadmin/utils";
import {
  ascending,
  getTopMenu,
  initRouter,
  isOneOfArray,
  getHistoryMode,
  findRouteByPath,
  handleAliveRoute,
  formatTwoStageRoutes,
  formatFlatteningRoutes
} from "./utils";
import {
  type Router,
  type RouteRecordRaw,
  type RouteComponent,
  createRouter
} from "vue-router";
import {
  type DataInfo,
  userKey,
  removeToken,
  multipleTabsKey
} from "@/utils/auth";

/** 自動导入全部静态路由，無需再手動引入！匹配 src/router/modules 目录（任何嵌套級别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件請看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件請看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true
  }
);

/** 原始静态路由（未做任何處理） */
const routes = [];

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

/** 导出處理后的静态路由（三級及以上的路由全部拍成二級） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity))))
);

/** 初始的静态路由，用于退出登入時重置路由 */
const initConstantRoutes: Array<RouteRecordRaw> = cloneDeep(constantRoutes);

/** 用于渲染選單，保持原始層級 */
export const constantMenus: Array<RouteComponent> = ascending(
  routes.flat(Infinity)
).concat(...remainingRouter);

/** 不参与選單的路由 */
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});

/** 创建路由實例 */
export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

/** 记录已經加載的頁面路径 */
const loadedPaths = new Set<string>();

/** 重置已加載頁面记录 */
export function resetLoadedPaths() {
  loadedPaths.clear();
}

/** 重置路由 */
export function resetRouter() {
  router.clearRoutes();
  for (const route of initConstantRoutes.concat(...(remainingRouter as any))) {
    router.addRoute(route);
  }
  router.options.routes = formatTwoStageRoutes(
    formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity))))
  );
  usePermissionStoreHook().clearAllCachePage();
  resetLoadedPaths();
}

/** 路由白名單 */
const whiteList = ["/login"];

const { VITE_HIDE_HOME } = import.meta.env;

router.beforeEach((to: ToRouteType, _from) => {
  to.meta.loaded = loadedPaths.has(to.path);

  if (!to.meta.loaded) {
    NProgress.start();
  }

  if (to.meta?.keepAlive) {
    handleAliveRoute(to, "add");
    // 頁面整体刷新和點選標籤頁刷新
    if (_from.name === undefined || _from.name === "Redirect") {
      handleAliveRoute(to);
    }
  }
  const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);
  const externalLink = isUrl(to?.name as string);
  if (!externalLink) {
    to.matched.some(item => {
      if (!item.meta.title) return "";
      const Title = getConfig().Title;
      if (Title)
        document.title = `${transformI18n(item.meta.title)} | ${Title}`;
      else document.title = transformI18n(item.meta.title);
    });
  }
  /** 如果已經登入并存在登入信息后不能跳转到路由白名單，而是继续保持在當前頁面 */
  function toCorrectRoute() {
    return whiteList.includes(to.fullPath) ? _from.fullPath : undefined;
  }
  if (Cookies.get(multipleTabsKey) && userInfo) {
    // 無權限跳转403頁面
    if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userInfo?.roles)) {
      return { path: "/error/403" };
    }
    // 開啟隱藏首頁后在瀏覽器地址欄手動輸入首頁welcome路由则跳转到404頁面
    if (VITE_HIDE_HOME === "true" && to.fullPath === "/welcome") {
      return { path: "/error/404" };
    }
    if (_from?.name) {
      // name為超鏈接
      if (externalLink) {
        openLink(to?.name as string);
        NProgress.done();
        return false;
      } else {
        return toCorrectRoute();
      }
    } else {
      // 刷新
      if (
        usePermissionStoreHook().wholeMenus.length === 0 &&
        to.path !== "/login"
      ) {
        initRouter().then((router: Router) => {
          if (!useMultiTagsStoreHook().getMultiTagsCache) {
            const { path } = to;
            const route = findRouteByPath(
              path,
              router.options.routes[0].children
            );
            getTopMenu(true);
            // query、params模式路由传参数的標籤頁不在此处處理
            if (route && route.meta?.title) {
              if (isAllEmpty(route.parentId) && route.meta?.backstage) {
                // 此处為動態頂級路由（目录）
                const { path, name, meta } = route.children[0];
                useMultiTagsStoreHook().handleTags("push", {
                  path,
                  name,
                  meta
                });
              } else {
                const { path, name, meta } = route;
                useMultiTagsStoreHook().handleTags("push", {
                  path,
                  name,
                  meta
                });
              }
            }
          }
          // 確保動態路由完全加入路由列表并且不影响静态路由（注意：動態路由刷新時router.beforeEach可能會触发两次，第一次触发動態路由還未完全添加，第二次動態路由才完全添加到路由列表，如果需要在router.beforeEach做一些判断可以在to.name存在的條件下去判断，这样就只會触发一次）
          if (isAllEmpty(to.name)) router.push(to.fullPath);
        });
      }
      return toCorrectRoute();
    }
  } else {
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        return true;
      } else {
        removeToken();
        return { path: "/login" };
      }
    } else {
      return true;
    }
  }
});

router.afterEach(to => {
  loadedPaths.add(to.path);
  NProgress.done();
});

export default router;
