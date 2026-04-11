<script setup lang="ts">
import { message } from "@/utils/message";
import { initRouter } from "@/router/utils";
import { storageLocal } from "@pureadmin/utils";
import { type CSSProperties, ref, computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";

defineOptions({
  name: "PermissionPage"
});

const elStyle = computed((): CSSProperties => {
  return {
    width: "85vw",
    justifyContent: "start"
  };
});

const username = ref(useUserStoreHook()?.username);

const options = [
  {
    value: "admin",
    label: "管理員角色"
  },
  {
    value: "common",
    label: "普通角色"
  }
];

function onChange() {
  useUserStoreHook()
    .loginByUsername({ username: username.value, password: "admin123" })
    .then(() => {
      storageLocal().removeItem("async-routes");
      usePermissionStoreHook().clearAllCachePage();
      initRouter();
    })
    .catch(err => {
      message(err, { type: "error" });
    });
}
</script>

<template>
  <div>
    <p class="mb-2!">
      模擬後台根據不同角色返回對應路由，觀察左側選單變化（管理員角色可查看系統管理選單、普通角色不可查看系統管理選單）
    </p>
    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">
          <span>當前角色：{{ username }}</span>
        </div>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/permission/page/index.vue"
          target="_blank"
        >
          程式碼位置 src/views/permission/page/index.vue
        </el-link>
      </template>
      <el-select v-model="username" class="w-40!" @change="onChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-card>
  </div>
</template>
