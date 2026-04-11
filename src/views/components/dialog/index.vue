<script setup lang="tsx">
import { useRouter } from "vue-router";
import { h, createVNode, ref } from "vue";
import { message } from "@/utils/message";
import formPrimitive from "./formPrimitive.vue";
import forms, { type FormProps } from "./form.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import {
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
} from "@/components/ReDialog";

defineOptions({
  name: "DialogPage"
});

const router = useRouter();

function onBaseClick() {
  addDialog({
    title: "基礎用法",
    contentRenderer: () => <p>彈框内容-基礎用法</p> // jsx 语法 （注意在.vue文件啟用jsx语法，需要在script開啟lang="tsx"）
  });
}

function onDraggableClick() {
  addDialog({
    title: "可拖拽",
    draggable: true,
    contentRenderer: () => h("p", "彈框内容-可拖拽") // h 渲染函数 https://cn.vuejs.org/api/render-function.html#h
  });
}

function onFullscreenClick() {
  addDialog({
    title: "全屏",
    fullscreen: true,
    contentRenderer: () => createVNode("p", null, "彈框内容-全屏") // createVNode 渲染函数 https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes
  });
}

function onFullscreenIconClick() {
  addDialog({
    title: "全屏按鈕和全屏事件",
    fullscreenIcon: true,
    fullscreenCallBack: ({ options, index }) =>
      message(options.fullscreen ? "全屏" : "非全屏"),
    contentRenderer: () => <p>彈框内容-全屏按鈕和全屏事件</p>
  });
}

function onModalClick() {
  addDialog({
    title: "無背景遮罩層",
    modal: false,
    contentRenderer: () => <p>彈框内容-無背景遮罩層</p>
  });
}

function onStyleClick() {
  addDialog({
    title: "自定義彈出位置",
    top: "60vh",
    style: { marginRight: "20px" },
    contentRenderer: () => <p>彈框内容-自定義彈出位置</p>
  });
}

// 添加 600ms 防抖
const onoOpenDelayClick = debounce(
  () =>
    addDialog({
      title: "延時2秒打開彈框",
      openDelay: 2000 - 600,
      contentRenderer: () => <p>彈框内容-延時2秒打開彈框</p>
    }),
  600
);

function onCloseDelayClick() {
  addDialog({
    title: "延時2秒關閉彈框",
    closeDelay: 2000,
    contentRenderer: () => <p>彈框内容-延時2秒關閉彈框</p>
  });
}

function onShowCloseClick() {
  addDialog({
    title: "不顯示右上角關閉按鈕圖标",
    showClose: false,
    contentRenderer: () => <p>彈框内容-不顯示右上角關閉按鈕圖标</p>
  });
}

function onBeforeCloseClick() {
  addDialog({
    title: "禁止通過鍵盤ESC關閉",
    closeOnPressEscape: false,
    contentRenderer: () => <p>彈框内容-禁止通過鍵盤ESC關閉</p>
  });
}

function onCloseOnClickModalClick() {
  addDialog({
    title: "禁止通過點選modal關閉",
    closeOnClickModal: false,
    contentRenderer: () => <p>彈框内容-禁止通過點選modal關閉</p>
  });
}

function onHideFooterClick() {
  addDialog({
    title: "隱藏底部取消、確定按鈕",
    hideFooter: true,
    contentRenderer: () => <p>彈框内容-隱藏底部取消、確定按鈕</p>
  });
}

function onHeaderRendererClick() {
  addDialog({
    title: "自定義頭部",
    showClose: false,
    headerRenderer: ({ close, titleId, titleClass }) => (
      // jsx 语法
      <div class="flex flex-row justify-between">
        <h4 id={titleId} class={titleClass}>
          自定義頭部
        </h4>
        <el-button type="danger" onClick={() => close()}>
          關閉
        </el-button>
      </div>
    ),
    contentRenderer: () => <p>彈框内容-自定義頭部</p>
  });
}

function onFooterRendererClick() {
  addDialog({
    title: "自定義底部",
    footerRenderer: ({ options, index }) => (
      <el-button onClick={() => closeDialog(options, index)}>
        {options.title}-{index}
      </el-button>
    ),
    contentRenderer: () => <p>彈框内容-自定義底部</p>
  });
}

function onFooterButtonsClick() {
  addDialog({
    title: "自定義底部按鈕",
    footerButtons: [
      {
        label: "按鈕1",
        size: "small",
        type: "success",
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      },
      {
        label: "按鈕2",
        text: true,
        bg: true,
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      },
      {
        label: "按鈕3",
        size: "large",
        type: "warning",
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      }
    ],
    contentRenderer: () => <p>彈框内容-自定義底部按鈕</p>
  });
}

function onOpenClick() {
  addDialog({
    title: "打開后的回調",
    open: ({ options, index }) => message({ options, index } as any),
    contentRenderer: () => <p>彈框内容-打開后的回調</p>
  });
}

