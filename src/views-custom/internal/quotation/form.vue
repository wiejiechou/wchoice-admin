<script setup lang="ts">
import { ref } from "vue";
import { useQuotationForm } from "./utils/form-hook";
import type { QuotationForm } from "./utils/types";
import WChoiceUploader from "./components/WChoiceUploader.vue";
import ArrowDown from "~icons/ep/arrow-down";

defineOptions({ name: "QuotationForm" });

const props = defineProps<{
  initialData?: QuotationForm;
  onSubmit?: (data: any) => void;
}>();

const emit = defineEmits(["close"]);

const { form, totalPrice, totalTimeMin, totalDoubleHours, submitForm } =
  useQuotationForm(props.initialData);
const activeTab = ref("r1");

function toggleExpand(item: any) {
  item.isExpanded = !item.isExpanded;
  item.checked = item.isExpanded;
}

const handleSubmit = (isDraft: boolean) => {
  const result = submitForm();
  if (result && props.onSubmit) {
    props.onSubmit({ ...result, isDraft });
  }
};
</script>

<template>
  <div>
    <!-- Section A: 基本資訊 -->
    <el-row :gutter="16" class="mb-4">
      <!-- 左：客戶資訊 -->
      <el-col :md="17" :xs="24">
        <el-card shadow="never" class="mb-4 md:mb-0">
          <template #header>客戶與案場基礎資訊</template>
          <el-form :model="form" label-position="top">
            <el-row :gutter="16">
              <el-col :span="8">
                <el-form-item label="客戶名稱">
                  <el-input
                    v-model="form.clientName"
                    placeholder="客戶名稱"
                    clearable
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

      <!-- 右：業務資訊 -->
      <el-col :md="7" :xs="24">
        <el-card shadow="never" class="h-full">
          <template #header>業務與時程資訊</template>
          <el-form :model="form" label-position="top">
            <el-form-item label="VIP 服務專員">
              <el-input
                v-model="form.salesName"
                placeholder="專員姓名"
                clearable
              />
            </el-form-item>
            <el-form-item label="VIP 服務專線">
              <el-input
                v-model="form.salesPhone"
                placeholder="服務專線"
                clearable
              />
            </el-form-item>
            <el-form-item label="報價有效日期">
              <el-date-picker
                v-model="form.expiryDate"
                type="date"
                class="w-full!"
                placeholder="選擇日期"
              />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!-- Section B: 服務項目 -->
    <el-card shadow="never">
      <template #header>
        <div class="flex-bc">
          <span>服務區域與項目配置</span>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane
          v-for="region in form.regions"
          :key="region.id"
          :label="region.name"
          :name="region.id"
        >
          <div v-for="section in region.sections" :key="section.id">
            <!-- 清單 -->
            <div
              v-for="item in section.items"
              :key="item.id"
              :class="[
                'border-b border-(--el-border-color-lighter) last:border-0',
                item.isExpanded
                  ? 'bg-(--el-color-primary-light-9) border-l-2 border-l-(--el-color-primary)'
                  : ''
              ]"
            >
              <!-- 摘要行：Checkbox ＋ 名稱 ＋ 金額 ＋ 展開箭頭 -->
              <div
                class="flex-bc p-3 cursor-pointer hover:bg-(--el-fill-color-lighter) select-none"
                @click="toggleExpand(item)"
              >
                <div class="flex items-center gap-3 flex-1 overflow-hidden">
                  <el-checkbox v-model="item.checked" @click.stop />
                  <span
                    :class="[
                      'text-sm truncate font-bold',
                      item.checked
                        ? 'text-(--el-text-color-primary)'
                        : 'text-(--el-text-color-regular)'
                    ]"
                    >{{ item.name }}</span
                  >
                </div>
                <div class="flex items-center gap-4 shrink-0">
                  <span
                    class="font-mono text-sm text-(--el-color-primary) w-25 text-right"
                  >
                    {{
                      item.checked
                        ? `$ ${(item.price * item.count).toLocaleString()}`
                        : "—"
                    }}
                  </span>
                  <el-icon
                    :class="[
                      'text-(--el-text-color-placeholder) transition-transform duration-300',
                      item.isExpanded ? 'rotate-180' : ''
                    ]"
                    ><ArrowDown
                  /></el-icon>
                </div>
              </div>

              <!-- 展開詳情 -->
              <el-collapse-transition>
                <div
                  v-if="item.isExpanded"
                  class="px-10 py-4 border-t border-dashed border-(--el-border-color-lighter)"
                  @click.stop
                >
                  <el-row :gutter="20">
                    <!-- 條件屬性：大螢幕 5/24，中螢幕 12/24 (50%)，小螢幕 14/24 (58%) -->
                    <el-col :lg="6" :md="12" :sm="14">
                      <el-form-item label="條件屬性" class="compact-form-item">
                        <el-select
                          v-if="item.options?.length"
                          v-model="item.selectedOptionIndex"
                          class="w-full!"
                        >
                          <el-option
                            v-for="(opt, idx) in item.options"
                            :key="idx"
                            :label="opt.label"
                            :value="idx"
                          />
                        </el-select>
                        <el-input
                          v-else
                          v-model="item.attribute"
                          placeholder="手動輸入屬性"
                        />
                      </el-form-item>
                    </el-col>

                    <!-- 數量：大螢幕 4/24，中螢幕 6/24 (25%)，小螢幕 10/24 (42%) -->
                    <el-col :lg="4" :md="6" :sm="10">
                      <el-form-item label="數量" class="compact-form-item">
                        <div class="flex items-center gap-1.5 w-full">
                          <el-input-number
                            v-model="item.count"
                            :min="1"
                            :max="999"
                            controls-position="right"
                            class="w-22.5! shrink-0"
                          />
                          <span
                            class="text-(--el-text-color-placeholder) text-sm shrink-0"
                            >{{ item.unit }}</span
                          >
                        </div>
                      </el-form-item>
                    </el-col>

                    <!-- 現場照片：大螢幕填滿剩餘 (15/24)，中/小螢幕獨佔一行 (24/24) -->
                    <el-col :lg="14" :md="24" :sm="24">
                      <el-form-item label="現場照片" class="compact-form-item">
                        <WChoiceUploader v-model="item.photos" mini />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-transition>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- ─── Sticky Footer（跟隨 .main 容器，不跨越 sidebar）─── -->
    <div
      class="sticky bottom-0 z-10 bg-white border-t border-(--el-border-color-light) shadow-[0_-2px_12px_rgba(0,0,0,0.06)] mt-4"
    >
      <div class="flex-bc px-8 h-18">
        <!-- 結算資訊 -->
        <div class="flex items-center gap-8">
          <div>
            <div
              class="text-[11px] text-(--el-text-color-placeholder) font-medium mb-0.5"
            >
              單人工時
            </div>
            <div
              class="font-mono font-bold text-lg text-(--el-text-color-primary)"
            >
              {{ totalTimeMin
              }}<span class="text-xs font-normal ml-1">min</span>
            </div>
          </div>
          <el-divider direction="vertical" class="h-6!" />
          <div>
            <div
              class="text-[11px] text-(--el-text-color-placeholder) font-medium mb-0.5"
            >
              雙人工時
            </div>
            <div class="font-mono font-bold text-lg text-blue-500">
              {{ totalDoubleHours
              }}<span class="text-xs font-normal ml-1">hrs</span>
            </div>
          </div>
          <el-divider direction="vertical" class="h-6!" />
          <div>
            <div
              class="text-[11px] text-(--el-color-primary) font-medium mb-0.5"
            >
              報價合計
            </div>
            <div class="font-mono font-black text-xl text-(--el-color-primary)">
              $ {{ totalPrice.toLocaleString() }}
            </div>
          </div>
        </div>

        <!-- 操作 -->
        <div class="flex gap-3">
          <el-button size="large" @click="emit('close')">取消離開</el-button>
          <el-button
            type="primary"
            size="large"
            plain
            @click="handleSubmit(true)"
          >
            儲存草稿
          </el-button>
          <el-button type="primary" size="large" @click="handleSubmit(false)">
            產製報價單
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 最小化自訂 CSS：僅保留框架未覆蓋的細節 */

/* 展開項目的左邊框：框架變數無法直接做到 border-left override */
.border-l-primary {
  border-left: 2px solid var(--el-color-primary);
}

/* el-form-item 在非 form 包住的情況下補齊間距 */
:deep(.el-form-item) {
  margin-bottom: 18px;
}

/* Tab 底線去掉尾巴 */
:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background: var(--el-border-color-lighter);
}

/* 調整特定欄位的標題文字大小 */
:deep(.compact-form-item .el-form-item__label) {
  font-size: 13px;
  color: var(--el-text-color-regular);
}
</style>
