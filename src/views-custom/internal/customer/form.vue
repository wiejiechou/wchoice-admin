<script setup lang="ts">
import { ref } from "vue";
import type { CustomerForm } from "./utils/types";
import { customerRules } from "./utils/rule";
import { useCustomerForm } from "./utils/form-hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import BuildingIcon from "~icons/ri/building-2-line";
import UserIcon from "~icons/ri/user-3-line";
import PhoneIcon from "~icons/ri/phone-line";
import MapPinIcon from "~icons/ri/map-pin-line";

defineOptions({ name: "CustomerForm" });

const props = defineProps<{
  initialData?: CustomerForm;
  onSubmit?: (data: any) => void;
}>();

const emit = defineEmits(["close"]);

// 使用業務邏輯 Hook
const { form, formRef, submitForm } = useCustomerForm(props.initialData);

/** 曝露給父組件調用驗證或獲取數據 (保持與母版一致的介面) */
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
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex-1 overflow-y-auto px-4 py-6">
      <el-form
        ref="formRef"
        :model="form"
        :rules="customerRules"
        label-position="top"
        class="max-w-3xl mx-auto"
      >
        <el-row :gutter="24">
          <!-- 基礎身分資訊 -->
          <el-col :span="12">
            <el-form-item label="統一編號" prop="buzentityId">
              <el-input
                v-model="form.buzentityId"
                clearable
                placeholder="請輸入 8 位統一編號"
                :prefix-icon="useRenderIcon(BuildingIcon)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="營運單位名稱" prop="buzentityName">
              <el-input
                v-model="form.buzentityName"
                clearable
                placeholder="請輸入單位名稱"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="單位地址" prop="buzentityAddr">
              <el-input
                v-model="form.buzentityAddr"
                clearable
                placeholder="請輸入詳細地址"
                :prefix-icon="useRenderIcon(MapPinIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="負責人" prop="headerName">
              <el-input
                v-model="form.headerName"
                clearable
                placeholder="請輸入負責人姓名"
                :prefix-icon="useRenderIcon(UserIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="聯絡人" prop="contactName">
              <el-input
                v-model="form.contactName"
                clearable
                placeholder="請輸入業務聯絡人"
                :prefix-icon="useRenderIcon(UserIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="聯絡電話" prop="contactInfo">
              <el-input
                v-model="form.contactInfo"
                clearable
                placeholder="請輸入聯絡電話 / 方式"
                :prefix-icon="useRenderIcon(PhoneIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="有效狀態">
              <el-switch
                v-model="form.isActive"
                active-value="Y"
                inactive-value="N"
                active-text="有效"
                inactive-text="停用"
                inline-prompt
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="備註內容">
              <el-input
                v-model="form.remark"
                type="textarea"
                :rows="4"
                placeholder="請輸入備註內容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- Sticky Footer (對齊母版風格) -->
    <div
      class="px-8 py-4 bg-white border-t border-(--el-border-color-light) flex justify-end gap-3 shrink-0 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <el-button size="large" @click="emit('close')">取消離開</el-button>
      <el-button type="primary" size="large" @click="handleSubmit">
        {{ initialData?.buzentityUId ? "儲存修改" : "確認新增" }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-bottom: 24px;
}
</style>
