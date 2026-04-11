<script setup lang="ts">
import { ref } from "vue";
// https://plus-pro-components.com/components/dialog-form.html
import "plus-pro-components/es/components/dialog-form/style/css";
import {
  type PlusColumn,
  type FieldValues,
  PlusDialogForm
} from "plus-pro-components";

const columns: PlusColumn[] = [
  {
    label: "名稱",
    width: 120,
    prop: "name",
    valueType: "copy",
    tooltip: "名稱最多顯示6个字符"
  },
  {
    label: "狀態",
    width: 120,
    prop: "status",
    valueType: "select",
    options: [
      {
        label: "未解决",
        value: "0",
        color: "red"
      },
      {
        label: "已解决",
        value: "1",
        color: "blue"
      },
      {
        label: "解决中",
        value: "2",
        color: "yellow"
      },
      {
        label: "失敗",
        value: "3",
        color: "red"
      }
    ]
  },
  {
    label: "是否顯示",
    width: 100,
    prop: "switch",
    valueType: "switch"
  },

  {
    label: "時間",
    prop: "time",
    valueType: "date-picker"
  },
  {
    label: "数量",
    prop: "number",
    valueType: "input-number",
    fieldProps: { precision: 2, step: 2 }
  },
  {
    label: "城市",
    prop: "city",
    valueType: "cascader",
    options: [
      {
        value: "0",
        label: "陕西",
        children: [
          {
            value: "0-0",
            label: "西安",
            children: [
              {
                value: "0-0-0",
                label: "新城區"
              },
              {
                value: "0-0-1",
                label: "高新區"
              },
              {
                value: "0-0-2",
                label: "灞桥區"
              }
            ]
          }
        ]
      },
      {
        value: "1",
        label: "山西",
        children: [
          {
            value: "1-0",
            label: "太原",
            children: [
              {
                value: "1-0-0",
                label: "小店區"
              },
              {
                value: "1-0-1",
                label: "古交市"
              },
              {
                value: "1-0-2",
                label: "万柏林區"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "地區",
    prop: "place",
    tooltip: "請精確到門牌号",
    fieldProps: {
      placeholder: "請精確到門牌号"
    }
  },
  {
    label: "要求",
    prop: "demand",
    valueType: "checkbox",
    options: [
      {
        label: "四六級",
        value: "0"
      },
      {
        label: "计算机二級證書",
        value: "1"
      },
      {
        label: "普通話證書",
        value: "2"
      }
    ]
  },
  {
    label: "夢想",
    prop: "gift",
    valueType: "radio",
    options: [
      {
        label: "詩",
        value: "0"
      },
      {
        label: "遠方",
        value: "1"
      },
      {
        label: "美食",
        value: "2"
      }
    ]
  },
  {
    label: "到期時間",
    prop: "endTime",
    valueType: "date-picker",
    fieldProps: {
      type: "datetimerange",
      startPlaceholder: "請選擇開始時間",
      endPlaceholder: "請選擇結束時間"
    }
  },
  {
    label: "說明",
    prop: "desc",
    valueType: "textarea",
    fieldProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 }
    }
  }
];

const visible = ref(false);
const values = ref<FieldValues>({});

const handleOpen = () => {
  visible.value = true;
};
</script>

<template>
  <div>
    <el-button @click="handleOpen">打開彈跳窗表單</el-button>
    <PlusDialogForm
      v-model:visible="visible"
      v-model="values"
      :form="{ columns }"
    />
  </div>
</template>