function onCloseCallBackClick() {
  addDialog({
    title: "關閉后的回調",
    closeCallBack: ({ options, index, args }) => {
      console.log(options, index, args);
      let text = "";
      if (args?.command === "cancel") {
        text = "您點選了取消按鈕";
      } else if (args?.command === "sure") {
        text = "您點選了確定按鈕";
      } else {
        text = "您點選了右上角關閉按鈕或空白頁或按下了esc鍵";
      }
      message(text);
    },
    contentRenderer: () => <p>彈框内容-關閉后的回調</p>
  });
}

// 这里為了演示方便，使用了嵌套寫法，实际情况下最好把 addDialog 函数抽出来 套娃不可取
function onNestingClick() {
  addDialog({
    title: "嵌套的彈框",
    contentRenderer: ({ index }) => (
      <el-button
        onClick={() =>
          addDialog({
            title: `第${index + 1}个子彈框`,
            width: "40%",
            contentRenderer: ({ index }) => (
              <el-button
                onClick={() =>
                  addDialog({
                    title: `第${index + 1}个子彈框`,
                    width: "30%",
                    contentRenderer: () => (
                      <>
                        <el-button round onClick={() => closeAllDialog()}>
                          哎呦，你干嘛，赶快關閉所有彈框
                        </el-button>
                      </>
                    )
                  })
                }
              >
                點選打開第{index + 1}个子彈框
              </el-button>
            )
          })
        }
      >
        點選打開第{index + 1}个子彈框
      </el-button>
    )
  });
}

// 满足在 contentRenderer 内容區更改彈框自身属性值的场景
function onUpdateClick() {
  const curPage = ref(1);
  addDialog({
    title: `第${curPage.value}頁`,
    contentRenderer: () => (
      <>
        <el-button
          disabled={curPage.value > 1 ? false : true}
          onClick={() => {
            curPage.value -= 1;
            updateDialog(`第${curPage.value}頁`);
          }}
        >
          上一頁
        </el-button>
        <el-button
          onClick={() => {
            curPage.value += 1;
            updateDialog(`第${curPage.value}頁`);
          }}
        >
          下一頁
        </el-button>
      </>
    )
  });
}

// Popconfirm 確認框
function onPopconfirmClick() {
  addDialog({
    width: "30%",
    title: "Popconfirm確認框示例",
    popconfirm: { title: "是否確認修改當前數據" },
    contentRenderer: () => <p>點選右下方確定按鈕看看效果吧</p>
  });
}

// 結合Form表單（第一種方式，彈框關閉立刻恢复初始值）通過 props 属性接收子組件的 prop 并赋值
function onFormOneClick() {
  addDialog({
    width: "30%",
    title: "結合Form表單（第一種方式）",
    contentRenderer: () => forms,
    props: {
      // 赋預設值
      formInline: {
        user: "程肖宇",
        region: "浙江"
      }
    },
    closeCallBack: ({ options, args }) => {
      // options.props 是响应式的
      const { formInline } = options.props as FormProps;
      const text = `姓名：${formInline.user} 城市：${formInline.region}`;
      if (args?.command === "cancel") {
        // 您點選了取消按鈕
        message(`您點選了取消按鈕，當前表單數據為 ${text}`);
      } else if (args?.command === "sure") {
        message(`您點選了確定按鈕，當前表單數據為 ${text}`);
      } else {
        message(
          `您點選了右上角關閉按鈕或空白頁或按下了esc鍵，當前表單數據為 ${text}`
        );
      }
    }
  });
}

// 結合Form表單（第二種方式）h 渲染函数 https://cn.vuejs.org/api/render-function.html#h
const formInline = ref({
  user: "程肖宇",
  region: "浙江"
});
const resetFormInline = cloneDeep(formInline.value);
function onFormTwoClick() {
  addDialog({
    width: "30%",
    title: "結合Form表單（第二種方式）",
    contentRenderer: () =>
      h(forms, {
        formInline: formInline.value
      }),
    closeCallBack: () => {
      message(
        `當前表單數據為 姓名：${formInline.value.user} 城市：${formInline.value.region}`
      );
      // 重置表單數據
      formInline.value = cloneDeep(resetFormInline);
    }
  });
}

