import { reactive, ref, onMounted, toRaw, h, computed } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import { delay } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { USER_DATA } from "./data";
import type { UserSearchFormProps } from "./types";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import UserForm from "../form.vue";

export function useUser() {
  const form = reactive<UserSearchFormProps>({
    username: "",
    phone: "",
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
        data.username.toLowerCase().includes(search) ||
        data.nickname.toLowerCase().includes(search)
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
      label: "使用者帳號",
      prop: "username",
      width: 150
    },
    {
      label: "姓名",
      prop: "nickname",
      width: 120
    },
    {
      label: "性別",
      prop: "sex",
      width: 80,
      formatter: ({ sex }) => (sex === "1" ? "男" : "女")
    },
    {
      label: "手機號碼",
      prop: "phone",
      width: 140
    },
    {
      label: "歸屬部門",
      prop: "deptName",
      width: 120
    },
    {
      label: "狀態",
      prop: "status",
      width: 100,
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
      label: "建立時間",
      prop: "createTime",
      minWidth: 180
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
    // 模擬網路延遲
    await delay(400);

    let filtered = [...USER_DATA];
    if (rawForm.username) {
      filtered = filtered.filter(item => {
        return item.username.includes(rawForm.username);
      });
    }
    if (rawForm.phone) {
      filtered = filtered.filter(item => {
        return item.phone.includes(rawForm.phone);
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
      title: type === "add" ? "新增使用者" : "編輯使用者",
      size: "650px",
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(UserForm, {
          initialData: row,
          onClose: () => closeDrawer(options, index),
          onSubmit: (data: any) => {
            console.log(`${type} User:`, data);
            message(
              `使用者「${data.username}」已${type === "add" ? "註冊成功" : "更新"}`,
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

  function handleResetPassword(row: any) {
    message(`已重設使用者「${row.username}」之密碼。`, { type: "info" });
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
    handleResetPassword,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
