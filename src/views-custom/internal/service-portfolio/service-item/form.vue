<script setup lang="ts">
import type { ServiceForm } from "./utils/types";
import { serviceItemRules } from "./utils/rule";
import { useServiceItemForm } from "./utils/form-hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import AddIcon from "~icons/ri/add-line";
import DeleteIcon from "~icons/ri/delete-bin-line";

defineOptions({ name: "ServiceItemForm" });

const props = defineProps<{
  initialData?: ServiceForm;
  onSubmit?: (data: any) => void;
}>();

const emit = defineEmits(["close"]);

const { form, formRef, addCondition, removeCondition, submitForm } =
  useServiceItemForm(props.initialData);

/** 曝露給父組件調用驗證或獲取數據 */
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
  <div class="flex flex-col h-full overflow-hidden bg-gray-50">
    <div class="flex-1 overflow-y-auto p-6">
      <el-form
        ref="formRef"
        :model="form"
        :rules="serviceItemRules"
        label-position="top"
        class="max-w-4xl mx-auto"
      >
        <!-- 1. 基本資訊 -->
        <el-card shadow="never" class="mb-6">
          <template #header>基本資訊</template>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="項目名稱" prop="name">
                <el-input
                  v-model="form.name"
                  clearable
                  placeholder="例如：冷氣清消"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="計量單位" prop="unit">
                <el-input
                  v-model="form.unit"
                  clearable
                  placeholder="台 / 坪 / 座 / 面 / 式"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 2. 施作流程說明 (調整至第二順位) -->
        <el-card shadow="never" class="mb-6">
          <template #header>
            <div class="flex-bc">
              <span>
                施作流程說明
                <span class="text-gray-400 text-xs font-normal ml-2">
                  (標準步驟說明)
                </span>
              </span>
            </div>
          </template>
          <el-form-item prop="desc">
            <el-input
              v-model="form.desc"
              type="textarea"
              :rows="6"
              placeholder="例如：&#10;1. 清潔濾網&#10;2. 安裝濾膜&#10;3. 抗菌鍍膜"
            />
          </el-form-item>
        </el-card>

        <!-- 3. 施作條件細項 (調整至最後) -->
        <el-card shadow="never" class="mb-6">
          <template #header>
            <div class="flex-bc">
              <span>
                施作條件細項
                <span class="text-gray-400 text-xs font-normal ml-2">
                  (至少填寫 1 筆，最多 5 筆)
                </span>
              </span>
              <el-button
                type="primary"
                plain
                size="small"
                :icon="useRenderIcon(AddIcon)"
                @click="addCondition"
              >
                新增條件
              </el-button>
            </div>
          </template>

          <!-- 欄位標題與列表 -->
          <div
            class="grid grid-cols-[30px_1fr_120px_120px_50px] gap-3 mb-2 text-xs text-gray-400 px-1"
          >
            <div />
            <div>條件名稱</div>
            <div>單價 ($)</div>
            <div>時間 (min)</div>
            <div />
          </div>

          <div
            v-for="(cond, index) in form.conditions"
            :key="index"
            class="grid grid-cols-[30px_1fr_120px_120px_50px] gap-3 mb-3 items-center"
          >
            <span class="text-center text-gray-400 text-sm">
              {{ cond.label }}
            </span>
            <el-input v-model="cond.name" placeholder="例如：標準清消" />
            <el-input-number
              v-model="cond.price"
              :min="0"
              controls-position="right"
              class="w-full!"
            />
            <el-input-number
              v-model="cond.time"
              :min="0"
              controls-position="right"
              class="w-full!"
            />
            <el-button
              type="danger"
              link
              :icon="useRenderIcon(DeleteIcon)"
              :disabled="form.conditions.length <= 1"
              @click="removeCondition(index)"
            />
          </div>
        </el-card>
      </el-form>
    </div>

    <!-- Sticky Footer -->
    <div
      class="px-8 py-4 bg-white border-t border-(--el-border-color-light) flex justify-end gap-3 shrink-0 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <el-button size="large" @click="emit('close')">取消離開</el-button>
      <el-button type="primary" size="large" @click="handleSubmit">
        {{ initialData?.id ? "儲存修改" : "確認新增" }}
      </el-button>
    </div>
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
</style>
