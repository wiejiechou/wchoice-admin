<script setup lang="ts">
import { hasPerms } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";

const { permissions } = useUserStoreHook();

defineOptions({
  name: "PermissionButtonLogin"
});
</script>

<template>
  <div>
    <p class="mb-2!">當前擁有的code列表：{{ permissions }}</p>
    <p v-show="permissions?.[0] === '*:*:*'" class="mb-2!">
      *:*:* 代表擁有全部按鈕級别權限
    </p>

    <el-card shadow="never" class="mb-2">
      <template #header>
        <div class="card-header">組件方式判断權限</div>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/permission/button/perms.vue"
          target="_blank"
        >
          程式碼位置 src/views/permission/button/perms.vue
        </el-link>
      </template>
      <el-space wrap>
        <Perms value="permission:btn:add">
          <el-button plain type="warning">
            擁有code：'permission:btn:add' 權限可見
          </el-button>
        </Perms>
        <Perms :value="['permission:btn:edit']">
          <el-button plain type="primary">
            擁有code：['permission:btn:edit'] 權限可見
          </el-button>
        </Perms>
        <Perms
          :value="[
            'permission:btn:add',
            'permission:btn:edit',
            'permission:btn:delete'
          ]"
        >
          <el-button plain type="danger">
            擁有code：['permission:btn:add', 'permission:btn:edit',
            'permission:btn:delete'] 權限可見
          </el-button>
        </Perms>
      </el-space>
    </el-card>

    <el-card shadow="never" class="mb-2">
      <template #header>
        <div class="card-header">函数方式判断權限</div>
      </template>
      <el-space wrap>
        <el-button v-if="hasPerms('permission:btn:add')" plain type="warning">
          擁有code：'permission:btn:add' 權限可見
        </el-button>
        <el-button
          v-if="hasPerms(['permission:btn:edit'])"
          plain
          type="primary"
        >
          擁有code：['permission:btn:edit'] 權限可見
        </el-button>
        <el-button
          v-if="
            hasPerms([
              'permission:btn:add',
              'permission:btn:edit',
              'permission:btn:delete'
            ])
          "
          plain
          type="danger"
        >
          擁有code：['permission:btn:add', 'permission:btn:edit',
          'permission:btn:delete'] 權限可見
        </el-button>
      </el-space>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          指令方式判断權限（該方式不能動態修改權限）
        </div>
      </template>
      <el-space wrap>
        <el-button v-perms="'permission:btn:add'" plain type="warning">
          擁有code：'permission:btn:add' 權限可見
        </el-button>
        <el-button v-perms="['permission:btn:edit']" plain type="primary">
          擁有code：['permission:btn:edit'] 權限可見
        </el-button>
        <el-button
          v-perms="[
            'permission:btn:add',
            'permission:btn:edit',
            'permission:btn:delete'
          ]"
          plain
          type="danger"
        >
          擁有code：['permission:btn:add', 'permission:btn:edit',
          'permission:btn:delete'] 權限可見
        </el-button>
      </el-space>
    </el-card>
  </div>
</template>
