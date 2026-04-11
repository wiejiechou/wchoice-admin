<script setup lang="ts">
import { ref } from "vue";
import intro from "intro.js";
import "intro.js/minified/introjs.min.css";

type GuideStep = {
  element: HTMLElement;
  title: string;
  intro: string;
  position: "left" | "right" | "top" | "bottom";
};

defineOptions({
  name: "Guide"
});

const GUIDE_STEPS = [
  {
    element: document.querySelector(".sidebar-logo-container"),
    title: "專案名稱與Logo",
    intro: "您可以在這裡設定專案名稱和Logo",
    position: "left"
  },
  {
    element: document.querySelector("#header-search"),
    title: "搜尋選單",
    intro: "您可以在這裡搜尋想要查看的選單",
    position: "left"
  },
  {
    element: document.querySelector("#header-translation"),
    title: "語系切換",
    intro: "您可以在這裡進行語言切換",
    position: "left"
  },
  {
    element: document.querySelector("#full-screen"),
    title: "全螢幕",
    intro: "您可以在這裡進行全螢幕切換",
    position: "left"
  },
  {
    element: document.querySelector("#header-notice"),
    title: "訊息通知",
    intro: "您可以在這裡查看管理員發送的訊息",
    position: "left"
  },
  {
    element: document.querySelector(".set-icon"),
    title: "系統配置",
    intro: "您可以在這裡查看系統配置",
    position: "left"
  },
  {
    element: document.querySelector(".tags-view"),
    title: "多標籤頁",
    intro: "這裡是您造訪過的頁面的歷史",
    position: "bottom"
  }
] as Partial<GuideStep>[];

const tourOpen = ref(false);

const onGuide = () => {
  intro()
    .setOptions({
      steps: GUIDE_STEPS
    })
    .start();
};

const onTour = () => {
  tourOpen.value = true;
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          引導頁常用於引導式介紹專案的基本功能或亮點
        </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/guide/index.vue"
        target="_blank"
      >
        程式碼位置 src/views/guide/index.vue
      </el-link>
    </template>
    <el-button @click="onGuide"> 開啟引導頁 (intro.js) </el-button>
    <el-button @click="onTour"> 開啟引導頁 (el-tour) </el-button>

    <el-tour v-model="tourOpen">
      <el-tour-step
        v-for="step in GUIDE_STEPS"
        :key="step.title"
        :target="() => step.element"
        :title="step.title"
        :description="step.intro"
        :placement="step.position"
      />
    </el-tour>
  </el-card>
</template>
