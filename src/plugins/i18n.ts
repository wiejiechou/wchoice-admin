// 多組件库的國際化和本地项目國際化兼容
import { type I18n, createI18n } from "vue-i18n";
import type { App, WritableComputedRef } from "vue";
import { responsiveStorageNameSpace } from "@/config";
import { storageLocal, isObject } from "@pureadmin/utils";

// element-plus國際化
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/zh-cn";
import zhTwLocale from "element-plus/es/locale/lang/zh-tw";

const siphonI18n = (function () {
  // 仅初始化一次國際化配置
  const cache = Object.fromEntries(
    Object.entries(
      import.meta.glob("../../locales/*.{yaml,yml}", { eager: true })
    ).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  );
  return (prefix = "zh-TW") => {
    return cache[prefix];
  };
})();

export const localesConfigs = {
  zh: {
    ...siphonI18n("zh-CN"),
    ...zhLocale
  },
  // zh-TW：繁體中文語系，locales 檔案對應 locales/zh-TW.yaml
  "zh-TW": {
    ...siphonI18n("zh-TW"),
    ...zhTwLocale
  },
  en: {
    ...siphonI18n("en"),
    ...enLocale
  }
};

/** 获取對象中所有嵌套對象的key鍵，并將它們用點号分割組成字符串 */
function getObjectKeys(obj) {
  const stack = [];
  const keys: Set<string> = new Set();

  stack.push({ obj, key: "" });

  while (stack.length > 0) {
    const { obj, key } = stack.pop();

    for (const k in obj) {
      const newKey = key ? `${key}.${k}` : k;

      if (obj[k] && isObject(obj[k])) {
        stack.push({ obj: obj[k], key: newKey });
      } else {
        keys.add(key);
      }
    }
  }

  return keys;
}

/** 將展開的key缓存 */
const keysCache: Map<string, Set<string>> = new Map();
const flatI18n = (prefix = "zh-TW") => {
  let cache = keysCache.get(prefix);
  if (!cache) {
    cache = getObjectKeys(siphonI18n(prefix));
    keysCache.set(prefix, cache);
  }
  return cache;
};

/**
 * 國際化转换工具函数（自動读取根目录locales文件夹下文件进行國際化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = "") {
  if (!message) {
    return "";
  }

  // 處理存储動態路由的title,格式 {zh:"",en:""}
  if (typeof message === "object") {
    const locale: string | WritableComputedRef<string> | any =
      i18n.global.locale;
    return message[locale?.value];
  }

  const key = message.match(/(\S*)\./)?.input;

  if (key && flatI18n("zh-TW").has(key)) {
    return i18n.global.t.call(i18n.global.locale, message);
  } else if (!key && Object.hasOwn(siphonI18n("zh-TW"), message)) {
    // 兼容非嵌套形式的國際化寫法
    return i18n.global.t.call(i18n.global.locale, message);
  } else {
    return message;
  }
}

/** 此函数只是配合i18n Ally插件来进行國際化智能提示，并無实际意义（只對提示起作用），如果不需要國際化可删除 */
export const $t = (key: string) => key;

export const i18n: I18n = createI18n({
  legacy: false,
  locale:
    storageLocal().getItem<StorageConfigs>(
      `${responsiveStorageNameSpace()}locale`
    )?.locale ?? "zh-TW",
  fallbackLocale: "en",
  messages: localesConfigs
});

export function useI18n(app: App) {
  app.use(i18n);
}
