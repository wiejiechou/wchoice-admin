<script setup lang="ts">
import { ref } from "vue";
import { useCustomer } from "./utils/hook"; // 導入客戶維護邏輯鉤子
import { PureTableBar } from "@/components/RePureTableBar"; // 導入平台封裝的表格操作條件
import { useRenderIcon } from "@/components/ReIcon/src/hooks"; // 導入圖標渲染工具

// 導入圖標
import Search from "~icons/ri/search-line";
import Refresh from "~icons/ri/refresh-line";
import AddFill from "~icons/ri/add-circle-line";
import EditPen from "~icons/ri/edit-line";
import Download from "~icons/ri/download-2-line";
import ArrowDown from "~icons/ri/arrow-drop-down-line";

// 定義組件名稱
defineOptions({
  name: "CustomerList"
});

const formRef = ref();

// 解構從 Hook 拿到的響應式變數與方法
const {
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
} = useCustomer();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-full pl-8 pt-3 overflow-auto"
    >
      <el-form-item label="統一編號：" prop="buzentityId">
        <el-input
          v-model="form.buzentityId"
          placeholder="請輸入統一編號"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="客戶名稱：" prop="buzentityName">
        <el-input
          v-model="form.buzentityName"
          placeholder="請輸入客戶名稱"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="有效狀態：" prop="isActive">
        <el-select
          v-model="form.isActive"
          placeholder="全部狀態"
          clearable
          class="w-45!"
        >
          <el-option label="有效" value="Y" />
          <el-option label="無效" value="N" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          查詢
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="客戶維護清單" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-input
          v-model="quickSearch"
          placeholder="快速過濾 (名稱/統編)..."
          clearable
          class="w-55! mr-2"
          :prefix-icon="useRenderIcon(Search)"
        />
        <el-dropdown trigger="hover">
          <el-button type="primary">
            操作
            <el-icon class="el-icon--right">
              <component :is="useRenderIcon(ArrowDown)" />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :icon="useRenderIcon(AddFill)"
                @click="handleAction('add')"
              >
                新增客戶
              </el-dropdown-item>
              <el-dropdown-item
                :icon="useRenderIcon(Download)"
                @click="exportExcel"
              >
                匯出 Excel
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :adaptiveConfig="{ offsetBottom: 108 }"
          :data="filteredData"
          :columns="dynamicColumns"
          :pagination="{ ...pagination, size }"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="handleAction('edit', row)"
            >
              編輯
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 12px;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
