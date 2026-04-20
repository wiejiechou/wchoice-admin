<script setup lang="ts">
import { ref } from "vue";
import { useServiceOrder } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Search from "~icons/ri/search-line";
import Refresh from "~icons/ri/refresh-line";
import EditPen from "~icons/ri/edit-line";
import Download from "~icons/ri/download-2-line";
import ArrowDown from "~icons/ri/arrow-drop-down-line";
import Settings from "~icons/ri/settings-4-line";
import Printer from "~icons/ri/printer-line";
import OrderList from "~icons/ri/file-list-3-line";

defineOptions({
  name: "ServiceOrderList"
});

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
  exportExcel,
  handleAction,
  handlePrint
} = useServiceOrder();
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
      <el-form-item label="服務進度：" prop="orderStatus">
        <el-select
          v-model="form.orderStatus"
          placeholder="全部狀態"
          clearable
          class="w-45!"
        >
          <el-option label="派工中" value="pending_dispatch" />
          <el-option label="施作中" value="in_execution" />
          <el-option label="待驗收" value="pending_completion" />
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

    <PureTableBar title="服務單維護" :columns="columns" @refresh="onSearch">
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
          :pagination="pagination"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="onSearch"
          @page-current-change="onSearch"
        >
          <template #operation="{ row }">
            <!-- 維護 -->
            <el-dropdown trigger="click">
              <el-button
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
              >
                維護
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :icon="useRenderIcon(OrderList)"
                    @click="handleAction('dispatch', row)"
                  >
                    派工
                  </el-dropdown-item>
                  <el-dropdown-item
                    :icon="useRenderIcon(EditPen)"
                    @click="handleAction('execution', row)"
                  >
                    施作
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- 列印 -->
            <el-dropdown trigger="click">
              <el-button
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(Printer)"
              >
                列印
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :icon="useRenderIcon(OrderList)"
                    @click="handlePrint(row, 'dispatch')"
                  >
                    派工單
                  </el-dropdown-item>
                  <el-dropdown-item
                    :icon="useRenderIcon(EditPen)"
                    @click="handlePrint(row, 'execution')"
                  >
                    施作單
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
