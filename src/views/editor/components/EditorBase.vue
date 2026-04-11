<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";

defineOptions({
  name: "BaseEditor"
});

const mode = "default";
// 編輯器實例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>你好</p>");

// 模擬 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>我是模擬的异步數據</p>";
  }, 1500);
});

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "請輸入内容..." };

const handleCreated = editor => {
  // 记录 editor 實例，重要！
  editorRef.value = editor;
};

// 組件销毁時，也及時销毁編輯器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <div class="wangeditor">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      style="height: 500px; overflow-y: hidden"
      @onCreated="handleCreated"
    />
  </div>
</template>
