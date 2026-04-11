<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";
import { ReText } from "@/components/ReText";

defineOptions({
  name: "PureText"
});

const customContent = ref("自定義tooltip内容");

const changeTooltipContent = () => {
  customContent.value =
    "現在的時間是: " + dayjs().format("YYYY-MM-DD HH:mm:ss");
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          文本省略，基于
          <el-link
            href="https://element-plus.org/zh-CN/component/text.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            el-text
          </el-link>
          和
          <el-link
            href="https://vue-tippy.netlify.app/basic-usage"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            VueTippy
          </el-link>
          自動省略后顯示 Tooltip 提示， 支持多行省略
        </span>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/text.vue"
        target="_blank"
      >
        程式碼位置 src/views/components/text.vue
      </el-link>
    </template>

    <div class="mb-2">基礎用法</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText>
            測試文本，这是一个稍微有點長的文本，過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
          <ReText :lineClamp="2">
            測試文本，这是一个稍微有點長的文本，lineClamp参数為2，即两行過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />

    <div class="mb-2">自定義 Tooltip 内容</div>
    <div class="mb-2">
      <el-button @click="changeTooltipContent">
        點選切换下方 Tooltip 内容
      </el-button>
    </div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText :tippyProps="{ content: customContent }">
            props寫法 -
            測試文本，这是一个稍微有點長的文本，過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
        </li>
        <li>
          <ReText>
            <template #content>
              <div>
                <b>这是插槽寫法: </b>
                <div>{{ customContent }}</div>
              </div>
            </template>
            插槽寫法 -
            測試文本，这是一个稍微有點長的文本，過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">自定義 el-text 配置</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText type="primary" size="large">
            測試文本，这是一个稍微有點長的文本，過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
        </li>
        <li>
          <ReText :lineClamp="4" type="info">
            測試文本，这是一个非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長的文本，lineClamp参数為4，即四行過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">自定義 VueTippy 配置</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText
            :tippyProps="{ offset: [0, -20], theme: 'light', arrow: false }"
          >
            偏移白色無箭頭 -
            測試文本，这是一个稍微有點長的文本，過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
        </li>
        <li>
          <ReText :lineClamp="4" :tippyProps="{ followCursor: true }">
            滑鼠跟随 -
            測試文本，这是一个非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長，非常非常長的文本，lineClamp参数為4，即四行過長省略后，滑鼠悬浮會有tooltip提示
          </ReText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">組件嵌套: 不需要省略的需設定 truncated 為 false</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <ReText tag="p" :lineClamp="2">
            This is a paragraph. Paragraph start
            <ReText :truncated="false">
              【 This is ReText
              <ReText tag="sup" size="small" :truncated="false">
                superscript 】
              </ReText>
            </ReText>
            <el-text>
              【 This is El-Text
              <el-text tag="sub" size="small"> subscript 】 </el-text>
            </el-text>
            <el-text tag="ins">【Inserted】</el-text>
            <el-text tag="del">【Deleted】</el-text>
            <el-text tag="mark">【Marked】</el-text>
            Paragraph end.
          </ReText>
        </li>
      </ul>
    </el-space>
  </el-card>
</template>

<style lang="scss" scoped>
.content {
  width: 400px;
  padding: 15px;
  overflow: hidden;
  resize: horizontal;
  background-color: var(--el-color-info-light-9);
  border-radius: 8px;
}
</style>
