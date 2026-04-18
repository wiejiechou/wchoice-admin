import { reactive, ref, onMounted, toRaw, h, computed } from "vue";
import { utils, writeFile } from "xlsx";
import { useRouter } from "vue-router";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { QUOTATION_DATA, getQuotationDetail } from "./data";
import type { SearchFormProps } from "./types";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import QuotationForm from "../form.vue";

export function useQuotation() {
  const router = useRouter();
  const form = reactive<SearchFormProps>({
    client: "",
    status: "",
    address: ""
  });

  const dataList = ref([]);
  const quickSearch = ref("");
  const loading = ref(true);
  const tableRef = ref();

  /** 根據表頭輸入框進行即時過濾 (Live Filter) */
  const filteredData = computed(() => {
    return dataList.value.filter(data => {
      // 如果沒有輸入或者是空字串，則顯示全部
      if (!quickSearch.value) return true;
      // 模糊搜尋客戶名稱或報價編號
      const search = quickSearch.value.toLowerCase();
      return (
        data.client.toLowerCase().includes(search) ||
        data.id.toLowerCase().includes(search)
      );
    });
  });

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const columns: TableColumnList = [
    {
      label: "報價編號",
      prop: "id",
      minWidth: 150
    },
    {
      label: "客戶名稱",
      prop: "client",
      minWidth: 120
    },
    {
      label: "聯絡電話",
      prop: "phone",
      minWidth: 120
    },
    {
      label: "服務地址",
      prop: "address",
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      label: "金額",
      prop: "price",
      minWidth: 100,
      formatter: ({ price }) => `$` + price.toLocaleString()
    },
    {
      label: "報價狀態",
      prop: "status",
      minWidth: 120,
      cellRenderer: ({ row }) => {
        const statusMap = {
          pending: { text: "報價中", color: "#e6a23c" },
          approved: { text: "報價成立", color: "#67c23a" },
          rejected: { text: "報價不成立", color: "#f56c6c" }
        };
        const { text, color } = statusMap[row.status];
        return (
          <el-tooltip content={text} placement="top">
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: color,
                cursor: "pointer",
                marginLeft: "12px"
              }}
            />
          </el-tooltip>
        );
      }
    },
    {
      label: "服務專員",
      prop: "agent",
      minWidth: 100
    },
    {
      label: "建立日期",
      prop: "date",
      minWidth: 120
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const rawForm = toRaw(form);
    // 模擬網路請求
    delay(500).then(() => {
      let filtered = QUOTATION_DATA;

      if (rawForm.client) {
        filtered = filtered.filter(item =>
          item.client.includes(rawForm.client)
        );
      }
      if (rawForm.status) {
        filtered = filtered.filter(item => item.status === rawForm.status);
      }
      if (rawForm.address) {
        filtered = filtered.filter(item =>
          item.address.includes(rawForm.address)
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

  /** 跳轉至表單頁面或打開抽屜 */
  function handleAction(type: string, row?: any) {
    if (type === "add") {
      addDrawer({
        title: "新增報價單",
        size: "100%",
        hideFooter: true,
        contentRenderer: ({ options, index }) =>
          h(QuotationForm, {
            onClose: () => {
              closeDrawer(options, index);
            },
            onSubmit: (data: any) => {
              console.log("Submitted Data:", data);
              if (data.isDraft) {
                message("報價單草稿已儲存！", { type: "success" });
              } else {
                message("報價單產製成功！已推播至客戶。", { type: "success" });
              }
              closeDrawer(options, index);
              onSearch();
            }
          })
      });
    } else if (type === "edit") {
      const detailData = getQuotationDetail(row.id);
      addDrawer({
        title: "修改報價單",
        size: "100%",
        hideFooter: true,
        contentRenderer: ({ options, index }) =>
          h(QuotationForm, {
            initialData: detailData,
            onClose: () => {
              closeDrawer(options, index);
            },
            onSubmit: (data: any) => {
              console.log("Updated Data:", data);
              if (data.isDraft) {
                message("報價單草稿已更新！", { type: "success" });
              } else {
                message("報價單更新並產製成功！", { type: "success" });
              }
              closeDrawer(options, index);
              onSearch();
            }
          })
      });
    } else if (type === "view") {
      router.push({ name: "QuotationTrace", query: { id: row.id } });
    }
  }

  /** 匯出 Excel */
  function exportExcel() {
    // 準備標題行
    const exportColumns = columns.filter(col => col.label && col.prop);
    const titleList = exportColumns.map(col => col.label);

    // 準備數據行 (依照當前過濾後的結果)
    const res = filteredData.value.map(item => {
      return exportColumns.map(col => {
        if (col.prop === "status") {
          const statusMap = {
            pending: "報價中",
            approved: "報價成立",
            rejected: "報價不成立"
          };
          return statusMap[item.status];
        }
        if (col.prop === "price") {
          return item.price; // 數值
        }
        return item[col.prop as string];
      });
    });

    // 合併標題與數據
    res.unshift(titleList);

    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "報價單列表");
    writeFile(workBook, `報價單清單_${new Date().getTime()}.xlsx`);

    message("匯出成功", { type: "success" });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    filteredData,
    quickSearch,
    pagination,
    tableRef,
    onSearch,
    resetForm,
    exportExcel,
    handleAction,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
