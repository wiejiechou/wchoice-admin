<script setup lang="ts">
import { ref } from "vue";

// 声明 props 類型
export interface FormProps {
  formInline?: {
    user: string;
    region: string;
  };
}

// 声明 props 預設值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({ user: "", region: "" })
});

// vue 规定所有的 prop 都遵循着單向绑定原则，直接修改 prop 時，Vue 會抛出警告。此处的寫法仅僅是為了消除警告。
// 因為對一个 reactive 對象執行 ref，返回 Ref 對象的 value 值仍為传入的 reactive 對象，
// 即 newFormInline === props.formInline 為 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但該寫法仅适用于 props.formInline 是一个對象類型的情况，原始類型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.formInline);
</script>

<template>
  <el-form :model="newFormInline">
    <el-form-item label="姓名">
      <el-input
        v-model="newFormInline.user"
        class="w-55!"
        placeholder="請輸入姓名"
      />
    </el-form-item>
    <el-form-item label="城市">
      <el-select
        v-model="newFormInline.region"
        class="w-55!"
        placeholder="請選擇城市"
      >
        <el-option label="上海" value="上海" />
        <el-option label="浙江" value="浙江" />
        <el-option label="深圳" value="深圳" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
