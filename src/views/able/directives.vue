<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";

defineOptions({
  name: "Directives"
});

const search = ref("");
const searchTwo = ref("");
const searchThree = ref("");
const searchFour = ref("");
const searchFive = ref("");
const searchSix = ref("copy");
const text = ref("可複製的文本");
const long = ref(false);
const cbText = ref("");
const idx = ref(0);

function onInput() {
  message(search.value);
}
function onInputTwo() {
  message(searchTwo.value);
}
function onInputThree({ name, sex }) {
  message(`${name}${sex}${searchThree.value}`);
}

function onInputFour() {
  message(searchFour.value);
}
function onInputFive({ name, sex }) {
  message(`${name}${sex}${searchFive.value}`);
}

function onLongpress() {
  long.value = true;
}
function onCustomLongpress() {
  long.value = true;
}
function onCbLongpress() {
  idx.value += 1;
  long.value = true;
  cbText.value = `持续回調${idx.value}次`;
}
function onReset() {
  long.value = false;
  cbText.value = "";
  idx.value = 0;
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <p class="font-medium">自定義防抖、截流、文本複製、長按指令</p>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/able/directives.vue"
          target="_blank"
        >
          程式碼位置 src/views/able/directives.vue
        </el-link>
      </div>
    </template>
    <div class="mb-2">
      防抖指令（连续輸入，只會執行第一次點選事件，立即執行）
      <el-input
        v-model="search"
        v-optimize="{
          event: 'input',
          fn: onInput,
          immediate: true,
          timeout: 1000
        }"
        class="w-50!"
        clearable
        @clear="onInput"
      />
    </div>
    <div class="mb-2">
      防抖指令（连续輸入，只會執行最后一次事件，延后執行）
      <el-input
        v-model="searchTwo"
        v-optimize="{ event: 'input', fn: onInputTwo, timeout: 400 }"
        class="w-50!"
        clearable
      />
    </div>
    <div>
      防抖指令（连续輸入，只會執行最后一次事件，延后執行，传参用法）
      <el-input
        v-model="searchThree"
        v-optimize="{
          event: 'input',
          fn: onInputThree,
          timeout: 400,
          params: { name: '小明', sex: '男' }
        }"
        class="w-50!"
        clearable
      />
    </div>

    <el-divider />

    <div class="mb-2">
      节流指令（连续輸入，每一秒只會執行一次事件）
      <el-input
        v-model="searchFour"
        v-optimize:throttle="{ event: 'input', fn: onInputFour, timeout: 1000 }"
        class="w-50!"
        clearable
      />
    </div>
    <div>
      节流指令（连续輸入，每一秒只會執行一次事件，传参用法）
      <el-input
        v-model="searchFive"
        v-optimize:throttle="{
          event: 'input',
          fn: onInputFive,
          params: { name: '小明', sex: '男' }
        }"
        class="w-50!"
        clearable
      />
    </div>

    <el-divider />

    <div class="mb-2">
      文本複製指令（双击輸入框内容即可複製）
      <el-input v-model="searchSix" v-copy="searchSix" class="w-50!" />
    </div>
    <div>
      文本複製指令（自定義触发事件，單击複製）
      <span v-copy:click="text" class="text-sky-500">{{ text }}</span>
    </div>

    <el-divider />
    <el-space wrap>
      長按指令
      <el-button v-longpress="onLongpress">長按（預設500ms）</el-button>
      <el-button v-longpress:1000="onCustomLongpress">
        自定義長按時長（1000ms）
      </el-button>
      <el-button v-longpress:2000:200="onCbLongpress">
        2秒后每200ms持续回調
      </el-button>
      <el-button @click="onReset"> 重置狀態 </el-button>
      <el-tag :type="long ? 'success' : 'info'" class="ml-2" size="large">
        {{ long ? "當前為長按狀態" : "當前非長按狀態" }}
      </el-tag>
      <el-tag v-if="cbText" type="danger" class="ml-2" size="large">
        {{ cbText }}
      </el-tag>
    </el-space>
  </el-card>
</template>
