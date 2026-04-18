<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import SearchIcon from "~icons/ri/search-line";
import RefreshIcon from "~icons/ri/refresh-line";
import AddFill from "~icons/ri/add-circle-line";
import EditPen from "~icons/ri/edit-line";
import DeleteIcon from "~icons/ri/delete-bin-line";
import KeyIcon from "~icons/ri/key-line";
import ArrowDown from "~icons/ep/arrow-down";

defineOptions({ name: "UserList" });

const formRef = ref();
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
  handleResetPassword,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useUser();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-full pl-8 pt-3 overflow-auto"
    >
      <el-form-item label="使用者帳號：" prop="username">
        <el-input
          v-model="form.username"
          placeholder="請輸入帳號"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="手機號碼：" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="請輸入手機號碼"
          clearable
          class="w-45!"
        />
      </el-form-item>
      <el-form-item label="狀態：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="請選擇"
          clearable
          class="w-45!"
        >
          <el-option label="正常" value="1" />
          <el-option label="停用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(SearchIcon)"
          :loading="loading"
          @click="onSearch"
        >
          查詢
        </el-button>
        <el-button
          :icon="useRenderIcon(RefreshIcon)"
          @click="resetForm(formRef)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="使用者管理" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-input
          v-model="quickSearch"
          placeholder="快速過濾 (帳號/姓名)..."
          clearable
          class="w-55! mr-2"
          :prefix-icon="useRenderIcon(SearchIcon)"
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
                新增使用者
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          row-key="id"
          adaptive
          :adaptiveConfig="{ offsetBottom: 108 }"
          align-whole="center"
          table-layout="auto"
          showOverflowTooltip
          :loading="loading"
          :size="size"
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
              :icon="useRenderIcon(KeyIcon)"
              @click="handleResetPassword(row)"
            >
              重設密碼
            </el-button>
            <el-popconfirm
              :title="`是否確認刪除使用者「${row.username}」?`"
              @confirm="onSearch"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="danger"
                  :size="size"
                  :icon="useRenderIcon(DeleteIcon)"
                >
                  刪除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
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
