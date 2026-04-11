<script setup lang="ts">
import "deep-chat";
import { ref, onMounted } from "vue";
import hljs from "highlight.js";
// @ts-expect-error
window.hljs = hljs;

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
    :history="[
      {
        text: '```java\nwhile (i < 5) {\n console.log(&quot;hi&quot;);\n i+= 1;\n}\n```',
        role: 'ai'
      }
    ]"
    :textInput="{
      placeholder: { text: '发送消息' }
    }"
    :messageStyles="{
      default: {
        shared: {
          bubble: { maxWidth: '270px' }
        }
      }
    }"
    :demo="true"
  />
</template>
