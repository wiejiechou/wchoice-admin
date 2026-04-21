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

    <PureTableBar title="使用者清單" :columns="columns" @refresh="onSearch">
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
        <!-- Desktop Table View -->
        <div class="hidden md:block">
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
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden">
          <div v-if="filteredData.length > 0" class="flex flex-col gap-3">
            <el-card
              v-for="row in filteredData"
              :key="row.id"
              shadow="never"
              class="mobile-card"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-lg text-gray-800">{{
                    row.nickname
                  }}</span>
                  <el-tag
                    :type="row.status === 1 ? 'success' : 'danger'"
                    size="small"
                  >
                    {{ row.status === 1 ? "正常" : "停用" }}
                  </el-tag>
                </div>
                <el-dropdown trigger="click">
                  <el-button link :icon="useRenderIcon(ArrowDown)" />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        :icon="useRenderIcon(EditPen)"
                        @click="handleAction('edit', row)"
                        >編輯</el-dropdown-item
                      >
                      <el-dropdown-item
                        :icon="useRenderIcon(KeyIcon)"
                        @click="handleResetPassword(row)"
                        >重設密碼</el-dropdown-item
                      >
                      <el-dropdown-item
                        divided
                        class="text-red-500!"
                        :icon="useRenderIcon(DeleteIcon)"
                        @click="onSearch"
                        >刪除使用者</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              <div class="space-y-1 text-sm text-gray-500">
                <div class="flex-bc">
                  <span>帳號：</span>
                  <span class="font-mono">{{ row.username }}</span>
                </div>
                <div class="flex-bc">
                  <span>電話：</span>
                  <span>{{ row.phone || "未填寫" }}</span>
                </div>
                <div class="flex-bc">
                  <span>建立日期：</span>
                  <span>{{ row.createTime }}</span>
                </div>
              </div>
            </el-card>
            <el-pagination
              v-model:current-page="pagination.currentPage"
              v-model:page-size="pagination.pageSize"
              :total="pagination.total"
              layout="prev, pager, next"
              class="mt-4 flex-cc"
              @current-change="handleCurrentChange"
            />
          </div>
          <el-empty v-else description="暫無數據" />
        </div>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  /* 行動端適配：當寬度小於 768px 時，強制表單項目換行並佔滿寬度 */
  @media (width <= 768px) {
    padding: 16px !important;

    :deep(.el-form-item) {
      display: flex;
      width: 100%;
      margin-right: 0;

      .el-form-item__content {
        flex: 1;
      }

      .el-input,
      .el-select {
        width: 100% !important;
      }
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}

.mobile-card {
  border: 1px solid var(--el-border-color-light);
  border-radius: 12px;

  :deep(.el-card__body) {
    padding: 16px;
  }
}
</style>
