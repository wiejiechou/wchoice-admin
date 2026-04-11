<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

defineOptions({
  name: "picUpload"
});

const mode = "default";
// 編輯器實例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref(
  "<p>仅提供代码参考，暫不可上傳圖片，可根據实际业務改寫</p>"
);
const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "請輸入内容...", MENU_CONF: {} };

// 更多详细配置看 https://www.wangeditor.com/v5/menu-config.html#%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87
editorConfig.MENU_CONF["uploadImage"] = {
  // 服務端上傳地址，根據实际业務改寫
  server: "",
  // form-data 的 fieldName，根據实际业務改寫
  fieldName: "file",
  // 選擇文件時的類型限制，根據实际业務改寫
  allowedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  // 自定義插入圖片
  customInsert(res: any, insertFn) {
    // res.data.url是后端返回的圖片地址，根據实际业務改寫
    if (res.data.url) {
      setTimeout(() => {
        // insertFn插入圖片进編輯器
        insertFn(res.data.url);
      }, 2000);
    }
  }
};

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
