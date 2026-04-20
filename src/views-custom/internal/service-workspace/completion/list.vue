<script setup lang="ts">
import { ref } from "vue";
import { useCompletion } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Search from "~icons/ri/search-line";
import Refresh from "~icons/ri/refresh-line";
import Download from "~icons/ri/download-2-line";
import ArrowDown from "~icons/ri/arrow-drop-down-line";
import CheckMark from "~icons/ri/checkbox-circle-line";

defineOptions({
  name: "CompletionList"
});

const formRef = ref();

const {
  form,
  loading,
  columns,
  filteredData,
  quickSearch,
  pagination,
  onSearch,
  resetForm,
  exportExcel,
  handleAction
} = useCompletion();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-full pl-8 pt-3! overflow-auto"
    >
      <el-form-item label="服務單號：" prop="serviceId">
        <el-input
          v-model="form.serviceId"
          placeholder="請輸入單號"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="客戶名稱：" prop="buzentityName">
        <el-input
          v-model="form.buzentityName"
          placeholder="請輸入名稱"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="結案進度：" prop="completionStatus">
        <el-select
          v-model="form.completionStatus"
          placeholder="全部狀態"
          clearable
          class="w-45!"
        >
          <el-option label="待驗收審核" value="pending_review" />
          <el-option label="已結案" value="completed" />
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

    <PureTableBar title="結案維護清單" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-input
          v-model="quickSearch"
          placeholder="快速過濾 (客戶/單號)..."
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
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :adaptiveConfig="{ offsetBottom: 108 }"
          :data="filteredData"
          :columns="dynamicColumns"
          :pagination="pagination"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="onSearch"
          @page-current-change="onSearch"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(CheckMark)"
              @click="handleAction(row)"
            >
              {{
                row.completionStatus === "completed" ? "查看紀錄" : "結案審核"
              }}
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
</style>
