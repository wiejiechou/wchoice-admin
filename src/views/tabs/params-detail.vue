<script setup lang="ts">
import { useDetail } from "./hooks";

defineOptions({
  name: "TabParamsDetail"
});

const { initToDetail, getParameter } = useDetail();
initToDetail("params");
</script>

<template>
  <div>
    {{ getParameter.id }} - 詳情頁内容在此（params传参）
    <p>當前頁面参数為：{{ getParameter }}</p>
  </div>
</template>