// 結合Form表單（第三種方式）createVNode 渲染函数 https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes
const formThreeInline = ref({
  user: "程肖宇",
  region: "浙江"
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);
function onFormThreeClick() {
  addDialog({
    width: "30%",
    title: "結合Form表單（第三種方式）",
    contentRenderer: () =>
      createVNode(forms, {
        formInline: formThreeInline.value
      }),
    closeCallBack: () => {
      message(
        `當前表單數據為 姓名：${formThreeInline.value.user} 城市：${formThreeInline.value.region}`
      );
      // 重置表單數據
      formThreeInline.value = cloneDeep(resetFormThreeInline);
    }
  });
}

// 結合Form表單（第四種方式）使用jsx语法
// 需要注意的是如果 forms 没註冊，这里 forms 註冊了是因為上面 contentRenderer: () => forms、h(forms) 、createVNode(createVNode) 间接给註冊了
// 如果只使用了jsx语法，如下 `contentRenderer: () => <forms formInline={formFourInline.value} />` 是不會给 forms 組件進行註冊的，需要在 `script` 中任意位置（最好是末尾）寫上 forms 即可
// 同理如果在 tsx 文件中，这么使用 `contentRenderer: () => <forms formInline={formFourInline.value} />`，也是不會给 forms 組件進行註冊，需要在 return 中寫上 forms
const formFourInline = ref({
  user: "程肖宇",
  region: "浙江"
});
const resetFormFourInline = cloneDeep(formFourInline.value);
function onFormFourClick() {
  addDialog({
    width: "30%",
    title: "結合Form表單（第四種方式）",
    contentRenderer: () => <forms formInline={formFourInline.value} />,
    closeCallBack: () => {
      message(
        `當前表單數據為 姓名：${formFourInline.value.user} 城市：${formFourInline.value.region}`
      );
      // 重置表單數據
      formFourInline.value = cloneDeep(resetFormFourInline);
    }
  });
}

// 子組件 prop 為 primitive 類型的 demo
const formPrimitiveParam = ref("Hello World");
const resetFormPrimitiveParam = ref(formPrimitiveParam.value);
function onFormPrimitiveFormClick() {
  addDialog({
    width: "30%",
    title: "子組件 prop 為 primitive 類型 demo",
    contentRenderer: () =>
      h(formPrimitive, {
        data: formPrimitiveParam.value,
        "onUpdate:data": val => (formPrimitiveParam.value = val)
      }),
    closeCallBack: () => {
      message(`當前表單内容：${formPrimitiveParam.value}`);
      // 重置表單數據
      formPrimitiveParam.value = resetFormPrimitiveParam.value;
    }
  });
}

function onBeforeCancelClick() {
  addDialog({
    title: "點選底部取消按鈕的回調",
    contentRenderer: () => (
      <p>彈框内容-點選底部取消按鈕的回調（會暫停彈框的關閉）</p>
    ),
    beforeCancel: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // 需要關閉把注释解開即可
    }
  });
}

function onBeforeSureClick() {
  addDialog({
    title: "點選底部確定按鈕的回調",
    contentRenderer: () => (
      <p>
        彈框内容-點選底部確定按鈕的回調（會暫停彈框的關閉，經常用于新增、修改彈框内容后調用接口）
      </p>
    ),
    beforeSure: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // 需要關閉把注释解開即可
    }
  });
}

function onSureBtnLoading() {
  addDialog({
    sureBtnLoading: true,
    title: "點選底部確定按鈕可開啟按鈕動畫",
    contentRenderer: () => <p>彈框内容-點選底部確定按鈕可開啟按鈕動畫</p>,
    beforeSure: (done, { closeLoading }) => {
      // closeLoading() // 關閉確定按鈕動畫，不關閉彈框
      // done() // 關閉確定按鈕動畫并關閉彈框
      setTimeout(() => done(), 800);
    }
  });
}

