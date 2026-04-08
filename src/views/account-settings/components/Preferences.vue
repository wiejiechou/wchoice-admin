<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";
import { deviceDetection } from "@pureadmin/utils";

defineOptions({
  name: "Preferences"
});

const list = ref([
  {
    title: "帳戶密碼",
    illustrate: "其他使用者的訊息將以站內信件的形式通知",
    checked: true
  },
  {
    title: "系統訊息",
    illustrate: "系統訊息將以站內信的形式通知",
    checked: true
  },
  {
    title: "待辦事項",
    illustrate: "待辦任務將以站內信的形式通知",
    checked: true
  }
]);

function onChange(val, item) {
  console.log("onChange", val);
  message(`${item.title}設定成功`, { type: "success" });
}
</script>

<template>
  <div :class="['min-w-45', deviceDetection() ? 'max-w-full' : 'max-w-[70%]']">
    <h3 class="my-8!">偏好設定</h3>
    <div v-for="(item, index) in list" :key="index">
      <div class="flex items-center">
        <div class="flex-1">
          <p>{{ item.title }}</p>
          <p class="wp-4">
            <el-text class="mx-1" type="info">
              {{ item.illustrate }}
            </el-text>
          </p>
        </div>
        <el-switch
          v-model="item.checked"
          inline-prompt
          active-text="是"
          inactive-text="否"
          @change="val => onChange(val, item)"
        />
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
