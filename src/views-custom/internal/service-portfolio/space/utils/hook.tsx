import { reactive, ref, onMounted, toRaw, h, computed } from "vue";
import { utils, writeFile } from "xlsx";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { SPACE_DATA, getSpaceDetail } from "./data";
import type { SearchFormProps } from "./types";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import SpaceFormView from "../form.vue";

export function useSpace() {
  const form = reactive<SearchFormProps>({
    spaceName: "",
    status: ""
  });

  const dataList = ref([]);
  const quickSearch = ref("");
  const loading = ref(true);
  const tableRef = ref();

  const renderStatus = (val: string) => {
    const text = val === "Y" ? "啟用" : "停用";
    return <el-tag type={val === "Y" ? "success" : "danger"}>{text}</el-tag>;
  };

  const columns: TableColumnList = [
    {
      label: "項次",
      prop: "index",
      width: 60,
      align: "center"
    },
    {
      label: "區域名稱",
      prop: "spaceName",
      minWidth: 140
    },
    {
      label: "識別代碼",
      prop: "spaceCode",
      minWidth: 120
    },
    {
      label: "狀態",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row }) => renderStatus(row.status)
    },
    {
      label: "綁定項目數",
      prop: "itemCount",
      minWidth: 120,
      align: "center"
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
    return dataList.value
      .map((data, index) => ({
        ...data,
        index: index + 1
      }))
      .filter(data => {
        if (!search) return true;
        return (
          data.spaceName.toLowerCase().includes(search) ||
          data.spaceCode.toLowerCase().includes(search)
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
    delay(400).then(() => {
      let filtered = [...SPACE_DATA];

      if (rawForm.spaceName) {
        filtered = filtered.filter(item =>
          item.spaceName.includes(rawForm.spaceName)
        );
      }
      if (rawForm.status) {
        filtered = filtered.filter(item => item.status === rawForm.status);
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

  function handleAction(type: string, row?: any) {
    const title = type === "add" ? "新增作業區域" : "編輯作業區域";
    const initialData = type === "edit" ? getSpaceDetail(row.spaceId) : null;

    addDrawer({
      title,
      size: "800px",
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(SpaceFormView, {
          initialData,
          onClose: () => closeDrawer(options, index),
          onSubmit: (data: any) => {
            console.log("Submitted:", data);
            message("儲存成功", { type: "success" });
            closeDrawer(options, index);
            onSearch();
          }
        })
    });
  }

  function exportExcel() {
    const exportColumns = columns.filter(
      col => col.label && col.prop && col.prop !== "operation"
    );
    const titleList = exportColumns.map(col => col.label);
    const res = filteredData.value.map(item => {
      return exportColumns.map(col => {
        if (col.prop === "status") return item.status === "Y" ? "啟用" : "停用";
        if (col.prop === "mTime") return item.mTime.split(" ")[0];
        return item[col.prop as string];
      });
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "作業區域清單");
    writeFile(workBook, `作業區域清單_${new Date().getTime()}.xlsx`);
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
