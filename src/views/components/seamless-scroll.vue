<script setup lang="ts">
import { ref, reactive, unref } from "vue";
import SeamlessScroll from "@/components/ReSeamlessScroll";

defineOptions({
  name: "SeamlessScroll"
});

const scroll = ref();

const listData = ref([
  {
    title: "無缝滚動第一行無缝滚動第一行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第二行無缝滚動第二行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第三行無缝滚動第三行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第四行無缝滚動第四行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第五行無缝滚動第五行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第六行無缝滚動第六行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第七行無缝滚動第七行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第八行無缝滚動第八行！！！！！！！！！！"
  },
  {
    title: "無缝滚動第九行無缝滚動第九行！！！！！！！！！！"
  }
]);

const classOption = reactive({
  direction: "top"
});

function changeDirection(val) {
  (unref(scroll) as any).reset();
  unref(classOption).direction = val;
}
</script>

<template>
  <el-space wrap>
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">無缝滚動</span>
          <el-button
            class="button"
            link
            type="primary"
            @click="changeDirection('top')"
          >
            <span
              :style="{ color: classOption.direction === 'top' ? 'red' : '' }"
            >
              向上滚動
            </span>
          </el-button>
          <el-button
            class="button"
            link
            type="primary"
            @click="changeDirection('bottom')"
          >
            <span
              :style="{
                color: classOption.direction === 'bottom' ? 'red' : ''
              }"
            >
              向下滚動
            </span>
          </el-button>
          <el-button
            class="button"
            link
            type="primary"
            @click="changeDirection('left')"
          >
            <span
              :style="{ color: classOption.direction === 'left' ? 'red' : '' }"
            >
              向左滚動
            </span>
          </el-button>
          <el-button
            class="button"
            link
            type="primary"
            @click="changeDirection('right')"
          >
            <span
              :style="{ color: classOption.direction === 'right' ? 'red' : '' }"
            >
              向右滚動
            </span>
          </el-button>
        </div>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/components/seamless-scroll.vue"
          target="_blank"
        >
          程式碼位置 src/views/components/seamless-scroll.vue
        </el-link>
      </template>
      <SeamlessScroll
        ref="scroll"
        :data="listData"
        :class-option="classOption"
        class="warp"
      >
        <ul class="item">
          <li v-for="(item, index) in listData" :key="index">
            <span class="title" v-text="item.title" />
          </li>
        </ul>
      </SeamlessScroll>
    </el-card>
  </el-space>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    margin-right: 20px;
  }
}

.warp {
  width: 360px;
  height: 270px;
  margin: 0 auto;
  overflow: hidden;

  ul {
    padding: 0;
    margin: 0 auto;
    list-style: none;

    li,
    a {
      display: flex;
      justify-content: space-between;
      height: 30px;
      font-size: 15px;
      line-height: 30px;
    }
  }
}
</style>
