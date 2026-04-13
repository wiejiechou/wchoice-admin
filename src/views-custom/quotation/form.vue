<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    code: "",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="角色名稱" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="請輸入角色名稱"
      />
    </el-form-item>

    <el-form-item label="角色識別" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="請輸入角色識別"
      />
    </el-form-item>

    <el-form-item label="備註">
      <el-input
        v-model="newFormInline.remark"
        placeholder="請輸入備註信息"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
