<script setup lang="ts">
import { useDetail } from "./hooks";

defineOptions({
  name: "TabQueryDetail"
});

const { initToDetail, getParameter } = useDetail();
initToDetail("query");
</script>

<template>
  <div>
    {{ getParameter.id }} - 詳情頁内容在此（query传参）
    <p>當前頁面参数為：{{ getParameter }}</p>
  </div>
</template>
