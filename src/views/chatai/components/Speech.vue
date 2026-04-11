<script setup lang="ts">
import "deep-chat";
import { ref, onMounted } from "vue";

const chatRef = ref();

onMounted(() => {
  chatRef.value.demo = {
    response: message => {
      console.log(message);
      return {
        text: "僅演示，如需AI服務，請参考 https://deepchat.dev/docs/connect"
      };
    }
  };
});
</script>

<template>
  <deep-chat
    ref="chatRef"
    style="border-radius: 8px"
    :speechToText="{
      webSpeech: { language: 'zh-CN' },
      button: { position: 'outside-start' }
    }"
    :textInput="{
      placeholder: { text: '发送消息' }
    }"
    :introMessage="{
      text: '單击左下角麦克风開始转录您的讲話。'
    }"
    :demo="true"
  />
</template>
