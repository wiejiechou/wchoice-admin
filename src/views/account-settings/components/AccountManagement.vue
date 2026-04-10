<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";
import { deviceDetection } from "@pureadmin/utils";

defineOptions({
  name: "AccountManagement"
});

const list = ref([
  {
    title: "帳戶密碼",
    illustrate: "目前密碼強度：強",
    button: "修改"
  },
  {
    title: "密保手機",
    illustrate: "已經綁定手機：0988***789",
    button: "修改"
  },
  {
    title: "密保問題",
    illustrate: "未設定密保問題，密保問題可有效保護帳戶安全",
    button: "修改"
  },
  {
    title: "備用信箱",
    illustrate: "已綁定信箱：pure***@wang-choice.com",
    button: "修改"
  }
]);

function onClick(item) {
  console.log("onClick", item.title);
  message("請依照特定業務自行實作", { type: "success" });
}
</script>

<template>
  <div :class="['min-w-45', deviceDetection() ? 'max-w-full' : 'max-w-[70%]']">
    <h3 class="my-8!">帳戶管理</h3>
    <div v-for="(item, index) in list" :key="index">
      <div class="flex items-center">
        <div class="flex-1">
          <p>{{ item.title }}</p>
          <el-text class="mx-1" type="info">{{ item.illustrate }}</el-text>
        </div>
        <el-button type="primary" text @click="onClick(item)">
          {{ item.button }}
        </el-button>
      </div>
      <el-divider />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-divider--horizontal {
  border-top: 0.1px var(--el-border-color) var(--el-border-style);
}
</style>
