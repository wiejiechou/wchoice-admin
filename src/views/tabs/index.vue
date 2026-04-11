<script setup lang="ts">
import {
  deleteChildren,
  getNodeByUniqueId,
  appendFieldByUniqueId
} from "@/utils/tree";
import { useI18n } from "vue-i18n";
import { useDetail } from "./hooks";
import { ref, computed } from "vue";
import { clone } from "@pureadmin/utils";
import { transformI18n } from "@/plugins/i18n";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { usePermissionStoreHook } from "@/store/modules/permission";

defineOptions({
  name: "Tabs"
});

const { locale } = useI18n();
const { toDetail, router } = useDetail();
const menusTree = clone(usePermissionStoreHook().wholeMenus, true);

const treeData = computed(() => {
  return appendFieldByUniqueId(deleteChildren(menusTree), 0, {
    disabled: true
  });
});

const currentValues = ref<string[]>([]);

const multiTags = computed(() => {
  return useMultiTagsStoreHook()?.multiTags;
});

const treeSelectProps = {
  label: (data: any) => transformI18n(data.meta.title),
  children: "children",
  disabled: "disabled"
};

function onCloseTags() {
  if (currentValues.value.length === 0) return;
  currentValues.value.forEach(uniqueId => {
    const currentPath =
      getNodeByUniqueId(treeData.value, uniqueId).redirect ??
      getNodeByUniqueId(treeData.value, uniqueId).path;
    useMultiTagsStoreHook().handleTags("splice", currentPath);
    if (currentPath === "/tabs/index")
      router.push({
        path: multiTags.value[(multiTags as any).value.length - 1].path
      });
  });
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="font-medium">標籤頁复用，超出限制自動關閉</div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/tabs"
        target="_blank"
      >
        程式碼位置 src/views/tabs
      </el-link>
    </template>
    <div class="flex flex-wrap items-center">
      <p>query传参模式：</p>
      <el-button
        v-for="index in 6"
        :key="index"
        class="m-2!"
        @click="toDetail({ id: index }, 'query')"
      >
        打開{{ index }}詳情頁
      </el-button>
      <el-button
        @click="
          toDetail({ id: 666, name: '小明', age: 18, job: '工程师' }, 'query')
        "
      >
        多个参数
      </el-button>
    </div>

    <el-divider />

    <div class="flex flex-wrap items-center">
      <p>params传参模式：</p>
      <el-button
        v-for="index in 6"
        :key="index"
        class="m-2!"
        @click="toDetail({ id: index }, 'params')"
      >
        打開{{ index }}詳情頁
      </el-button>
    </div>

    <el-divider />
    <el-tree-select
      :key="locale"
      v-model="currentValues"
      class="w-75!"
      node-key="uniqueId"
      placeholder="請選擇要關閉的標籤"
      clearable
      multiple
      filterable
      default-expand-all
      :props="treeSelectProps"
      :data="treeData"
    >
      <template #default="{ data }">
        <span>{{ transformI18n(data.meta.title) }}</span>
      </template>
    </el-tree-select>
    <el-button class="m-2!" @click="onCloseTags">關閉標籤</el-button>

    <el-divider />
    <el-button @click="router.push({ name: 'Menu1-2-2' })">
      跳转頁内選單（传name對象，优先推荐）
    </el-button>
    <el-button @click="router.push('/nested/menu1/menu1-2/menu1-2-2')">
      跳转頁内選單（直接传要跳转的路径）
    </el-button>
    <el-button
      @click="router.push({ path: '/nested/menu1/menu1-2/menu1-2-2' })"
    >
      跳转頁内選單（传path對象）
    </el-button>

    <el-divider />
    <el-button
      @click="
        router.push({
          name: 'Menu1-2-2',
          query: { text: '传name對象，优先推荐' }
        })
      "
    >
      携参跳转頁内選單（传name對象，优先推荐）
    </el-button>
    <el-button
      @click="
        router.push({
          path: '/nested/menu1/menu1-2/menu1-2-2',
          query: { text: '传path對象' }
        })
      "
    >
      携参跳转頁内選單（传path對象）
    </el-button>
    <el-link
      class="ml-4"
      href="https://router.vuejs.org/zh/guide/essentials/navigation.html#%E5%AF%BC%E8%88%AA%E5%88%B0%E4%B8%8D%E5%90%8C%E7%9A%84%E4%BD%8D%E7%BD%AE"
      target="_blank"
    >
      點選查看更多跳转方式
    </el-link>

    <el-divider />
    <el-button @click="router.push({ name: 'Empty' })">
      跳转無Layout的空白頁面
    </el-button>
  </el-card>
</template>
