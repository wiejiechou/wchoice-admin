<script setup lang="ts">
import { ref } from "vue";
import { useQuotation } from "./utils/hook"; // 導入自定義邏輯鉤子
import { PureTableBar } from "@/components/RePureTableBar"; // 導入平台封裝的表格操作條件
import { useRenderIcon } from "@/components/ReIcon/src/hooks"; // 導入圖標渲染工具

// 導入圖標 (使用 unplugin-icons)
import Search from "~icons/ep/search";
import Refresh from "~icons/ep/refresh";
import AddFill from "~icons/ri/add-circle-line";
import EditPen from "~icons/ep/edit-pen";
import View from "~icons/ep/view";
import Download from "~icons/ep/download";
import ArrowDown from "~icons/ep/arrow-down";

// 定義組件名稱 (用於頁面快取或 DevTools 調試)
defineOptions({
  name: "QuotationList"
});

const formRef = ref();

// 解構從 Hook 拿到的響應式變數與方法
const {
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
} = useQuotation();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-full pl-8 pt-3 overflow-auto"
    >
      <el-form-item label="客戶名稱：" prop="client">
        <el-input
          v-model="form.client"
          placeholder="請輸入客戶名稱"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="服務地址：" prop="address">
        <el-input
          v-model="form.address"
          placeholder="請輸入服務地址"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="報價狀態：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="全部狀態"
          clearable
          class="w-45!"
        >
          <el-option label="報價中" value="pending" />
          <el-option label="報價成立" value="approved" />
          <el-option label="報價不成立" value="rejected" />
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

    <PureTableBar title="報價單維護" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-input
          v-model="quickSearch"
          placeholder="清單快速過濾 (客戶/編號)..."
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
                建立報價單
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
          @selection-change="handleSelectionChange"
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
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(View)"
              @click="handleAction('view', row)"
            >
              報價進度
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
