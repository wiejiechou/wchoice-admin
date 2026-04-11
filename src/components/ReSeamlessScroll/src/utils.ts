/**
 * @desc AnimationFrame簡單兼容hack
 */
export const animationFrame = () => {
  window.cancelAnimationFrame = (() => {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      function (id) {
        return window.clearTimeout(id);
      }
    );
  })();
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
};

/**
 * @desc 判断数組是否相等
 * @return {Boolean}
 * @param arr1
 * @param arr2
 */
export const arrayEqual = (arr1: Array<any>, arr2: Array<any>) => {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

/**
 * @desc 深浅合併拷贝
 */
export function copyObj() {
  if (!Array.isArray) {
    // @ts-expect-error
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };
  }
  let name,
    options,
    src,
    copy,
    copyIsArray,
    clone,
    i = 1,
    // eslint-disable-next-line prefer-rest-params
    target = arguments[0] || {}, // 使用||运算符，排除隐式强制類型转换為false的數據類型
    deep = false,
    // eslint-disable-next-line prefer-const
    len = arguments.length;
  if (typeof target === "boolean") {
    deep = target;

    // eslint-disable-next-line prefer-rest-params
    target = arguments[1] || {};
    i++;
  }
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  // 如果arguments.length === 1 或typeof arguments[0] === 'boolean',且存在arguments[1]，则直接返回target對象
  if (i === len) {
    return target;
  }
  for (; i < len; i++) {
    //所以如果源對象中數據類型為Undefined或Null那么就會跳過本次循环，接着循环下一个源對象

    // eslint-disable-next-line prefer-rest-params
    if ((options = arguments[i]) != null) {
      // 如果遇到源對象的數據類型為Boolean, Number for in循环會被跳過，不執行for in循环// src用于判断target對象是否存在name属性
      for (name in options) {
        // src用于判断target對象是否存在name属性
        src = target[name];
        // 需要複製的属性當前源對象的name属性
        copy = options[name];
        // 判断copy是否是数組
        copyIsArray = Array.isArray(copy);
        // 如果是深複製且copy是一个對象或数組则需要递归直到copy成為一个基本數據類型為止
        if (deep && copy && (typeof copy === "object" || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false;
            // 如果目标對象存在name属性且是一个数組
            // 则使用目标對象的name属性，否则重新创建一个数組，用于複製
            clone = src && Array.isArray(src) ? src : [];
          } else {
            // 如果目标對象存在name属性且是一个對象则使用目标對象的name属性，否则重新创建一个對象，用于複製
            clone = src && typeof src === "object" ? src : {};
          }
          // 深複製，所以递归調用copyObject函数
          // 返回值為target對象，即clone對象
          // copy是一个源對象
          // @ts-expect-error
          target[name] = copyObj(deep, clone, copy);
        } else if (copy !== undefined) {
          // 浅複製，直接複製到target對象上
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
