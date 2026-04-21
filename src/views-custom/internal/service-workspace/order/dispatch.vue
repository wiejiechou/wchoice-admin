<script setup lang="ts">
import { useServiceOrderForm } from "./utils/form-hook";
import type { ServiceOrderItem, ServiceOrderForm } from "./utils/types";
import ArrowDown from "~icons/ep/arrow-down";
import Delete from "~icons/ep/delete";

defineOptions({ name: "ServiceOrderDispatch" });

const props = defineProps<{
  initialOrder: ServiceOrderItem;
  onSubmit?: (data: any) => void;
}>();

const emit = defineEmits(["close", "success"]);

/**
 * 數據映射：將 ServiceOrderItem 轉換為表單結構
 * 註：實務上 regions 應由後端返回，此處先以映射基礎資訊為主
 */
const initialData: Partial<ServiceOrderForm> = {
  clientName: props.initialOrder.buzentityName,
  contactPerson: props.initialOrder.contactName,
  contactPhone: props.initialOrder.contactInfo,
  clientAddress: props.initialOrder.buzentityAddr,
  salesName: props.initialOrder.salesName,
  salesPhone: props.initialOrder.salesContactInfo
};

const { form, submitForm } = useServiceOrderForm(initialData);

function addStaff() {
  form.staffList.push({ name: "", notes: "" });
}

function removeStaff(index: number) {
  if (form.staffList.length > 1) {
    form.staffList.splice(index, 1);
  } else {
    form.staffList[0] = { name: "", notes: "" };
  }
}

function addTimelineNode() {
  form.timeline.push({
    name: "",
    timeWindow: "",
    duration: 0,
    actualTime: "",
    notes: ""
  });
}

function removeTimelineNode(index: number) {
  if (form.timeline.length > 1) {
    form.timeline.splice(index, 1);
  }
}

/** 自動計算預計分鐘數 */
function calculateDuration(node: any) {
  const timeRegex = /(\d{1,2}):(\d{2})\s?~\s?(\d{1,2}):(\d{2})/;
  const match = node.timeWindow.match(timeRegex);
  if (match) {
    const startH = parseInt(match[1]);
    const startM = parseInt(match[2]);
    const endH = parseInt(match[3]);
    const endM = parseInt(match[4]);

    let diff = endH * 60 + endM - (startH * 60 + startM);
    if (diff < 0) diff += 1440; // 跨夜處理
    node.duration = diff;
  }
}

const handleSubmit = (isDraft: boolean) => {
  const result = submitForm(isDraft);
  if (result) {
    import("@/utils/message").then(({ message }) => {
      message(isDraft ? "派工草稿已儲存" : "派工安排已確認", {
        type: "success"
      });
      if (props.onSubmit) {
        props.onSubmit({ ...result, isDraft });
      }
      // 觸發成功事件以重新查詢清單，然後關閉抽屜
      emit("success");
      emit("close");
    });
  }
};
</script>

