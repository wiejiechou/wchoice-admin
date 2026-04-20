import { reactive, ref, onMounted, toRaw, h, computed } from "vue";
import { utils, writeFile } from "xlsx";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { SERVICE_ORDER_DATA } from "./data";
import type { SearchFormProps, ServiceOrderItem } from "./types";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import DispatchForm from "../dispatch.vue";
import ExecuteForm from "../execute.vue";

export function useServiceOrder() {
  const form = reactive<SearchFormProps>({
    buzentityName: "",
    serviceId: "",
    orderStatus: ""
  });

  const dataList = ref<ServiceOrderItem[]>([]);
  const quickSearch = ref("");
  const loading = ref(true);
  const tableRef = ref();

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

  /** 狀態標籤渲染 */
  const renderStatus = (val: ServiceOrderItem["orderStatus"]) => {
    const statusMap = {
      pending_dispatch: { text: "派工中", color: "#e6a23c" },
      in_execution: { text: "施作中", color: "#409eff" },
      pending_completion: { text: "待驗收", color: "#67c23a" }
    };
    const { text, color } = statusMap[val] || {
      text: "未知",
      color: "#909399"
    };
    return (
      <el-tag
        effect="plain"
        style={{ color: color, borderColor: color }}
        size="small"
      >
        {text}
      </el-tag>
    );
  };

  const columns: TableColumnList = [
    {
      label: "服務單號",
      prop: "serviceId",
      minWidth: 150
    },
    {
      label: "客戶名稱",
      prop: "buzentityName",
      minWidth: 150,
      showOverflowTooltip: true
    },
    {
      label: "聯絡電話",
      prop: "contactInfo",
      minWidth: 120
    },
    {
      label: "服務地址",
      prop: "buzentityAddr",
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      label: "金額",
      prop: "orderAmount",
      minWidth: 100,
      formatter: ({ orderAmount }) => `$` + orderAmount.toLocaleString()
    },
    {
      label: "目前進度",
      prop: "orderStatus",
      minWidth: 100,
      cellRenderer: ({ row }) => renderStatus(row.orderStatus)
    },
    {
      label: "服務專員",
      prop: "salesName",
      minWidth: 100
    },
    {
      label: "建立日期",
      prop: "cTime",
      minWidth: 120,
      cellRenderer: ({ row }) => <span>{row.cTime.split(" ")[0]}</span>
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
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
      let filtered = [...SERVICE_ORDER_DATA];
      if (rawForm.serviceId) {
        filtered = filtered.filter(item =>
          item.serviceId.includes(rawForm.serviceId)
        );
      }
      if (rawForm.buzentityName) {
        filtered = filtered.filter(item =>
          item.buzentityName.includes(rawForm.buzentityName)
        );
      }
      if (rawForm.orderStatus) {
        filtered = filtered.filter(
          item => item.orderStatus === rawForm.orderStatus
        );
      }
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

  /** 跳轉至派工/施工維護 (採用 100% 寬度抽屜) */
  function handleAction(type: "dispatch" | "execution", row: ServiceOrderItem) {
    const title =
      type === "dispatch"
        ? `人員派工維護 - ${row.serviceId}`
        : `施工紀錄回填 - ${row.serviceId}`;
    const component = type === "dispatch" ? DispatchForm : ExecuteForm;

    addDrawer({
      title,
      size: "100%", // 全螢幕設計
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(component, {
          initialOrder: { ...toRaw(row) },
          onClose: () => closeDrawer(options, index),
          onSuccess: () => {
            closeDrawer(options, index);
            onSearch();
          }
        })
    });
  }

  /** 列印處理 (另開視窗) */
  function handlePrint(row: ServiceOrderItem, type: "dispatch" | "execution") {
    const typeName = type === "dispatch" ? "派工單" : "施作單";
    message(`正在開啟 ${row.serviceId} ${typeName}...`, { type: "info" });

    // 指向 public 資料夾下的實際 PDF 檔案
    const fileName =
      type === "dispatch"
        ? "1_dispatch_20260326.pdf"
        : "2_execute_20260326.pdf";
    const printUrl = `${import.meta.env.BASE_URL}assets/print/${fileName}`;

    window.open(printUrl, "_blank");
  }

  function exportExcel() {
    const exportColumns = columns.filter(col => col.label && col.prop);
    const titleList = exportColumns.map(col => col.label);
    const res = filteredData.value.map(item => {
      return exportColumns.map(col => {
        if (col.prop === "orderStatus") {
          const map = {
            pending_dispatch: "派工中",
            in_execution: "施作中",
            pending_completion: "待驗收"
          };
          return map[item.orderStatus];
        }
        return item[col.prop as string];
      });
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "服務單清單");
    writeFile(workBook, `服務單清單_${new Date().getTime()}.xlsx`);
    message("匯出成功", { type: "success" });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    filteredData,
    quickSearch,
    pagination,
    tableRef,
    onSearch,
    resetForm,
    exportExcel,
    handleAction,
    handlePrint
  };
}
