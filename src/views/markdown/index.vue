<script setup lang="ts">
import { ref } from "vue";
import Vditor from "./components/Vditor.vue";

defineOptions({
  name: "Markdown"
});

const text = ref(`
\`\`\`ts
function sayHello(): void {
\tconsole.log("Hello, World!");
}
sayHello();
\`\`\`
# 一級標題
## 二級標題
### 三級標題
#### 四級標題
##### 五級標題
###### 六級標題
`);
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          Markdown組件，採用開源的
          <el-link
            href="https://b3log.org/vditor/"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Vditor
          </el-link>
        </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/markdown"
        target="_blank"
      >
        程式碼位置 src/views/markdown
      </el-link>
    </template>
    <h1 class="mb-2!">
      双向绑定：<span class="text-red-500">{{ text }}</span>
    </h1>
    <Vditor
      v-model="text"
      :options="{
        height: 560, // 高度
        outline: { enable: true, position: 'right' } // 大纲
      }"
    />
  </el-card>
</template>
