<script setup lang="tsx">
import {
  addDrawer,
  closeDrawer,
  closeAllDrawer,
  updateDrawer
} from "@/components/ReDrawer/index";
import { cloneDeep, debounce } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { createVNode, h, ref } from "vue";
import formPrimitive from "./formPrimitive.vue";
import forms, { type FormProps } from "./form.vue";

function onBaseClick() {
  addDrawer({
    title: "基礎用法",
    contentRenderer: () => <p>抽屉内容-基礎用法</p> // jsx 语法 （注意在.vue文件啟用jsx语法，需要在script開啟lang="tsx"）
  });
}

function onModalClick() {
  addDrawer({
    title: "無背景遮罩層",
    modal: false,
    contentRenderer: () => <p>抽屉内容-無背景遮罩層</p>
  });
}

// 添加 600ms 防抖
const onoOpenDelayClick = debounce(
  () =>
    addDrawer({
      title: "延時2秒打開抽屉",
      openDelay: 2000 - 600,
      contentRenderer: () => <p>抽屉内容-延時2秒打開抽屉</p>
    }),
  600
);

function onCloseDelayClick() {
  addDrawer({
    title: "延時2秒關閉抽屉",
    closeDelay: 2000,
    contentRenderer: () => <p>抽屉内容-延時2秒關閉抽屉</p>
  });
}

function onShowCloseClick() {
  addDrawer({
    title: "不顯示右上角關閉按鈕圖标",
    showClose: false,
    contentRenderer: () => <p>抽屉内容-不顯示右上角關閉按鈕圖标</p>
  });
}

function onBeforeCloseClick() {
  addDrawer({
    title: "禁止通過鍵盤ESC關閉",
    closeOnPressEscape: false,
    contentRenderer: () => <p>抽屉内容-禁止通過鍵盤ESC關閉</p>
  });
}

function onCloseOnClickModalClick() {
  addDrawer({
    title: "禁止通過點選modal關閉",
    closeOnClickModal: false,
    contentRenderer: () => <p>抽屉内容-禁止通過點選modal關閉</p>
  });
}

function onHideFooterClick() {
  addDrawer({
    title: "隱藏底部取消、確定按鈕",
    hideFooter: true,
    contentRenderer: () => <p>抽屉内容-隱藏底部取消、確定按鈕</p>
  });
}

function onHeaderRendererClick() {
  addDrawer({
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
    contentRenderer: () => <p>抽屉内容-自定義頭部</p>
  });
}

function onFooterRendererClick() {
  addDrawer({
    title: "自定義底部",
    footerRenderer: ({ options, index }) => (
      <el-button onClick={() => closeDrawer(options, index)}>
        {options.title}-{index}
      </el-button>
    ),
    contentRenderer: () => <p>抽屉内容-自定義底部</p>
  });
}

function onFooterButtonsClick() {
  addDrawer({
    title: "自定義底部按鈕",
    footerButtons: [
      {
        label: "按鈕1",
        size: "small",
        type: "success",
        btnClick: ({ drawer: { options, index }, button }) => {
          console.log(options, index, button);
          closeDrawer(options, index);
        }
      },
      {
        label: "按鈕2",
        text: true,
        bg: true,
        btnClick: ({ drawer: { options, index }, button }) => {
          console.log(options, index, button);
          closeDrawer(options, index);
        }
      },
      {
        label: "按鈕3",
        size: "large",
        type: "warning",
        btnClick: ({ drawer: { options, index }, button }) => {
          console.log(options, index, button);
          closeDrawer(options, index);
        }
      }
    ],
    contentRenderer: () => <p>抽屉内容-自定義底部按鈕</p>
  });
}

function onOpenClick() {
  addDrawer({
    title: "打開后的回調",
    open: ({ options, index }) => message({ options, index } as any),
    contentRenderer: () => <p>抽屉内容-打開后的回調</p>
  });
}

function onCloseCallBackClick() {
  addDrawer({
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
    contentRenderer: () => <p>抽屉内容-關閉后的回調</p>
  });
}

// 这里為了演示方便，使用了嵌套寫法，实际情况下最好把 addDrawer 函数抽出来 套娃不可取
function onNestingClick() {
  addDrawer({
    title: "嵌套的抽屉",
    size: "50%",
    contentRenderer: ({ index }) => (
      <el-button
        onClick={() =>
          addDrawer({
            title: `第${index + 1}个子抽屉`,
            size: "40%",
            contentRenderer: ({ index }) => (
              <el-button
                onClick={() =>
                  addDrawer({
                    title: `第${index + 1}个子抽屉`,
                    size: "30%",
                    contentRenderer: () => (
                      <>
                        <el-button round onClick={() => closeAllDrawer()}>
                          哎呦，你干嘛，赶快關閉所有抽屉
                        </el-button>
                      </>
                    )
                  })
                }
              >
                點選打開第{index + 1}个子抽屉
              </el-button>
            )
          })
        }
      >
        點選打開第{index + 1}个子抽屉
      </el-button>
    )
  });
}

