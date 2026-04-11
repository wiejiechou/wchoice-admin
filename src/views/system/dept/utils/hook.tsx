import dayjs from "dayjs";
import editForm from "../form.vue";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { getDeptList } from "@/api/system";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h } from "vue";
import type { FormItemProps } from "../utils/types";
import { cloneDeep, isAllEmpty, deviceDetection } from "@pureadmin/utils";

export function useDept() {
  const form = reactive({
    name: "",
    status: null
  });

  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const { tagStyle } = usePublicHooks();

  const columns: TableColumnList = [
    {
      label: "部門名稱",
      prop: "name",
      width: 180,
      align: "left"
    },
    {
      label: "排序",
      prop: "sort",
      minWidth: 70
    },
    {
      label: "狀態",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status === 1 ? "啟用" : "停用"}
        </el-tag>
      )
    },
    {
      label: "建立時間",
      minWidth: 200,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "備註",
      prop: "remark",
      minWidth: 320
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { code, data } = await getDeptList(); // 这里是返回一维数組結构，前端自行處理成树結构，返回格式要求：唯一id加父节點parentId，parentId取父节點id
    if (code === 0) {
      let newData = data;
      if (!isAllEmpty(form.name)) {
        // 前端搜索部門名稱
        newData = newData.filter(item => item.name.includes(form.name));
      }
      if (!isAllEmpty(form.status)) {
        // 前端搜索狀態
        newData = newData.filter(item => item.status === form.status);
      }
      dataList.value = handleTree(newData); // 處理成树結构
    }

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function formatHigherDeptOptions(treeList) {
    // 根據返回數據的status字段值判断追加是否禁用disabled字段，返回處理后的树結构，用于上級部門級联選擇器的展示（实际開发中也是如此，不可能前端需要的每个字段后端都會返回，这時需要前端自行根據后端返回的某些字段做逻辑處理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}部門`,
      props: {
        formInline: {
          higherDeptOptions: formatHigherDeptOptions(cloneDeep(dataList.value)),
          parentId: row?.parentId ?? 0,
          name: row?.name ?? "",
          principal: row?.principal ?? "",
          phone: row?.phone ?? "",
          email: row?.email ?? "",
          sort: row?.sort ?? 0,
          status: row?.status ?? 1,
          remark: row?.remark ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了部門名稱為${curData.name}的这條數據`, {
            type: "success"
          });
          done(); // 關閉彈框
          onSearch(); // 刷新表格數據
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表單规则校驗通過
            if (title === "新增") {
              // 实际開发先調用新增接口，再進行下面操作
              chores();
            } else {
              // 实际開发先調用修改接口，再進行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  function handleDelete(row) {
    message(`您删除了部門名稱為${row.name}的这條數據`, { type: "success" });
    onSearch();
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、修改部門 */
    openDialog,
    /** 删除部門 */
    handleDelete,
    handleSelectionChange
  };
}
