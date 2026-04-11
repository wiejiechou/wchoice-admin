// 抽離可公用的工具函数等用于系統管理頁面逻辑
import { computed } from "vue";
import { useDark } from "@pureadmin/utils";

export function usePublicHooks() {
  const { isDark } = useDark();

  const switchStyle = computed(() => {
    return {
      "--el-switch-on-color": "#6abe39",
      "--el-switch-off-color": "#e84749"
    };
  });

  const tagStyle = computed(() => {
    return (status: number) => {
      return status === 1
        ? {
            "--el-tag-text-color": isDark.value ? "#6abe39" : "#389e0d",
            "--el-tag-bg-color": isDark.value ? "#172412" : "#f6ffed",
            "--el-tag-border-color": isDark.value ? "#274a17" : "#b7eb8f"
          }
        : {
            "--el-tag-text-color": isDark.value ? "#e84749" : "#cf1322",
            "--el-tag-bg-color": isDark.value ? "#2b1316" : "#fff1f0",
            "--el-tag-border-color": isDark.value ? "#58191c" : "#ffa39e"
          };
    };
  });

  return {
    /** 當前网頁是否為`dark`模式 */
    isDark,
    /** 表現更鲜明的`el-switch`組件  */
    switchStyle,
    /** 表現更鲜明的`el-tag`組件  */
    tagStyle
  };
}
