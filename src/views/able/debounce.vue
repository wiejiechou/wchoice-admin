<script setup lang="ts">
import { message } from "@/utils/message";
import { debounce, throttle } from "@pureadmin/utils";

defineOptions({
  name: "Debounce"
});

const handle = () => message("恭喜你，这是一條成功消息", { type: "success" });

const immediateDebounce = debounce(handle, 1000, true);

const debounceClick = debounce(handle, 1000);

const throttleClick = throttle(handle);
</script>

<template>
  <div>
    <el-card class="mb-5" shadow="never">
      <template #header>
        <p class="font-medium">防抖：debounce</p>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/able/debounce.vue"
          target="_blank"
        >
          程式碼位置 src/views/able/debounce.vue
        </el-link>
      </template>
      <div class="mb-5">
        所谓防抖，就是指触发事件后在 n 秒内函数只能執行一次，如果在 n
        秒内又触发了事件，则會重新计算函数執行時間。
      </div>
      <el-button @click="immediateDebounce">
        连续點選我，只會執行第一次點選事件，立即執行
      </el-button>
      <el-button @click="debounceClick">
        连续點選我，只會執行最后一次點選事件，延后執行
      </el-button>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <div class="font-medium">节流：throttle</div>
      </template>
      <div class="mb-5">
        所谓节流，就是指连续触发事件但是在 n
        秒中只執行一次函数。节流會稀释函数的執行频率。
      </div>
      <el-button @click="throttleClick">
        连续點選我，每一秒只會執行一次點選事件
      </el-button>
    </el-card>
  </div>
</template>
