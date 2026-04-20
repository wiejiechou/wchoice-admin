import { reactive, ref, onMounted, toRaw, h, computed } from "vue";
import { utils, writeFile } from "xlsx";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { CUSTOMER_DATA, getCustomerDetail } from "./data";
import type { SearchFormProps } from "./types";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import CustomerFormView from "../form.vue";

export function useCustomer() {
  const form = reactive<SearchFormProps>({
    buzentityId: "",
    buzentityName: "",
    isActive: ""
  });

  const dataList = ref([]);
  const quickSearch = ref("");
  const loading = ref(true);
  const tableRef = ref();

  /** 範版樣式：彩色狀態點 */
  const renderStatus = (val: string) => {
    const statusMap = {
      Y: { text: "有效", color: "#67c23a" },
      N: { text: "無效", color: "#f56c6c" }
    };
    const { text, color } = statusMap[val] || {
      text: "未知",
      color: "#909399"
    };
    return (
      <el-tooltip content={text} placement="top">
        <span
          style={{
            display: "inline-block",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: color,
            cursor: "pointer"
          }}
        />
      </el-tooltip>
    );
  };

  /** 列表欄位定義 (根據需求調整順序與格式) */
  const columns: TableColumnList = [
    {
      label: "統一編號",
      prop: "buzentityId",
      minWidth: 120
    },
    {
      label: "客戶名稱",
      prop: "buzentityName",
      minWidth: 180,
      showOverflowTooltip: true
    },
    {
      label: "有效狀態",
      prop: "isActive",
      minWidth: 90,
      cellRenderer: ({ row }) => renderStatus(row.isActive)
    },
    {
      label: "客戶地址",
      prop: "buzentityAddr",
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      label: "聯絡人",
      prop: "contactName",
      minWidth: 120
    },
    {
      label: "聯絡電話",
      prop: "contactInfo",
      minWidth: 180,
      showOverflowTooltip: true
    },
    {
      label: "更新日期",
      prop: "mTime",
      minWidth: 120,
      cellRenderer: ({ row }) => <span>{row.mTime.split(" ")[0]}</span>
    },
    {
      label: "操作",
      fixed: "right",
      width: 120,
      slot: "operation"
    }
  ];

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const filteredData = computed(() => {
    const search = quickSearch.value.toLowerCase();
    return dataList.value.filter(data => {
      if (!search) return true;
      return (
        data.buzentityName.toLowerCase().includes(search) ||
        data.buzentityId.toLowerCase().includes(search) ||
        data.contactName.toLowerCase().includes(search)
      );
    });
  });

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const rawForm = toRaw(form);
    // 模擬異步加載
    delay(400).then(() => {
      let filtered = [...CUSTOMER_DATA];

      if (rawForm.buzentityId) {
        filtered = filtered.filter(item =>
          item.buzentityId.includes(rawForm.buzentityId)
        );
      }
      if (rawForm.buzentityName) {
        filtered = filtered.filter(item =>
          item.buzentityName.includes(rawForm.buzentityName)
        );
      }
      if (rawForm.isActive) {
        filtered = filtered.filter(item => item.isActive === rawForm.isActive);
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

  /** 觸發抽屜 (非全螢幕設計) */
  function handleAction(type: string, row?: any) {
    const title = type === "add" ? "新增客戶實體" : "修改客戶資訊";
    const initialData =
      type === "edit" ? getCustomerDetail(row.buzentityId) : null;

    addDrawer({
      title,
      size: "600px", // 用戶要求適中寬度，非全螢幕
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(CustomerFormView, {
          initialData,
          onClose: () => closeDrawer(options, index),
          onSubmit: (data: any) => {
            console.log("Submitted:", data);
            message("保存成功", { type: "success" });
            closeDrawer(options, index);
            onSearch();
          }
        })
    });
  }

  function exportExcel() {
    const exportColumns = columns.filter(col => col.label && col.prop);
    const titleList = exportColumns.map(col => col.label);
    const res = filteredData.value.map(item => {
      return exportColumns.map(col => {
        if (col.prop === "isActive")
          return item.isActive === "Y" ? "有效" : "無效";
        return item[col.prop as string];
      });
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "客戶清單");
    writeFile(workBook, `客戶清單_${new Date().getTime()}.xlsx`);
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
    handleSizeChange,
    handleCurrentChange
  };
}