// 满足在 contentRenderer 内容區更改抽屉自身属性值的场景
function onUpdateClick() {
  const curPage = ref(1);
  addDrawer({
    title: `第${curPage.value}頁`,
    contentRenderer: () => (
      <>
        <el-button
          disabled={curPage.value <= 1}
          onClick={() => {
            curPage.value -= 1;
            updateDrawer(`第${curPage.value}頁`);
          }}
        >
          上一頁
        </el-button>
        <el-button
          onClick={() => {
            curPage.value += 1;
            updateDrawer(`第${curPage.value}頁`);
          }}
        >
          下一頁
        </el-button>
      </>
    )
  });
}

// Popconfirm 確認框
function onPopConfirmClick() {
  addDrawer({
    size: "30%",
    title: "Popconfirm確認框示例",
    popConfirm: { title: "是否確認修改當前數據" },
    contentRenderer: () => <p>點選右下方確定按鈕看看效果吧</p>
  });
}

// 結合Form表單（第一種方式，抽屉關閉立刻恢复初始值）通過 props 属性接收子組件的 prop 并赋值
function onFormOneClick() {
  addDrawer({
    size: "30%",
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
  addDrawer({
    size: "30%",
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
  addDrawer({
    size: "30%",
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
  addDrawer({
    size: "30%",
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
  addDrawer({
    size: "30%",
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
  addDrawer({
    title: "點選底部取消按鈕的回調",
    contentRenderer: () => (
      <p>抽屉内容-點選底部取消按鈕的回調（會暫停抽屉的關閉）</p>
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
  addDrawer({
    title: "點選底部確定按鈕的回調",
    contentRenderer: () => (
      <p>
        抽屉内容-點選底部確定按鈕的回調（會暫停抽屉的關閉，經常用于新增、修改抽屉内容后調用接口）
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
  addDrawer({
    sureBtnLoading: true,
    title: "點選底部確定按鈕可開啟按鈕動畫",
    contentRenderer: () => <p>抽屉内容-點選底部確定按鈕可開啟按鈕動畫</p>,
    beforeSure: (done, { closeLoading }) => {
      // closeLoading(); // 關閉確定按鈕動畫，不關閉抽屉
      // done() // 關閉確定按鈕動畫并關閉抽屉
      setTimeout(() => done(), 800);
    }
  });
}

function onResizableClick(title, content, direction) {
  addDrawer({
    title,
    direction,
    resizable: true, // 啟用可調整大小的功能
    contentRenderer: () => (
      <p class="text-(--el-color-primary)">{content}</p> // jsx 语法 （注意在.vue文件啟用jsx语法，需要在script開啟lang="tsx"）
    )
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
            href="https://element-plus.org/zh-CN/component/drawer.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Drawer
          </el-link>
        </span>
      </div>
      <el-link
        href="https://github.com/pure-admin/vue-pure-admin/tree/main/src/views/components/drawer"
        target="_blank"
      >
        程式碼位置 src/views/components/drawer
      </el-link>
    </template>
    <el-space wrap>
      <el-button @click="onBaseClick">基礎用法</el-button>
      <el-button @click="onModalClick"> 無背景遮罩層 </el-button>
      <el-button @click="onoOpenDelayClick"> 延時2秒打開抽屉 </el-button>
      <el-button @click="onCloseDelayClick"> 延時2秒關閉抽屉 </el-button>
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
      <el-button @click="onNestingClick"> 嵌套的抽屉 </el-button>
      <el-button @click="onUpdateClick"> 更改抽屉自身属性值 </el-button>
      <el-button @click="onPopConfirmClick">Popconfirm確認框</el-button>
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
        點選底部取消按鈕的回調（會暫停抽屉的關閉）
      </el-button>
      <el-button @click="onBeforeSureClick">
        點選底部確定按鈕的回調（會暫停抽屉的關閉，經常用于新增、修改抽屉内容后調用接口）
      </el-button>
      <el-button @click="onSureBtnLoading">
        點選底部確定按鈕可開啟按鈕動畫
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button
        @click="onResizableClick('从左側打開', '拖動抽屉右側边缘', 'ltr')"
      >
        拖拽調整大小（从左側打開）
      </el-button>
      <el-button
        @click="onResizableClick('从右側打開', '拖動抽屉左側边缘', 'rtl')"
      >
        拖拽調整大小（从右側打開）
      </el-button>
      <el-button
        @click="onResizableClick('从頂部打開', '拖動抽屉底部边缘', 'ttb')"
      >
        拖拽調整大小（从頂部打開）
      </el-button>
      <el-button
        @click="onResizableClick('从底部打開', '拖動抽屉頂部边缘', 'btt')"
      >
        拖拽調整大小（从底部打開）
      </el-button>
    </el-space>
  </el-card>
</template>
