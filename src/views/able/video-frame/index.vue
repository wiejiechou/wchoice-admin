<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { useLoader } from "@pureadmin/utils";
import { CanvasRenderer } from "./canvasRenderer";
import { ref, onMounted, onBeforeUnmount } from "vue";

defineOptions({
  name: "VideoFrame"
});

const num = 200;
const curImg = ref("");
const renderer = ref();
const captureUtil = ref();
const loading = ref(false);
const { loadScript } = useLoader();

const { VITE_PUBLIC_PATH } = import.meta.env;
const getPath = path => `${VITE_PUBLIC_PATH}wasm/${path}`;
const src = getPath("index.js");
const workerPath = getPath("capture.worker.js");
const wasmPath = getPath("capture.worker.wasm");

loadScript({
  src
}).then(mgs => {
  if (mgs[0].message === "加載成功") {
    // @ts-expect-error
    captureUtil.value = cheetahCapture.initCapture({
      workerPath,
      wasmPath
    });
  }
});

onMounted(() => {
  renderer.value = new CanvasRenderer("canvas-container");
  emitter.on("imageInfo", info => (curImg.value = info.img.src));
});

function beforeUpload(file) {
  curImg.value = "";
  loading.value = true;
  renderer.value.clearImages();
  // api参考 https://github.com/wanwu/cheetah-capture#api
  captureUtil.value.then(res => {
    res.capture({
      // 视频文件
      file,
      // 抽取指定数目的帧圖片，传递`number`是按照数目抽帧，传递数組是指定抽帧的時間，單位毫秒（抽帧策略：https://github.com/wanwu/cheetah-capture/issues/6#issuecomment-1634384486）
      info: 16,
      // 當抽帧結果變化的回調
      onChange: (list, { url }) => {
        renderer.value.addImage(url, num * list.url.length, 0, num, num);
      },
      // 當抽帧結束并成功的回調
      onSuccess: () => {
        renderer.value.addListener();
        // 預設选中第一張
        renderer.value.drawTick({ offsetX: num / 2, offsetY: num / 2 });
        loading.value = false;
      },
      // 當抽帧過程出現錯誤的回調
      onError: () => {
        loading.value = false;
      }
    });
  });

  return false;
}

onBeforeUnmount(() => {
  // 解绑`imageInfo`公共事件，防止多次触发
  emitter.off("imageInfo");
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          <p>
            基于自定義编译
            <el-link
              href="https://github.com/FFmpeg/FFmpeg"
              target="_blank"
              style="margin: 0 4px 5px; font-size: 16px"
            >
              FFmpeg
            </el-link>
            的截帧工具，支持MP4、MOV、AVI、WebM、MKV等主流格式，支持
            H.264（AVC）、H.265（HEVC）、MPEG-2、MPEG-4、VP8、VP9、WMV3编码格式
          </p>
          當然還可以支持更多视频格式，只要FFmpeg支持的，按理都能支持，您也可参考
          <el-link
            href="https://github.com/wanwu/cheetah-capture"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            cheetah-capture
          </el-link>
          和
          <el-link
            href="https://github.com/jordiwang/web-capture"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            web-capture
          </el-link>
          修改并编译wasm等文件（强烈推荐在Ubuntu系統進行编译）
          <p>
            mac系統推荐安装
            <el-link
              href="https://github.com/utmapp/UTM"
              target="_blank"
              style="margin: 0 4px 5px; font-size: 16px"
            >
              UTM
            </el-link>
            虚拟机，windows系統推荐安装VMware虚拟机
          </p>
          <p>
            當然这只是一个视频帧截取工具，如果您想要更多操作可以研究下
            <el-link
              href="https://ffmpegwasm.netlify.app/"
              target="_blank"
              style="margin: 0 4px 5px; font-size: 16px"
            >
              ffmpeg.wasm
            </el-link>
            ，它是基于 FFmpeg 的纯 WebAssembly / JavaScript
            工具，可以在瀏覽器内進行视频和音频录制、转换和流式传輸等，不過通過一些实践，對于時長較長的视频性能還是不太行，不過用于時長較短的短视频還是可以上生产的
          </p>
        </span>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/able/video-frame"
          target="_blank"
        >
          程式碼位置 src/views/able/video-frame
        </el-link>
      </div>
    </template>
    <div class="flex flex-wrap">
      <el-upload
        drag
        :show-file-list="false"
        accept=".mp4,.mov,.avi,.webm,.mkv"
        :before-upload="beforeUpload"
      >
        <div class="el-upload__text">
          可拖拽上傳视频（預設截取16張帧圖片，可在代码中自行修改）
        </div>
      </el-upload>
      <el-image
        v-if="curImg"
        :src="curImg"
        :preview-src-list="Array.of(curImg)"
        class="size-45 ml-2 rounded-md"
      />
    </div>
    <div
      id="canvas-container"
      v-loading="loading"
      element-loading-text="温馨提示：可左右拖拽圖片并單击选取所需的帧圖片"
      class="w-full h-50 overflow-hidden mt-6"
    />
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-upload-dragger) {
  display: flex;
  align-items: center;
  height: 180px;
}
</style>
