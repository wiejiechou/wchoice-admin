<script setup lang="ts">
import { ref, reactive } from "vue";
import type { RoleFormProps } from "./utils/types";
import { formRules } from "./utils/rule";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import RoleIcon from "~icons/ri/admin-line";
import TagIcon from "~icons/ri/price-tag-3-line";

defineOptions({ name: "RoleForm" });

const props = defineProps<{
  initialData?: RoleFormProps;
  onSubmit?: (data: any) => void;
}>();

const emit = defineEmits(["close"]);

const formRef = ref();
const newFormInline = reactive<RoleFormProps>({
  name: props.initialData?.name ?? "",
  code: props.initialData?.code ?? "",
  status: props.initialData?.status ?? 1,
  remark: props.initialData?.remark ?? ""
});

/** 曝露給父組件調用驗證或獲取數據 */
function getRef() {
  return formRef.value;
}

const handleSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      if (props.onSubmit) {
        props.onSubmit(newFormInline);
      }
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
        :model="newFormInline"
        :rules="formRules"
        label-position="top"
        class="max-w-3xl mx-auto"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="角色名稱" prop="name">
              <el-input
                v-model="newFormInline.name"
                clearable
                placeholder="請輸入角色名稱"
                :prefix-icon="useRenderIcon(RoleIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="角色標識" prop="code">
              <el-input
                v-model="newFormInline.code"
                clearable
                placeholder="請輸入角色標識 (例如: admin)"
                :prefix-icon="useRenderIcon(TagIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="角色狀態">
              <el-switch
                v-model="newFormInline.status"
                :active-value="1"
                :inactive-value="0"
                active-text="啟用"
                inactive-text="停用"
                inline-prompt
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="備註內容">
              <el-input
                v-model="newFormInline.remark"
                type="textarea"
                :rows="4"
                placeholder="請輸入備註內容"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
  margin-bottom: 24px;
}
</style>
