import dayjs from "dayjs";
import { message } from "@/utils/message";
import { getKeyList } from "@pureadmin/utils";
import { getLoginLogsList } from "@/api/system";
import { usePublicHooks } from "@/views/system/hooks";
import type { PaginationProps } from "@pureadmin/table";
import { type Ref, reactive, ref, onMounted, toRaw } from "vue";

export function useRole(tableRef: Ref) {
  const form = reactive({
    username: "",
    status: "",
    loginTime: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const selectedNum = ref(0);
  const { tagStyle } = usePublicHooks();

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多選，此处label必须設定
      type: "selection",
      fixed: "left",
      reserveSelection: true // 數據刷新后保留選項
    },
    {
      label: "序号",
      prop: "id",
      minWidth: 90
    },
    {
      label: "用戶名",
      prop: "username",
      minWidth: 100
    },
    {
      label: "登入 IP",
      prop: "ip",
      minWidth: 140
    },
    {
      label: "登入地點",
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
    {
      label: "登入狀態",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status === 1 ? "成功" : "失敗"}
        </el-tag>
      )
    },
    {
      label: "登入行為",
      prop: "behavior",
      minWidth: 100
    },
    {
      label: "登入時間",
      prop: "loginTime",
      minWidth: 180,
      formatter: ({ loginTime }) =>
        dayjs(loginTime).format("YYYY-MM-DD HH:mm:ss")
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

  async function onSearch() {
    loading.value = true;
    const { code, data } = await getLoginLogsList(toRaw(form));
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
    clearAll,
    resetForm,
    onbatchDel,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
