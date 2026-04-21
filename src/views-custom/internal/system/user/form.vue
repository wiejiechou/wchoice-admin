<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import type { UserFormProps } from "./utils/types";
import { formRules } from "./utils/rule";
import { DEPT_OPTIONS } from "./utils/data";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import UserIcon from "~icons/ri/user-3-line";
import LockIcon from "~icons/ri/lock-password-line";
import DeviceIcon from "~icons/ri/smartphone-line";
import MailIcon from "~icons/ri/mail-line";

defineOptions({ name: "UserForm" });

const props = defineProps<{
  initialData?: UserFormProps;
  onSubmit?: (data: any) => void;
}>();

const emit = defineEmits(["close"]);

const formRef = ref();
const newFormInline = reactive<UserFormProps>({
  username: props.initialData?.username ?? "",
  nickname: props.initialData?.nickname ?? "",
  password: props.initialData?.password ?? "",
  phone: props.initialData?.phone ?? "",
  email: props.initialData?.email ?? "",
  sex: props.initialData?.sex ?? "1",
  deptId: props.initialData?.deptId ?? "",
  status: props.initialData?.status ?? 1,
  remark: props.initialData?.remark ?? ""
});

/** 曝露給父組件調用驗證或獲取數據 */
function getRef() {
  return formRef.value;
}

const handleSubmit = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      if (props.onSubmit) {
        props.onSubmit(newFormInline);
      }
    } else {
      // 獲取第一個校驗失敗的欄位名
      const firstField = Object.keys(fields)[0];
      if (firstField) {
        // 捲動到該欄位
        formRef.value.scrollToField(firstField);

        // 強制聚焦 (Focus)
        // 透過查詢 DOM 找到對應的 input 或 textarea
        // el-form-item 通常會帶有對應的 class 或屬性
        nextTick(() => {
          const el = formRef.value.$el.querySelector(
            `[prop="${firstField}"] input, [prop="${firstField}"] textarea`
          );
          if (el) {
            el.focus();
          } else {
            // 備選方案：如果上述選擇器沒抓到，嘗試找通用 input
            const fallbackEl = document.getElementsByName(firstField)[0];
            fallbackEl?.focus();
          }
        });
      }
    }
  });
};

defineExpose({ getRef });
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scrollbar-thin">
      <el-form
        ref="formRef"
        :model="newFormInline"
        :rules="formRules"
        label-position="top"
        class="max-w-3xl mx-auto"
      >
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12">
            <el-form-item label="使用者帳號" prop="username">
              <el-input
                v-model="newFormInline.username"
                clearable
                placeholder="請輸入帳號"
                :disabled="!!initialData?.id"
                :prefix-icon="useRenderIcon(UserIcon)"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="姓名" prop="nickname">
              <el-input
                v-model="newFormInline.nickname"
                clearable
                placeholder="請輸入姓名"
              />
            </el-form-item>
          </el-col>

          <el-col v-if="!initialData?.id" :xs="24" :sm="12">
            <el-form-item label="登入密碼" prop="password">
              <el-input
                v-model="newFormInline.password"
                clearable
                show-password
                placeholder="請輸入密碼"
                :prefix-icon="useRenderIcon(LockIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="手機號碼" prop="phone">
              <el-input
                v-model="newFormInline.phone"
                clearable
                placeholder="請輸入手機號碼"
                :prefix-icon="useRenderIcon(DeviceIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="電子信箱" prop="email">
              <el-input
                v-model="newFormInline.email"
                clearable
                placeholder="請輸入電子信箱"
                :prefix-icon="useRenderIcon(MailIcon)"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="性別">
              <el-radio-group v-model="newFormInline.sex" class="w-full">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="0">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="歸屬部門">
              <el-select
                v-model="newFormInline.deptId"
                placeholder="請選擇部門"
                class="w-full"
                clearable
              >
                <el-option
                  v-for="item in DEPT_OPTIONS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item label="帳號狀態">
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
      class="p-4 sm:px-8 bg-white border-t border-(--el-border-color-light) flex-c gap-3 shrink-0 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <el-button
        class="flex-1 sm:flex-none sm:w-32"
        size="large"
        @click="emit('close')"
      >
        取消離開
      </el-button>
      <el-button
        class="flex-1 sm:flex-none sm:w-32 ml-0!"
        type="primary"
        size="large"
        @click="handleSubmit"
      >
        {{ initialData?.id ? "儲存修改" : "確認新增" }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-bottom: 24px;

  @media (width <= 640px) {
    margin-bottom: 16px;
  }
}

/* 針對行動端垂直捲軸優化 */
.scrollbar-thin {
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 10px;
  }
}
</style>
