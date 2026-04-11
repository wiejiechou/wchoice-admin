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
    auxiliaryStyle="
    .deep-chat-top-message .message-bubble {
        border-top-left-radius: 5px !important;
        border-top-right-radius: 5px !important;
    }
    .deep-chat-middle-message .message-bubble {
        margin-top: 0px;
    }
    .deep-chat-bottom-message .message-bubble {
        margin-top: 0px;
        border-bottom-left-radius: 5px !important;
        border-bottom-right-radius: 5px !important;
    }
    .deep-chat-top-message.deep-chat-bottom-message .message-bubble {
      margin-top: 10px;
    }"
    :messageStyles="{
      default: {
        shared: {
          bubble: {
            borderRadius: '0px'
          }
        }
      }
    }"
    :textInput="{
      placeholder: { text: '发送消息' }
    }"
    :history="[
      { text: '組1', role: 'group1' },
      { text: '組2-1', role: 'group2' },
      { text: '組2-2', role: 'group2' },
      { text: '組2-3', role: 'group2' },
      { text: '組3-1', role: 'group3' },
      { text: '組3-2', role: 'group3' }
    ]"
    :demo="true"
  />
</template>
