<script setup lang="ts">
import { ref, computed } from "vue";
import type { SpaceForm } from "./utils/types";
import { spaceRules } from "./utils/rule";
import { useSpaceForm } from "./utils/form-hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { MOCK_SERVICES } from "./utils/mock-services";

import BuildingIcon from "~icons/ri/building-2-line";
import CodeIcon from "~icons/ri/code-line";
import ArrowDown from "~icons/ri/arrow-down-s-line";
import AddIcon from "~icons/ri/add-circle-line";
import LinkIcon from "~icons/ri/link-m";

import ServiceSelector from "./components/service-selector.vue";

defineOptions({ name: "SpaceForm" });

const props = defineProps<{
  initialData?: SpaceForm;
  onSubmit?: (data: any) => void;
}>();

const emit = defineEmits(["close"]);

const { form, formRef, submitForm } = useSpaceForm(props.initialData);

/** 控制卡片收合狀態 (預設展開) */
const isBasicInfoExpanded = ref(true);
const isRemarkExpanded = ref(true);

/** 選擇器控制 */
const showSelector = ref(false);
const selectedServiceIds = ref<string[]>([]); // 這裡暫時用 ref 模擬，實務上應從 form.serviceIds 取得

const selectedServices = computed(() => {
  return MOCK_SERVICES.filter(s => selectedServiceIds.value.includes(s.id));
});

function toggleBasicInfo() {
  isBasicInfoExpanded.value = !isBasicInfoExpanded.value;
}

function toggleRemark() {
  isRemarkExpanded.value = !isRemarkExpanded.value;
}

function removeService(id: string) {
  selectedServiceIds.value = selectedServiceIds.value.filter(sid => sid !== id);
}

function getRef() {
  return formRef.value;
}

const handleSubmit = () => {
  submitForm(data => {
    if (props.onSubmit) {
      props.onSubmit(data);
    }
  });
};

defineExpose({ getRef });
</script>

<template>
  <div class="h-full bg-gray-50 flex flex-col overflow-hidden">
    <!-- 主內容區域 -->
    <div class="flex-1 overflow-y-auto p-6">
      <el-form
        ref="formRef"
        :model="form"
        :rules="spaceRules"
        label-position="top"
        class="max-w-4xl mx-auto"
      >
        <!-- 1. 基本資訊 -->
        <el-card shadow="never" class="mb-6 collapsible-card">
          <template #header>
            <div
              class="flex-bc cursor-pointer select-none"
              @click="toggleBasicInfo"
            >
              <div class="flex items-center gap-2">
                <span>基本資訊</span>
              </div>
              <component
                :is="useRenderIcon(ArrowDown)"
                class="transition-transform duration-300"
                :class="{ 'rotate-180': !isBasicInfoExpanded }"
              />
            </div>
          </template>
          <transition name="el-zoom-in-top">
            <div v-show="isBasicInfoExpanded">
              <el-row :gutter="24">
                <el-col :span="10">
                  <el-form-item label="區域名稱" prop="spaceName">
                    <el-input
                      v-model="form.spaceName"
                      clearable
                      placeholder="例如：美容室、會客區"
                      :prefix-icon="useRenderIcon(BuildingIcon)"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item
                    label="識別代碼 (英文大寫 + 底線)"
                    prop="spaceCode"
                  >
                    <el-input
                      v-model="form.spaceCode"
                      clearable
                      placeholder="例如：BATH_ROOM"
                      :prefix-icon="useRenderIcon(CodeIcon)"
                      :disabled="!!initialData?.spaceId"
                      class="font-mono"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="4">
                  <el-form-item label="區域狀態">
                    <el-switch
                      v-model="form.status"
                      active-value="Y"
                      inactive-value="N"
                      active-text="啟用"
                      inactive-text="停用"
                      inline-prompt
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </transition>
        </el-card>

        <!-- 2. 備註說明 -->
        <el-card shadow="never" class="mb-6 collapsible-card">
          <template #header>
            <div
              class="flex-bc cursor-pointer select-none"
              @click="toggleRemark"
            >
              <div class="flex items-center gap-2">
                <span>備註說明</span>
              </div>
              <component
                :is="useRenderIcon(ArrowDown)"
                class="transition-transform duration-300"
                :class="{ 'rotate-180': !isRemarkExpanded }"
              />
            </div>
          </template>
          <transition name="el-zoom-in-top">
            <div v-show="isRemarkExpanded">
              <el-form-item>
                <el-input
                  v-model="form.remark"
                  type="textarea"
                  :rows="6"
                  placeholder="選填：說明此區域的用途、適用服務項目或特殊注意事項"
                />
              </el-form-item>
            </div>
          </transition>
        </el-card>

        <!-- 關聯服務項目 -->
        <el-card shadow="never" class="mb-6">
          <template #header>
            <div class="flex-bc">
              <div class="flex items-center gap-2">
                <span>關聯服務項目</span>
                <el-tag v-if="selectedServices.length > 0" size="small" round>
                  {{ selectedServices.length }}
                </el-tag>
              </div>
              <el-button
                type="primary"
                plain
                size="small"
                :icon="useRenderIcon(LinkIcon)"
                @click="showSelector = true"
              >
                關聯服務
              </el-button>
            </div>
          </template>

          <div v-if="selectedServices.length > 0" class="flex flex-wrap gap-2">
            <el-tag
              v-for="service in selectedServices"
              :key="service.id"
              closable
              effect="light"
              class="service-tag"
              @close="removeService(service.id)"
            >
              {{ service.name }}
            </el-tag>
          </div>
          <div v-else class="flex flex-col items-center py-6 text-gray-400">
            <component
              :is="useRenderIcon(AddIcon)"
              class="text-3xl mb-2 opacity-20"
            />
            <p class="text-sm m-0">尚未關聯服務項目</p>
          </div>
        </el-card>
      </el-form>
    </div>

    <!-- Sticky Footer -->
    <div
      class="px-8 py-4 bg-white border-t border-(--el-border-color-light) flex justify-end gap-3 shrink-0 shadow-[0_-2px_12px_rgba(0,0,0,0.05)] z-20"
    >
      <el-button size="large" @click="emit('close')">取消離開</el-button>
      <el-button type="primary" size="large" @click="handleSubmit">
        {{ initialData?.spaceId ? "儲存修改" : "確認新增" }}
      </el-button>
    </div>

    <!-- 服務項目選擇器 (左側抽屜 LTR) -->
    <el-drawer
      v-model="showSelector"
      title="選擇服務項目"
      direction="ltr"
      size="100%"
      destroy-on-close
      :with-header="false"
      class="service-selector-drawer"
    >
      <ServiceSelector
        v-model="selectedServiceIds"
        @close="showSelector = false"
        @confirm="showSelector = false"
      />
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-bottom: 8px;
}

:deep(.el-card__header) {
  padding: 12px 20px;
  background-color: var(--el-fill-color-extra-light);
}

.collapsible-card {
  :deep(.el-card__body) {
    padding: 0;
    overflow: hidden;

    & > div {
      padding: 20px;
    }
  }
}

/* Drawer 樣式微調 */
:deep(.service-selector-drawer) {
  .el-drawer__body {
    padding: 0;
  }
}

.service-tag {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary-light-8);
  border-radius: 8px;

  :deep(.el-tag__close) {
    color: var(--el-color-primary);

    &:hover {
      color: white;
      background-color: var(--el-color-primary);
    }
  }
}
</style>
