import { reactive, ref, onMounted, toRaw, h, computed } from "vue";
import { utils, writeFile } from "xlsx";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { SERVICE_ITEM_DATA, getServiceItemDetail } from "./data";
import type { SearchFormProps } from "./types";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import InfoIcon from "~icons/ri/information-line";
import ServiceItemFormView from "../form.vue";

export function useServiceItem() {
  const form = reactive<SearchFormProps>({
    name: ""
  });

  const dataList = ref([]);
  const quickSearch = ref("");
  const loading = ref(true);
  const tableRef = ref();

  /** 渲染流程說明 Popover */
  const renderDescPopover = (desc: string) => {
    return (
      <el-popover
        placement="right"
        title="施作流程說明"
        width={300}
        trigger="hover"
      >
        {{
          reference: () => (
            <div class="flex-c   cursor-help text-blue-500">
              {h(useRenderIcon(InfoIcon))}
            </div>
          ),
          default: () => (
            <div class="text-sm/relaxed text-gray-600 whitespace-pre-line ">
              {desc || "暫無流程說明"}
            </div>
          )
        }}
      </el-popover>
    );
  };

  /** 渲染條件詳情 Popover */
  const renderConditionsPopover = (row: any) => {
    const hasMultiple = row.conditions.length > 1;
    const firstCondName = row.conditions[0]?.name || "未定義條件";

    return (
      <el-popover
        placement="left"
        title="施作條件細項"
        width={320}
        trigger="hover"
      >
        {{
          reference: () => (
            <div class="cursor-pointer text-orange-500 italic text-[12px] hover:font-bold transition-all">
              {firstCondName}
              {hasMultiple && (
                <span class="ml-1 text-[10px] bg-orange-100 px-1.5 py-0.5 rounded-full not-italic">
                  +{row.conditions.length - 1}
                </span>
              )}
            </div>
          ),
          default: () => (
            <el-table data={row.conditions} size="small" border>
              <el-table-column
                property="label"
                label="序"
                width={40}
                align="center"
              />
              <el-table-column property="name" label="條件名稱" />
              <el-table-column
                property="price"
                label="單價"
                width={70}
                align="right"
              />
              <el-table-column
                property="time"
                label="時間(m)"
                width={70}
                align="right"
              />
            </el-table>
          )
        }}
      </el-popover>
    );
  };

  /** 列表欄位定義 */
  const columns: TableColumnList = [
    {
      label: "項次",
      type: "index",
      width: 60,
      align: "center"
    },
    {
      label: "項目名稱",
      prop: "name",
      minWidth: 150,
      align: "center",
      cellRenderer: ({ row }) => <span class="font-bold">{row.name}</span>
    },
    {
      label: "單位",
      prop: "unit",
      width: 60,
      align: "center"
    },
    {
      label: "說明 (施作流程)",
      width: 140,
      align: "center",
      cellRenderer: ({ row }) => renderDescPopover(row.desc)
    },
    {
      label: "預設基準",
      minWidth: 120,
      align: "center",
      cellRenderer: ({ row }) => (
        <span class="text-gray-600">
          ${row.defaultPrice} / {row.defaultTime}m
        </span>
      )
    },
    {
      label: "備註 (條件細項)",
      minWidth: 140,
      align: "left",
      cellRenderer: ({ row }) => renderConditionsPopover(row)
    },
    {
      label: "更新日",
      prop: "mTime",
      width: 110,
      align: "center",
      cellRenderer: ({ row }) => (
        <span class="text-gray-400 text-[12px]">{row.mTime.split(" ")[0]}</span>
      )
    },
    {
      label: "操作",
      fixed: "right",
      width: 110,
      align: "center",
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
      return data.name.toLowerCase().includes(search);
    });
  });

  /** 分頁後的數據 (前端分頁切割) */
  const pagedData = computed(() => {
    const { currentPage, pageSize } = pagination;
    return filteredData.value.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
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
      let filtered = [...SERVICE_ITEM_DATA];

      if (rawForm.name) {
        filtered = filtered.filter(item => item.name.includes(rawForm.name));
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

  /** 觸發抽屜 (800px) */
  function handleAction(type: string, row?: any) {
    const title = type === "add" ? "新增服務項目" : "編輯服務項目";
    const initialData = type === "edit" ? getServiceItemDetail(row.id) : null;

    addDrawer({
      title,
      size: "800px",
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(ServiceItemFormView, {
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
      return exportColumns.map(col => item[col.prop as string]);
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "服務項目庫");
    writeFile(workBook, `服務項目庫_${new Date().getTime()}.xlsx`);
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
    pagedData,
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
