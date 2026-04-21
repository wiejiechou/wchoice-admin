<script setup lang="ts">
import { ref } from "vue";
import { useSpace } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// 導入圖標
import Search from "~icons/ri/search-line";
import Refresh from "~icons/ri/refresh-line";
import AddFill from "~icons/ri/add-circle-line";
import EditPen from "~icons/ri/edit-line";
import ArrowDown from "~icons/ri/arrow-drop-down-line";

// 定義組件名稱
defineOptions({
  name: "SpaceList"
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
  handleAction,
  handleSizeChange,
  handleCurrentChange
} = useSpace();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-full pl-8 pt-3 overflow-auto"
    >
      <el-form-item label="區域名稱：" prop="spaceName">
        <el-input
          v-model="form.spaceName"
          placeholder="請輸入區域名稱"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="區域狀態：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="全部狀態"
          clearable
          class="w-45!"
        >
          <el-option label="啟用" value="Y" />
          <el-option label="停用" value="N" />
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

    <PureTableBar title="作業區域清單" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-input
          v-model="quickSearch"
          placeholder="快速過濾 (區域名稱/代碼)..."
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
                新增區域
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