// 自定義動畫
function onTransitionClick(title, transition) {
  addDialog({
    width: "30%",
    title,
    transition,
    contentRenderer: () => <p>{JSON.stringify(transition)}</p>
  });
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          二次封装 Element Plus 的
          <el-link
            href="https://element-plus.org/zh-CN/component/dialog.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Dialog
          </el-link>
          ，採用函数式調用彈框組件（更多操作實例請参考
          <span
            class="cursor-pointer text-primary"
            @click="router.push({ name: 'SystemDept' })"
          >
            系統管理頁面
          </span>
          ）
        </span>
      </div>
      <el-link
        href="https://github.com/pure-admin/vue-pure-admin/tree/main/src/views/components/dialog"
        target="_blank"
      >
        程式碼位置 src/views/components/dialog
      </el-link>
    </template>
    <el-space wrap>
      <el-button @click="onBaseClick"> 基礎用法 </el-button>
      <el-button @click="onDraggableClick"> 可拖拽 </el-button>
      <el-button @click="onFullscreenClick"> 全屏 </el-button>
      <el-button @click="onFullscreenIconClick"> 全屏按鈕和全屏事件 </el-button>
      <el-button @click="onModalClick"> 無背景遮罩層 </el-button>
      <el-button @click="onStyleClick"> 自定義彈出位置 </el-button>
      <el-button @click="onoOpenDelayClick"> 延時2秒打開彈框 </el-button>
      <el-button @click="onCloseDelayClick"> 延時2秒關閉彈框 </el-button>
      <el-button @click="onShowCloseClick">
        不顯示右上角關閉按鈕圖标
      </el-button>
      <el-button @click="onBeforeCloseClick"> 禁止通過鍵盤ESC關閉 </el-button>
      <el-button @click="onCloseOnClickModalClick">
        禁止通過點選modal關閉
      </el-button>
      <el-button @click="onHideFooterClick"> 隱藏底部取消、確定按鈕 </el-button>
      <el-button @click="onHeaderRendererClick"> 自定義頭部 </el-button>
      <el-button @click="onFooterRendererClick"> 自定義底部 </el-button>
      <el-button @click="onFooterButtonsClick"> 自定義底部按鈕 </el-button>
      <el-button @click="onOpenClick"> 打開后的回調 </el-button>
      <el-button @click="onCloseCallBackClick"> 關閉后的回調 </el-button>
      <el-button @click="onNestingClick"> 嵌套的彈框 </el-button>
      <el-button @click="onUpdateClick"> 更改彈框自身属性值 </el-button>
      <el-button @click="onPopconfirmClick">Popconfirm確認框</el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onFormOneClick">
        結合Form表單（第一種方式）
      </el-button>
      <el-button @click="onFormTwoClick">
        結合Form表單（第二種方式）
      </el-button>
      <el-button @click="onFormThreeClick">
        結合Form表單（第三種方式）
      </el-button>
      <el-button @click="onFormFourClick">
        結合Form表單（第四種方式）
      </el-button>
      <el-button @click="onFormPrimitiveFormClick">
        子組件 prop 為 primitive 類型
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onBeforeCancelClick">
        點選底部取消按鈕的回調（會暫停彈框的關閉）
      </el-button>
      <el-button @click="onBeforeSureClick">
        點選底部確定按鈕的回調（會暫停彈框的關閉，經常用于新增、修改彈框内容后調用接口）
      </el-button>
      <el-button @click="onSureBtnLoading">
        點選底部確定按鈕可開啟按鈕動畫
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button
        @click="onTransitionClick('淡入淡出動畫（預設）', 'dialog-fade')"
      >
        淡入淡出動畫（預設）
      </el-button>
      <el-button @click="onTransitionClick('縮放動畫', 'dialog-scale')">
        縮放動畫
      </el-button>
      <el-button @click="onTransitionClick('滑動動畫', 'dialog-slide')">
        滑動動畫
      </el-button>
      <el-button @click="onTransitionClick('彈跳動畫', 'dialog-bounce')">
        彈跳動畫
      </el-button>
      <el-button
        @click="
          onTransitionClick('自定義動畫事件處理器（可配置對象）', {
            name: 'dialog-custom-object',
            appear: true,
            mode: 'out-in',
            duration: 500
          })
        "
      >
        自定義動畫事件處理器（可配置對象）
      </el-button>
    </el-space>
  </el-card>
</template>

<style>
/* Scale Animation */
.dialog-scale-enter-active,
.dialog-scale-leave-active,
.dialog-scale-enter-active .el-dialog,
.dialog-scale-leave-active .el-dialog {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dialog-scale-enter-from,
.dialog-scale-leave-to {
  opacity: 0;
}

.dialog-scale-enter-from .el-dialog,
.dialog-scale-leave-to .el-dialog {
  opacity: 0;
  transform: scale(0.5);
}

/* Slide Animation */
.dialog-slide-enter-active,
.dialog-slide-leave-active,
.dialog-slide-enter-active .el-dialog,
.dialog-slide-leave-active .el-dialog {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dialog-slide-enter-from,
.dialog-slide-leave-to {
  opacity: 0;
}

.dialog-slide-enter-from .el-dialog,
.dialog-slide-leave-to .el-dialog {
  opacity: 0;
  transform: translateY(-100px);
}

/* Bounce Animation */
.dialog-bounce-enter-active,
.dialog-bounce-leave-active,
.dialog-bounce-enter-active .el-dialog,
.dialog-bounce-leave-active .el-dialog {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dialog-bounce-enter-from,
.dialog-bounce-leave-to {
  opacity: 0;
}

.dialog-bounce-enter-from .el-dialog,
.dialog-bounce-leave-to .el-dialog {
  opacity: 0;
  transform: scale(0.3) translateY(-50px);
}

/* Object Configuration Animation */
.dialog-custom-object-enter-active,
.dialog-custom-object-leave-active,
.dialog-custom-object-enter-active .el-dialog,
.dialog-custom-object-leave-active .el-dialog {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dialog-custom-object-enter-from,
.dialog-custom-object-leave-to {
  opacity: 0;
}

.dialog-custom-object-enter-from .el-dialog,
.dialog-custom-object-leave-to .el-dialog {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}
</style>
