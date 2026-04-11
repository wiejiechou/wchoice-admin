<script setup lang="tsx">
import { ref } from "vue";
import "vue-json-pretty/lib/styles.css";
import VueJsonPretty from "vue-json-pretty";

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const columns = [
  {
    label: "IP 地址",
    prop: "ip"
  },
  {
    label: "地點",
    prop: "address"
  },
  {
    label: "操作系統",
    prop: "system"
  },
  {
    label: "瀏覽器類型",
    prop: "browser"
  },
  {
    label: "所属模組",
    prop: "module"
  },
  {
    label: "請求時間",
    prop: "requestTime"
  },
  {
    label: "請求方法",
    prop: "method"
  },
  {
    label: "請求耗時",
    prop: "takesTime"
  },
  {
    label: "請求接口",
    prop: "url",
    copy: true
  },
  {
    label: "TraceId",
    prop: "traceId",
    copy: true
  }
];

const dataList = ref([
  {
    title: "响应頭",
    name: "responseHeaders",
    data: (props.data[0] as any).responseHeaders
  },
  {
    title: "响应体",
    name: "responseBody",
    data: (props.data[0] as any).responseBody
  },
  {
    title: "請求頭",
    name: "requestHeaders",
    data: (props.data[0] as any).requestHeaders
  },
  {
    title: "請求体",
    name: "requestBody",
    data: (props.data[0] as any).requestBody
  }
]);
</script>

<template>
  <div>
    <el-scrollbar>
      <PureDescriptions border :data="data" :columns="columns" :column="5" />
    </el-scrollbar>
    <el-tabs :modelValue="'responseBody'" type="border-card" class="mt-4">
      <el-tab-pane
        v-for="(item, index) in dataList"
        :key="index"
        :name="item.name"
        :label="item.title"
      >
        <el-scrollbar max-height="calc(100vh - 240px)">
          <vue-json-pretty v-model:data="item.data" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
