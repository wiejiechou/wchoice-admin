import { reactive, ref, onMounted, toRaw, computed } from "vue";
import { utils, writeFile } from "xlsx";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { COMPLETION_DATA } from "./data";
import type { SearchFormProps, CompletionItem } from "./types";

export function useCompletion() {
  const form = reactive<SearchFormProps>({
    buzentityName: "",
    serviceId: "",
    completionStatus: ""
  });

  const dataList = ref<CompletionItem[]>([]);
  const quickSearch = ref("");
  const loading = ref(true);

  const filteredData = computed(() => {
    const search = quickSearch.value.toLowerCase();
    return dataList.value.filter(data => {
      if (!search) return true;
      return (
        data.buzentityName.toLowerCase().includes(search) ||
        data.serviceId.toLowerCase().includes(search)
      );
    });
  });

  const renderStatus = (val: CompletionItem["completionStatus"]) => {
    const statusMap = {
      pending_review: { text: "待結案審核", color: "#e6a23c" },
      completed: { text: "已結案", color: "#67c23a" }
    };
    const { text, color } = statusMap[val] || {
      text: "未知",
      color: "#909399"
    };
    return (
      <el-tag
        effect="dark"
        style={{ backgroundColor: color, border: "none" }}
        size="small"
      >
        {text}
      </el-tag>
    );
  };

  const columns: TableColumnList = [
    { label: "服務單號", prop: "serviceId", minWidth: 150 },
    {
      label: "客戶名稱",
      prop: "buzentityName",
      minWidth: 150,
      showOverflowTooltip: true
    },
    {
      label: "結案進度",
      prop: "completionStatus",
      minWidth: 120,
      cellRenderer: ({ row }) => renderStatus(row.completionStatus)
    },
    {
      label: "滿意度",
      prop: "satisfactionRate",
      minWidth: 100,
      cellRenderer: ({ row }) =>
        row.satisfactionRate ? `${row.satisfactionRate} ⭐` : "-"
    },
    {
      label: "尾款金額",
      prop: "finalBalance",
      minWidth: 100,
      formatter: ({ finalBalance }) => `$` + finalBalance.toLocaleString()
    },
    { label: "結案日期", prop: "completionDate", minWidth: 110 },
    {
      label: "更新日期",
      prop: "mTime",
      minWidth: 110,
      cellRenderer: ({ row }) => <span>{row.mTime.split(" ")[0]}</span>
    },
    { label: "操作", fixed: "right", width: 120, slot: "operation" }
  ];

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  async function onSearch() {
    loading.value = true;
    const rawForm = toRaw(form);
    delay(400).then(() => {
      let filtered = [...COMPLETION_DATA];
      if (rawForm.serviceId)
        filtered = filtered.filter(item =>
          item.serviceId.includes(rawForm.serviceId)
        );
      if (rawForm.buzentityName)
        filtered = filtered.filter(item =>
          item.buzentityName.includes(rawForm.buzentityName)
        );
      if (rawForm.completionStatus)
        filtered = filtered.filter(
          item => item.completionStatus === rawForm.completionStatus
        );
      dataList.value = filtered;
      pagination.total = filtered.length;
      loading.value = false;
    });
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function handleAction(row: CompletionItem) {
    message(`正在開啟 ${row.serviceId} 結案審核...`, { type: "info" });
    // TODO: 實作結案審核表單
  }

  function exportExcel() {
    const exportColumns = columns.filter(col => col.label && col.prop);
    const titleList = exportColumns.map(col => col.label);
    const res = filteredData.value.map(item => {
      return exportColumns.map(col => {
        if (col.prop === "completionStatus")
          return item.completionStatus === "completed" ? "已結案" : "待審核";
        return item[col.prop as string];
      });
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "結案維護清單");
    writeFile(workBook, `結案清單_${new Date().getTime()}.xlsx`);
    message("匯出成功", { type: "success" });
  }

  onMounted(() => onSearch());

  return {
    form,
    loading,
    columns,
    filteredData,
    quickSearch,
    pagination,
    onSearch,
    resetForm,
    exportExcel,
    handleAction
  };
}
