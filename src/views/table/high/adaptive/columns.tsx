import type {
  LoadingConfig,
  AdaptiveConfig,
  PaginationProps
} from "@pureadmin/table";
import { tableData } from "../data";
import { ref, onMounted, reactive } from "vue";
import { clone, delay } from "@pureadmin/utils";

export function useColumns() {
  const dataList = ref([]);
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      label: "日期",
      prop: "date"
    },
    {
      label: "姓名",
      prop: "name"
    },
    {
      label: "地址",
      prop: "address"
    }
  ];

  /** 分頁配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 20,
    currentPage: 1,
    pageSizes: [20, 40, 60],
    total: 0,
    align: "right",
    background: true,
    size: "default"
  });

  /** 加載動畫配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: "正在加載第一頁...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    // svg: "",
    // background: rgba()
  });

  /** 撑满内容區自適應高度相關配置 */
  const adaptiveConfig: AdaptiveConfig = {
    /** 表格距離頁面底部的偏移量，預設值為 `96` */
    offsetBottom: 110
    /** 是否固定表頭，預設值為 `true`（如果不想固定表頭，fixHeader設定為false并且表格要設定table-layout="auto"） */
    // fixHeader: true
    /** 頁面 `resize` 時的防抖時間，預設值為 `60` ms */
    // timeout: 60
    /** 表頭的 `z-index`，預設值為 `100` */
    // zIndex: 100
  };

  function onSizeChange(val) {
    console.log("onSizeChange", val);
  }

  function onCurrentChange(val) {
    loadingConfig.text = `正在加載第${val}頁...`;
    loading.value = true;
    delay(600).then(() => {
      loading.value = false;
    });
  }

  onMounted(() => {
    delay(600).then(() => {
      const newList = [];
      Array.from({ length: 6 }).forEach(() => {
        newList.push(clone(tableData, true));
      });
      newList.flat(Infinity).forEach((item, index) => {
        dataList.value.push({ id: index, ...item });
      });
      pagination.total = dataList.value.length;
      loading.value = false;
    });
  });

  return {
    loading,
    columns,
    dataList,
    pagination,
    loadingConfig,
    adaptiveConfig,
    onSizeChange,
    onCurrentChange
  };
}
