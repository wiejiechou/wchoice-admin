<script setup lang="ts">
import { ref, watch } from "vue";
import type { UploadFile } from "element-plus";
import { message } from "@/utils/message";
import Plus from "~icons/ep/plus";
import View from "~icons/ri/eye-line";
import Delete from "~icons/ri/delete-bin-7-line";
import Star from "~icons/ri/star-fill";

const props = defineProps({
  modelValue: {
    type: Array as () => any[],
    default: () => []
  },
  mini: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const dialogVisible = ref(false);
const dialogImageUrl = ref("");
const uploadRef = ref();

/**
 * 本地同步累加器 (Local Synchronous Accumulator)
 *
 * 為什麼需要它？
 * - props.modelValue 是 Vue 非同步更新的（nextTick 才會反映）
 * - 批次選取 3 張照片時，handleChange 會被同步連續調用 3 次
 * - 如果每次都讀 props.modelValue，第 2、3 次讀到的仍是舊值，導致覆蓋
 * - localFiles 是 ref，push 操作是同步的，不受 props 延遲影響
 */
const localFiles = ref<any[]>([...props.modelValue]);

// 當外部 modelValue 變化時同步到本地（編輯模式回填、父層重置）
watch(
  () => props.modelValue,
  newVal => {
    localFiles.value = [...newVal];
  },
  { deep: true }
);

const handleRemove = (file: any) => {
  // 1. Guard Clause: 如果本地清單已無此檔案（可能連點導致重複呼叫），則略過
  const exists = localFiles.value.some(item => item.uid === file.uid);
  if (!exists) return;

  localFiles.value = localFiles.value.filter(item => item.uid !== file.uid);
  emit("update:modelValue", [...localFiles.value]);

  // 2. Defensive Check: 同步移除 el-upload 內部的檔案列表時，需確保列表有效
  if (uploadRef.value?.uploadFiles) {
    const internalFiles = uploadRef.value.uploadFiles;
    if (Array.isArray(internalFiles)) {
      const index = internalFiles.findIndex((f: any) => f.uid === file.uid);
      if (index !== -1) {
        internalFiles.splice(index, 1);
      }
    }
  }
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleSetCover = (targetUrl: string) => {
  localFiles.value = localFiles.value.map(item => ({
    ...item,
    is_cover: item.url === targetUrl
  }));
  emit("update:modelValue", [...localFiles.value]);
  message("封面設定成功", { type: "success" });
};

const handleChange = (uploadFile: UploadFile) => {
  // 只處理本次新加入的單一檔案，不依賴 el-upload 的歷史列表
  if (uploadFile.status !== "ready" || !uploadFile.raw) return;
  if (localFiles.value.find(item => item.uid === uploadFile.uid)) return;

  localFiles.value.push({
    uid: uploadFile.uid,
    name: uploadFile.name,
    url: URL.createObjectURL(uploadFile.raw),
    is_cover: localFiles.value.length === 0
  });

  emit("update:modelValue", [...localFiles.value]);
};
</script>

<template>
  <div class="wchoice-uploader flex flex-wrap gap-1.5 items-start">
    <!-- 展示區 -->
    <div
      v-for="(img, index) in localFiles"
      :key="img.uid || index"
      :class="[
        'image-item relative border border-gray-200 rounded overflow-hidden group transition-all hover:border-orange-300',
        props.mini ? 'size-15 ' : 'size-20 '
      ]"
    >
      <!-- 圖片本體：增加預覽點擊，提升直覺 -->
      <img
        :src="img.url"
        class="size-full object-cover cursor-pointer"
        @click="handlePictureCardPreview(img as any)"
      />

      <div
        v-if="img.is_cover"
        class="absolute top-0 left-0 bg-orange-500 text-white text-[9px] px-1 py-0.2 rounded-br z-10 scale-90 origin-top-left"
      >
        封面
      </div>

      <!-- 操作層：
           桌板 (sm:以上)：全覆蓋、Hover 顯現 (opacity-0 -> group-hover:100)
           手機 (sm:以下)：底部半透明橫條、常駐顯示 (opacity-100)
      -->
      <div
        class="absolute inset-x-0 bottom-0 sm:inset-0 bg-black/50 sm:bg-black/40 flex-ac sm:justify-center sm:gap-2 transition-opacity h-6 sm:h-full sm:opacity-0 sm:group-hover:opacity-100"
      >
        <!-- 預覽按鈕 (桌板限定) -->
        <span
          class="hidden sm:inline-flex cursor-pointer text-white hover:text-blue-200"
          @click.stop="handlePictureCardPreview(img as any)"
        >
          <el-icon :size="props.mini ? 13 : 15"><View /></el-icon>
        </span>

        <!-- 設為封面 (加大行動端點擊範圍) -->
        <span
          class="inline-flex cursor-pointer text-white hover:text-yellow-200 p-1 sm:p-0"
          @click.stop="handleSetCover(img.url)"
        >
          <el-icon :size="props.mini ? 13 : 15"><Star /></el-icon>
        </span>

        <!-- 移除照片 (加大行動端點擊範圍) -->
        <span
          class="inline-flex cursor-pointer text-white hover:text-red-200 p-1 sm:p-0"
          @click.stop="handleRemove(img as any)"
        >
          <el-icon :size="props.mini ? 13 : 15"><Delete /></el-icon>
        </span>
      </div>
    </div>

    <!-- 上傳按鈕 -->
    <el-upload
      ref="uploadRef"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange"
      multiple
      :class="[
        'wchoice-upload-trigger',
        props.mini ? 'mini-trigger' : 'standard-trigger'
      ]"
    >
      <el-icon :size="props.mini ? 14 : 20"><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible" width="50%" append-to-body>
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.wchoice-uploader {
  :deep(.el-upload--picture-card) {
    background-color: var(--el-fill-color-blank);
    border-style: dashed;
    transition: all 0.2s;

    &:hover {
      background-color: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary);
    }
  }

  .mini-trigger :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 60px;

    width: 60px;
    height: 60px;
  }

  .standard-trigger :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 80px;

    width: 80px;
    height: 80px;
  }
}
</style>
