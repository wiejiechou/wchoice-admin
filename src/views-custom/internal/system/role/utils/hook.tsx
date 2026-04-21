import { reactive, ref, onMounted, toRaw, h, computed } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { ROLE_DATA } from "./data";
import type { RoleSearchFormProps } from "./types";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import RoleForm from "../form.vue";

export function useRole() {
  const form = reactive<RoleSearchFormProps>({
    name: "",
    code: "",
    status: ""
  });

  const dataList = ref([]);
  const quickSearch = ref("");
  const loading = ref(true);
  const tableRef = ref();

  /** 根據右上角輸入框進行即時過濾 (Live Filter) */
  const filteredData = computed(() => {
    return dataList.value.filter(data => {
      if (!quickSearch.value) return true;
      const search = quickSearch.value.toLowerCase();
      return (
        data.name.toLowerCase().includes(search) ||
        data.code.toLowerCase().includes(search)
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
      label: "角色名稱",
      prop: "name",
      minWidth: 150
    },
    {
      label: "角色標識",
      prop: "code",
      minWidth: 150
    },
    {
      label: "狀態",
      prop: "status",
      minWidth: 90,
      cellRenderer: ({ row }) => {
        const text = row.status === 1 ? "正常" : "停用";
        const color = row.status === 1 ? "#67c23a" : "#f56c6c";
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
      label: "備註",
      prop: "remark",
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      label: "建立時間",
      prop: "createTime",
      minWidth: 160
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
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
    await delay(400);

    let filtered = [...ROLE_DATA];
    if (rawForm.name) {
      filtered = filtered.filter(item => {
        return item.name.includes(rawForm.name);
      });
    }
    if (rawForm.code) {
      filtered = filtered.filter(item => {
        return item.code.includes(rawForm.code);
      });
    }
    if (rawForm.status !== "" && rawForm.status !== undefined) {
      filtered = filtered.filter(item => {
        return item.status === Number(rawForm.status);
      });
    }

    dataList.value = filtered;
    pagination.total = filtered.length;
    loading.value = false;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  /** 跳轉至表單頁面或打開抽屜 */
  function handleAction(type: string, row?: any) {
    addDrawer({
      title: type === "add" ? "新增角色" : "編輯角色",
      // 行動端 100%，電腦端 650px
      size: window.innerWidth < 768 ? "100%" : "650px",
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(RoleForm, {
          initialData: row,
          onClose: () => closeDrawer(options, index),
          onSubmit: (data: any) => {
            console.log(`${type} Role:`, data);
            message(
              `角色「${data.name}」已${type === "add" ? "新增成功" : "更新"}`,
              {
                type: "success"
              }
            );
            closeDrawer(options, index);
            onSearch();
          }
        })
    });
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
    handleAction,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
