<script setup lang="ts">
import { h } from "vue";
import hot from "@/assets/svg/hot.svg?component";
import { message, closeAllMessage } from "@/utils/message";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Check from "~icons/ep/check";

defineOptions({
  name: "Message"
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 消息提示 </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/message.vue"
        target="_blank"
      >
        程式碼位置 src/views/components/message.vue
      </el-link>
    </template>

    <h4 class="mb-4!">Element Plus 的消息提示，點選彈出提示信息</h4>

    <el-space wrap>
      <el-button
        type="info"
        @click="message('Info類型消息', { customClass: 'el' })"
      >
        Info
      </el-button>
      <el-button
        type="success"
        @click="
          message('Success類型消息', { customClass: 'el', type: 'success' })
        "
      >
        Success
      </el-button>
      <el-button
        type="warning"
        @click="
          message('Warning類型消息', { customClass: 'el', type: 'warning' })
        "
      >
        Warning
      </el-button>
      <el-button
        type="danger"
        @click="message('Error類型消息', { customClass: 'el', type: 'error' })"
      >
        Error
      </el-button>
      <el-button
        @click="message('可關閉消息', { customClass: 'el', showClose: true })"
      >
        可關閉
      </el-button>
      <el-button
        @click="
          message('分組消息合併', {
            customClass: 'el',
            type: 'success',
            grouping: true
          })
        "
      >
        分組消息合併
      </el-button>
      <el-button
        @click="
          message('自定義消息圖标', {
            customClass: 'el',
            icon: useRenderIcon(Check)
          })
        "
      >
        自定義圖标
      </el-button>
      <el-button
        @click="
          message('3秒后關閉', {
            customClass: 'el',
            duration: 3000,
            onClose: () =>
              message('消息已關閉', { customClass: 'el', type: 'success' })
          })
        "
      >
        自定義延時關閉時間并設定關閉后其他操作
      </el-button>
      <el-button
        @click="
          message(
            h('p', null, [
              h('span', null, 'Message can be '),
              h('i', { style: 'color: teal' }, 'VNode')
            ]),
            { customClass: 'el' }
          )
        "
      >
        自定義内容
      </el-button>
      <el-button
        @click="
          message('<strong>This is <i>HTML</i> string</strong>', {
            customClass: 'el',
            dangerouslyUseHTMLString: true
          })
        "
      >
        HTML 片段作為正文内容
      </el-button>
    </el-space>

    <el-divider />

    <h4 class="mb-4!">
      類似 Ant Design 風格的消息提示，點選彈出提示信息（基于 ElMessage
      樣式改版，不會影响 ElMessage
      原本樣式，使用和打包大小成本极低并适配整体暗色風格）
    </h4>

    <el-space wrap>
      <el-button type="info" @click="message('Info類型消息')">Info</el-button>
      <el-button
        type="success"
        @click="message('Success類型消息', { type: 'success' })"
      >
        Success
      </el-button>
      <el-button
        type="warning"
        @click="message('Warning類型消息', { type: 'warning' })"
      >
        Warning
      </el-button>
      <el-button
        type="danger"
        @click="message('Error類型消息', { type: 'error' })"
      >
        Error
      </el-button>
      <el-button @click="message('可關閉消息', { showClose: true })">
        可關閉
      </el-button>
      <el-button
        @click="message('分組消息合併', { type: 'success', grouping: true })"
      >
        分組消息合併
      </el-button>
      <el-button
        @click="
          message('自定義消息圖标', {
            icon: hot
          })
        "
      >
        自定義圖标
      </el-button>
      <el-button
        @click="
          message('3秒后關閉', {
            duration: 3000,
            onClose: () => message('消息已關閉', { type: 'success' })
          })
        "
      >
        自定義延時關閉時間并設定關閉后其他操作
      </el-button>
      <el-button
        @click="
          message(
            h('p', null, [
              h('span', null, 'Message can be '),
              h('i', { style: 'color: teal' }, 'VNode')
            ])
          )
        "
      >
        自定義内容
      </el-button>
      <el-button
        @click="
          message('<strong>This is <i>HTML</i> string</strong>', {
            dangerouslyUseHTMLString: true
          })
        "
      >
        HTML 片段作為正文内容
      </el-button>
    </el-space>

    <el-divider />

    <h4 class="mb-4!">
      控制消息出現的位置，消息可以顯示在窗口的頂部(預設) 或其他位置
    </h4>

    <el-space wrap>
      <el-button @click="message('頂部中间')"> 頂部中间 </el-button>
      <el-button @click="message('頂部左側', { placement: 'top-left' })">
        頂部左側
      </el-button>
      <el-button @click="message('頂部右側', { placement: 'top-right' })">
        頂部右側
      </el-button>
      <el-button @click="message('底部中间', { placement: 'bottom' })">
        底部中间
      </el-button>
      <el-button @click="message('底部左側', { placement: 'bottom-left' })">
        底部左側
      </el-button>
      <el-button @click="message('底部右側', { placement: 'bottom-right' })">
        底部右側
      </el-button>
    </el-space>

    <el-divider />

    <el-button @click="closeAllMessage"> 關閉所有消息提示 </el-button>
  </el-card>
</template>
