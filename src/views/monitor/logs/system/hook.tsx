import dayjs from "dayjs";
import Detail from "./detail.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import { type Ref, reactive, ref, onMounted, toRaw } from "vue";
import { getKeyList, useCopyToClipboard } from "@pureadmin/utils";
import { getSystemLogsList, getSystemLogsDetail } from "@/api/system";
import Info from "~icons/ri/question-line";

export function useRole(tableRef: Ref) {
  const form = reactive({
    module: "",
    requestTime: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const selectedNum = ref(0);
  const { copied, update } = useCopyToClipboard();

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  // const getLevelType = (type, text = false) => {
  //   switch (type) {
  //     case 0:
  //       return text ? "debug" : "primary";
  //     case 1:
  //       return text ? "info" : "success";
  //     case 2:
  //       return text ? "warn" : "info";
  //     case 3:
  //       return text ? "error" : "warning";
  //     case 4:
  //       return text ? "fatal" : "danger";
  //   }
  // };

  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多選，此处label必须設定
      type: "selection",
      fixed: "left",
      reserveSelection: true // 數據刷新后保留選項
    },
    {
      label: "ID",
      prop: "id",
      minWidth: 90
    },
    {
      label: "所属模組",
      prop: "module",
      minWidth: 100
    },
    {
      headerRenderer: () => (
        <span class="flex-c">
          請求接口
          <iconify-icon-offline
            icon={Info}
            class="ml-1 cursor-help"
            v-tippy={{
              content: "双击下面請求接口進行拷贝"
            }}
          />
        </span>
      ),
      prop: "url",
      minWidth: 140
    },
    {
      label: "請求方法",
      prop: "method",
      minWidth: 140
    },
    {
      label: "IP 地址",
      prop: "ip",
      minWidth: 100
    },
    {
      label: "地點",
      prop: "address",
      minWidth: 140
    },
    {
      label: "操作系統",
      prop: "system",
      minWidth: 100
    },
    {
      label: "瀏覽器類型",
      prop: "browser",
      minWidth: 100
    },
    // {
    //   label: "級别",
    //   prop: "level",
    //   minWidth: 90,
    //   cellRenderer: ({ row, props }) => (
    //     <el-tag size={props.size} type={getLevelType(row.level)} effect="plain">
    //       {getLevelType(row.level, true)}
    //     </el-tag>
    //   )
    // },
    {
      label: "請求耗時",
      prop: "takesTime",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.takesTime < 1000 ? "success" : "warning"}
          effect="plain"
        >
          {row.takesTime} ms
        </el-tag>
      )
    },
    {
      label: "請求時間",
      prop: "requestTime",
      minWidth: 180,
      formatter: ({ requestTime }) =>
        dayjs(requestTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  /** 當CheckBox選擇项发生變化時會触发該事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消選擇 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多選表格，清空用戶的選擇
    tableRef.value.getTableRef().clearSelection();
  }

  /** 拷贝請求接口，表格單元格被双击時触发 */
  function handleCellDblclick({ url }, { property }) {
    if (property !== "url") return;
    update(url);
    copied.value
      ? message(`${url} 已拷贝`, { type: "success" })
      : message("拷贝失敗", { type: "warning" });
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回當前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    // 接下来根據实际业務，通過选中行的某项數據，比如下面的id，調用接口進行批量删除
    message(`已删除序号為 ${getKeyList(curSelected, "id")} 的數據`, {
      type: "success"
    });
    tableRef.value.getTableRef().clearSelection();
    onSearch();
  }

  /** 清空日志 */
  function clearAll() {
    // 根據实际业務，調用接口删除所有日志數據
    message("已删除所有日志數據", {
      type: "success"
    });
    onSearch();
  }

  function onDetail(row) {
    getSystemLogsDetail({ id: row.id }).then(res => {
      addDialog({
        title: "系統日志詳情",
        fullscreen: true,
        hideFooter: true,
        contentRenderer: () => Detail,
        props: {
          data: [res]
        }
      });
    });
  }

  async function onSearch() {
    loading.value = true;
    const { code, data } = await getSystemLogsList(toRaw(form));
    if (code === 0) {
      dataList.value = data.list;
      pagination.total = data.total;
      pagination.pageSize = data.pageSize;
      pagination.currentPage = data.currentPage;
    }

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    selectedNum,
    onSearch,
    onDetail,
    clearAll,
    resetForm,
    onbatchDel,
    handleSizeChange,
    onSelectionCancel,
    handleCellDblclick,
    handleCurrentChange,
    handleSelectionChange
  };
}