<template>
  <div>
    <!-- Section A: 基本資訊 -->
    <el-row :gutter="16" class="mb-4">
      <!-- 左：客戶資訊 -->
      <el-col :md="14" :xs="24">
        <el-card shadow="never" class="mb-4 md:mb-0">
          <template #header>案場基礎資訊 (唯讀)</template>
          <el-form :model="form" label-position="top">
            <el-row :gutter="16">
              <el-col :span="8">
                <el-form-item label="客戶名稱">
                  <el-input
                    v-model="form.clientName"
                    placeholder="客戶名稱"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="聯絡人">
                  <el-input
                    v-model="form.contactPerson"
                    placeholder="聯絡窗口"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="聯絡電話">
                  <el-input
                    v-model="form.contactPhone"
                    placeholder="電話"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="服務地址">
                  <el-input
                    v-model="form.clientAddress"
                    placeholder="完整施作地址"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="計畫施作日">
                  <el-date-picker
                    v-model="form.expiryDate"
                    type="date"
                    class="w-full!"
                    placeholder="選擇日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="車程 (來回 mins)">
                  <el-input
                    v-model="form.executionPriority"
                    placeholder="60"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="施作順序">
                  <el-input
                    v-model="form.executionPriority"
                    placeholder="例：美容區 > 會客區"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="重點施作備註">
                  <el-input
                    v-model="form.executionNotes"
                    placeholder="現場注意事項…"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

      <!-- 右：人員與工具確認 -->
      <el-col :md="10" :xs="24">
        <el-card shadow="never" class="h-full">
          <template #header>
            <div class="flex-bc">
              <span>人員與工具確認</span>
              <el-button
                type="primary"
                size="small"
                plain
                class="border-dashed!"
                @click="addStaff"
              >
                + 新增人員
              </el-button>
            </div>
          </template>
          <el-form :model="form" label-position="top">
            <!-- 施工人員清單 -->
            <div
              v-for="(staff, index) in form.staffList"
              :key="index"
              class="flex items-start gap-2 mb-3"
            >
              <el-form-item
                :label="index === 0 ? '施工人員' : ''"
                class="flex-1 mb-0!"
              >
                <el-input v-model="staff.name" placeholder="姓名 / 職稱" />
              </el-form-item>
              <el-form-item
                :label="index === 0 ? '工具/備註' : ''"
                class="flex-2 mb-0!"
              >
                <el-input
                  v-model="staff.notes"
                  placeholder="應攜帶工具或負責範圍"
                />
              </el-form-item>
              <div :class="[index === 0 ? 'pt-8' : '']">
                <el-button
                  link
                  type="danger"
                  class="mt-1"
                  @click="removeStaff(index)"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>

            <el-divider border-style="dashed" class="my-4!" />

            <el-form-item label="客戶產品與預設配置">
              <el-input
                v-model="form.defaultEquipment"
                type="textarea"
                :rows="2"
                placeholder="例如：72Hr 5L x1, 藍色抹布組..."
              />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!-- Section B: 專業施工 (PHASE 3) -->
    <el-card shadow="never">
      <template #header>
        <div class="flex-bc">
          <div class="flex items-center gap-2">
            <span>專業施工</span>
            <el-tag type="info" size="small" effect="plain" round
              >動態時間軸</el-tag
            >
          </div>
          <el-button
            type="primary"
            size="small"
            plain
            class="border-dashed!"
            @click="addTimelineNode"
          >
            + 新增施作節點
          </el-button>
        </div>
      </template>

      <!-- 施工時間軸表格 -->
      <div
        class="border border-(--el-border-color-lighter) rounded-sm overflow-hidden"
      >
        <table class="w-full border-collapse text-sm">
          <thead
            class="bg-(--el-fill-color-light) text-(--el-text-color-secondary)"
          >
            <tr>
              <th
                class="p-3 text-left border-b border-(--el-border-color-lighter) font-medium w-60"
              >
                施作區塊 / 項目
              </th>
              <th
                class="p-3 text-left border-b border-(--el-border-color-lighter) font-medium w-50"
              >
                預計時段 (起~迄)
              </th>
              <th
                class="p-3 text-center border-b border-(--el-border-color-lighter) font-medium w-30"
              >
                預計 (mins)
              </th>
              <th
                class="p-3 text-left border-b border-(--el-border-color-lighter) font-medium w-40"
              >
                實際施作時間
              </th>
              <th
                class="p-3 text-left border-b border-(--el-border-color-lighter) font-medium"
              >
                備註 (隱藏細項/現場狀況)
              </th>
              <th
                class="p-3 text-center border-b border-(--el-border-color-lighter) font-medium w-15"
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(node, index) in form.timeline"
              :key="index"
              class="hover:bg-(--el-fill-color-lighter) transition-colors"
            >
              <td class="p-2 border-b border-(--el-border-color-lighter)">
                <el-input v-model="node.name" placeholder="例：美容區-牆面" />
              </td>
              <td class="p-2 border-b border-(--el-border-color-lighter)">
                <el-input
                  v-model="node.timeWindow"
                  placeholder="09:00 ~ 10:00"
                  @blur="calculateDuration(node)"
                />
              </td>
              <td
                class="p-2 border-b border-(--el-border-color-lighter) text-center"
              >
                <el-input-number
                  v-model="node.duration"
                  :min="0"
                  controls-position="right"
                  class="w-full!"
                />
              </td>
              <td class="p-2 border-b border-(--el-border-color-lighter)">
                <el-time-picker
                  v-model="node.actualTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="回填"
                  class="w-full!"
                />
              </td>
              <td class="p-2 border-b border-(--el-border-color-lighter)">
                <el-input v-model="node.notes" placeholder="..." />
              </td>
              <td
                class="p-2 border-b border-(--el-border-color-lighter) text-center"
              >
                <el-button
                  link
                  type="danger"
                  @click="removeTimelineNode(index)"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-(--el-fill-color-extra-light)">
            <tr>
              <td class="p-3 font-bold text-orange-600">
                預計使用量 (藥劑/耗材)
              </td>
              <td colspan="5" class="p-2">
                <el-input
                  v-model="form.estChemicalUsage"
                  placeholder="估算藥劑量 (例：72Hr x 200ml, 5L x 1...)"
                  class="w-full"
                />
              </td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-blue-600">
                實際使用量 (藥劑/耗材)
              </td>
              <td colspan="5" class="p-2">
                <el-input
                  v-model="form.actualChemicalUsage"
                  placeholder="現場實際消耗數據回填"
                  class="w-full"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </el-card>

    <!-- ─── Sticky Footer ─── -->
    <div
      class="sticky bottom-0 z-10 bg-white border-t border-(--el-border-color-light) shadow-[0_-2px_12px_rgba(0,0,0,0.06)] mt-4"
    >
      <div class="flex items-center justify-end px-8 h-18 gap-3">
        <el-button size="large" @click="emit('close')">離開</el-button>
        <el-button
          type="primary"
          size="large"
          plain
          @click="handleSubmit(true)"
        >
          儲存派工草稿
        </el-button>
        <el-button type="primary" size="large" @click="handleSubmit(false)">
          確認派工安排
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 最小化自訂 CSS：僅保留框架未覆蓋的細節 */

/* el-form-item 在非 form 包住的情況下補齊間距 */
:deep(.el-form-item) {
  margin-bottom: 18px;
}

/* 調整特定欄位的標題文字大小 */
:deep(.compact-form-item .el-form-item__label) {
  font-size: 13px;
  color: var(--el-text-color-regular);
}
</style>
