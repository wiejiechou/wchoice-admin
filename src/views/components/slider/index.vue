<script setup lang="ts">
import {
  Base,
  Step,
  Input,
  Size,
  Placement,
  Range,
  Vertical,
  Marks
} from "./components";

defineOptions({
  name: "PureSlider"
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <p class="font-medium">滑桿</p>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/slider/index.vue"
          target="_blank"
        >
          程式碼位置 src/views/components/slider/index.vue
        </el-link>
      </div>
    </template>
    <div class="mb-2">基礎用法</div>
    <Base />
    <el-divider />
    <div class="mb-2">離散值</div>
    <Step />
    <el-divider />
    <div class="mb-2">帶有輸入框的滑桿</div>
    <Input />
    <el-divider />
    <div class="mb-2">不同尺寸</div>
    <Size />
    <el-divider />
    <div class="mb-2">位置</div>
    <Placement />
    <el-divider />
    <div class="mb-2">範圍選擇</div>
    <Range />
    <el-divider />
    <div class="mb-2">垂直模式</div>
    <Vertical />
    <el-divider />
    <div class="mb-2">顯示標記</div>
    <Marks class="mb-6" />
  </el-card>
</template>
