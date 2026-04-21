<script setup lang="ts">
import { ref, computed } from "vue";
import { MOCK_SERVICES, type MockServiceItem } from "../utils/mock-services";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import SearchIcon from "~icons/ri/search-line";
import CheckIcon from "~icons/ri/check-line";
import CloseIcon from "~icons/ri/close-line";

const props = defineProps<{
  modelValue: string[]; // 已選 ID 列表
}>();

const emit = defineEmits(["update:modelValue", "close", "confirm"]);

const searchQuery = ref("");
const selectedIds = ref<string[]>([...props.modelValue]);

// 過濾後的項目
const filteredServices = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return MOCK_SERVICES;
  return MOCK_SERVICES.filter(
    s =>
      s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query)
  );
});

function toggleSelect(id: string) {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
}

function handleConfirm() {
  emit("update:modelValue", selectedIds.value);
  emit("confirm", selectedIds.value);
}
</script>

<template>
  <div
    class="service-selector-overlay flex flex-col h-full bg-white shadow-2xl"
  >
    <!-- Header -->
    <div
      class="px-6 py-4 border-b border-gray-100 flex-bc bg-white sticky top-0 z-10"
    >
      <div class="flex items-center gap-3">
        <h3 class="text-lg font-bold text-gray-800 m-0">關聯服務項目</h3>
        <el-tag round type="info" size="small" effect="plain">
          已選 {{ selectedIds.length }} 項
        </el-tag>
      </div>
      <div class="flex items-center gap-2">
        <el-button
          link
          :icon="useRenderIcon(CloseIcon)"
          @click="emit('close')"
        />
      </div>
    </div>

    <!-- Search Bar -->
    <div class="p-4 bg-gray-50/50">
      <el-input
        v-model="searchQuery"
        placeholder="搜尋項目名稱或編號..."
        clearable
        :prefix-icon="useRenderIcon(SearchIcon)"
        class="search-input"
      />
    </div>

    <!-- Content Area (RWD) -->
    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <!-- Desktop Table (Visible on md and up) -->
      <div class="hidden md:block">
        <el-table
          :data="filteredServices"
          style="width: 100%"
          row-class-name="cursor-pointer transition-all"
          @row-click="row => toggleSelect(row.id)"
        >
          <el-table-column width="50">
            <template #default="{ row }">
              <el-checkbox
                :model-value="selectedIds.includes(row.id)"
                @change="() => toggleSelect(row.id)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="服務名稱" />
          <el-table-column prop="unit" label="單位" width="80" align="center" />
          <el-table-column
            prop="defaultPrice"
            label="預設單價"
            width="100"
            align="right"
          >
            <template #default="{ row }">
              <span class="text-orange-500 font-mono"
                >${{ row.defaultPrice }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- Mobile Card List (Visible on sm and down) -->
      <div class="md:hidden flex flex-col gap-3">
        <div
          v-for="item in filteredServices"
          :key="item.id"
          class="service-card p-4 rounded-xl border-2 transition-all active:scale-[0.98]"
          :class="[
            selectedIds.includes(item.id)
              ? 'border-primary bg-primary/5 shadow-md'
              : 'border-gray-100 bg-white'
          ]"
          @click="toggleSelect(item.id)"
        >
          <div class="flex justify-between items-start mb-2">
            <span class="font-bold text-gray-800">{{ item.name }}</span>
            <div
              class="size-6 rounded-full border flex-cc transition-all"
              :class="[
                selectedIds.includes(item.id)
                  ? 'bg-primary border-primary color-white'
                  : 'bg-white border-gray-300'
              ]"
            >
              <component
                :is="useRenderIcon(CheckIcon)"
                v-if="selectedIds.includes(item.id)"
              />
            </div>
          </div>
          <div class="flex-bc text-sm">
            <span class="text-gray-400">{{ item.desc }}</span>
            <span class="text-orange-500 font-bold"
              >${{ item.defaultPrice }} / {{ item.unit }}</span
            >
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredServices.length === 0"
        class="py-20 flex-cc flex-col text-gray-400"
      >
        <el-empty description="找不到相符的項目" />
      </div>
    </div>

    <!-- Sticky Action Footer -->
    <div class="p-4 border-t border-gray-100 flex gap-3 bg-white">
      <el-button class="flex-1" size="large" @click="emit('close')"
        >取消</el-button
      >
      <el-button
        class="flex-1"
        type="primary"
        size="large"
        @click="handleConfirm"
      >
        確認關聯 ({{ selectedIds.length }})
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-selector-overlay {
  animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.search-input {
  :deep(.el-input__wrapper) {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    box-shadow: none !important;
    transition: all 0.3s;

    &.is-focus {
      background: white;
      border-color: var(--el-color-primary);
    }
  }
}

.service-card {
  user-select: none;
}

/* 讓表格 Row 在 Hover 時更有質感 */
:deep(.el-table__row) {
  &:hover {
    td.el-table__cell {
      background-color: var(--el-color-primary-light-9) !important;
    }
  }
}

.custom-scrollbar {
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 10px;
  }
}
</style>
