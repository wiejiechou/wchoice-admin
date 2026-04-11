<script setup lang="ts">
import ReCol from "@/components/ReCol";
import { onBeforeUnmount, ref, shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

defineOptions({
  name: "MultiEditor"
});

// 模擬后端返回多个編輯器的數據
const endEditorList = [
  {
    value: "<p>測試一</p>"
  },
  {
    value: "<p>測試二</p>"
  },
  {
    value: "<p>測試三</p>"
  },
  {
    value: "<p>測試四</p>"
  }
];

// 多个編輯器的情况下，前端必须進行處理，满足 Toolbar 組件的 editor 属性 所需的 shallowRef 格式
const editorList = ref([]);
endEditorList.forEach(edit => {
  editorList.value.push({
    value: edit.value,
    // 編輯器實例，必须用 shallowRef
    editorRef: shallowRef()
  });
});

const mode = "default";

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "請輸入内容..." };

const handleCreated = (editor, index) => {
  // 记录 editor 實例，重要！
  editorList.value[index].editorRef = editor;
};

// 組件销毁時，也及時销毁編輯器
onBeforeUnmount(() => {
  return editorList.value.map(edit => {
    if (edit.editorRef == null) return;
    edit.editorRef.destroy();
  });
});
</script>

<template>
  <el-row :gutter="30" justify="space-around">
    <re-col v-for="(edit, index) in editorList" :key="index" :value="11">
      <div class="wangeditor">
        <Toolbar
          :editor="edit.editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
          style="border-bottom: 1px solid #ccc"
        />
        <Editor
          v-model="edit.value"
          :defaultConfig="editorConfig"
          :mode="mode"
          style="height: 300px; overflow-y: hidden"
          @onCreated="editor => handleCreated(editor, index)"
        />
      </div>
    </re-col>
  </el-row>
</template>
