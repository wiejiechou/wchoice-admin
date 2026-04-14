<script setup lang="ts">
import { ref } from "vue";
import { useQuotationForm } from "../utils/form-hook";
import WChoiceUploader from "./WChoiceUploader.vue";
import Plus from "~icons/ep/plus";
import Delete from "~icons/ep/delete";
import ArrowDown from "~icons/ep/arrow-down";
import { message } from "@/utils/message";

const props = defineProps({
  mode: {
    type: String as () => "add" | "edit" | "view",
    default: "add"
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const { form, addSection, addItem, removeItem, submitForm } = useQuotationForm(
  props.initialData
);
const activeTab = ref("r1");

const toggleExpand = (item: any) => {
  item.isExpanded = !item.isExpanded;
};
</script>

<template>
  <div class="quotation-form-wrapper pb-25">
    <!-- 留出底部吸附欄空間 -->
    <div class="quotation-form-container max-w-7xl mx-auto p-4 animate-fade-in">
      <el-form :model="form" label-position="top">
        <!-- 第一排：客戶資訊與時程並排 (釋放寬度後的黃金佈局) -->
        <el-row :gutter="20">
          <el-col :md="16" :sm="24">
            <el-card
              shadow="never"
              class="mb-4 border-none! bg-transparent! no-padding-card"
            >
              <template #header
                ><span class="text-lg font-bold text-gray-700"
                  >客戶案場基礎資訊</span
                ></template
              >
              <el-row :gutter="15">
                <el-col :span="8">
                  <el-form-item label="客戶名稱"
                    ><el-input v-model="form.clientName" placeholder="客戶全名"
                  /></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="聯絡人"
                    ><el-input
                      v-model="form.contactPerson"
                      placeholder="聯絡窗口"
                  /></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="聯絡電話"
                    ><el-input v-model="form.contactPhone" placeholder="電話"
                  /></el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="服務地址"
                    ><el-input
                      v-model="form.clientAddress"
                      placeholder="精確施作地址"
                  /></el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-col>

          <el-col :md="8" :sm="24">
            <el-card shadow="never" class="mb-4 bg-gray-50/50">
              <template #header
                ><span class="font-bold text-gray-600"
                  >合規與時程</span
                ></template
              >
              <el-form-item label="服務專員">
                <el-input v-model="form.salesName" />
              </el-form-item>
              <el-form-item label="報價有效期">
                <el-date-picker
                  v-model="form.expiryDate"
                  type="date"
                  class="w-full!"
                />
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>

        <!-- 3. 服務項目配置 (全寬模式) -->
        <el-card shadow="never" class="service-config-card">
          <template #header>
            <div class="flex-bc px-2">
              <div class="flex items-center gap-2">
                <span class="p-1.5 bg-orange-100 rounded-lg text-orange-600"
                  ><Plus
                /></span>
                <span class="text-lg font-bold">服務區域與項目配置</span>
              </div>
              <el-button
                type="primary"
                link
                @click="addSection(activeTab === 'r1' ? 0 : 1)"
                >新增自定義分組</el-button
              >
            </div>
          </template>

          <el-tabs v-model="activeTab" class="custom-tabs-modern">
            <el-tab-pane
              v-for="(region, rIdx) in form.regions"
              :key="region.id"
              :label="region.name"
              :name="region.id"
            >
              <div
                v-for="(section, sIdx) in region.sections"
                :key="section.id"
                class="section-group mb-8"
              >
                <div
                  class="group-title flex-bc py-3 mb-2 px-4 bg-gray-50/80 rounded-t-xl border-b border-gray-100"
                >
                  <span class="font-bold text-gray-700">{{
                    section.title
                  }}</span>
                  <el-button
                    type="primary"
                    size="small"
                    link
                    @click="addItem(rIdx, sIdx)"
                    >+ 新增手動項目</el-button
                  >
                </div>

                <div class="section-content">
                  <div
                    v-for="(item, iIdx) in section.items"
                    :key="item.id"
                    :class="[
                      'item-node transition-all border-b border-gray-50',
                      item.isExpanded ? 'active-item' : 'hover:bg-gray-50/50'
                    ]"
                  >
                    <!-- 摘要行 (Horizontal Layout) -->
                    <div
                      class="flex-bc p-4 cursor-pointer"
                      @click="toggleExpand(item)"
                    >
                      <div class="flex items-center gap-4 flex-1">
                        <el-checkbox
                          v-model="item.checked"
                          class="mr-0!"
                          @click.stop
                        />
                        <span
                          :class="[
                            'text-base font-medium',
                            item.checked ? 'text-gray-900' : 'text-gray-400'
                          ]"
                          >{{ item.name }}</span
                        >
                        <span
                          v-if="!item.isExpanded && item.attribute"
                          class="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded"
                          >{{ item.attribute }}</span
                        >
                      </div>

                      <div class="flex items-center gap-8">
                        <div class="text-right min-w-30">
                          <span
                            v-if="item.checked"
                            class="font-mono text-orange-600 font-bold"
                            >$
                            {{
                              (item.price * item.count).toLocaleString()
                            }}</span
                          >
                          <span v-else class="text-gray-300">-</span>
                        </div>
                        <el-icon
                          :class="[
                            'text-gray-300 transition-transform duration-300',
                            item.isExpanded ? 'rotate-180' : ''
                          ]"
                          ><ArrowDown
                        /></el-icon>
                      </div>
                    </div>

                    <!-- 詳情展開 (Full Width Details) -->
                    <div
                      v-if="item.isExpanded"
                      class="p-6 bg-white rounded-b-xl shadow-inner-soft animate-slide-down"
                      @click.stop
                    >
                      <el-row :gutter="30">
                        <el-col :md="10" :sm="24">
                          <label class="detail-label"
                            >服務條件 / 規格屬性</label
                          >
                          <el-select
                            v-if="item.options"
                            v-model="item.selectedOptionIndex"
                            class="w-full! mt-1.5"
                            size="large"
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
                            class="mt-1.5"
                            size="large"
                          />
                        </el-col>

                        <el-col :md="6" :sm="12">
                          <label class="detail-label">施作數量</label>
                          <div class="flex items-center gap-2 mt-1.5">
                            <el-input-number
                              v-model="item.count"
                              :min="1"
                              controls-position="right"
                              class="w-full!"
                              size="large"
                            />
                            <span class="text-sm text-gray-400 font-medium"
                              >({{ item.unit }})</span
                            >
                          </div>
                        </el-col>

                        <el-col
                          :md="8"
                          :sm="12"
                          class="text-right flex flex-col justify-end"
                        >
                          <el-button
                            type="danger"
                            link
                            @click="removeItem(rIdx, sIdx, iIdx)"
                          >
                            <el-icon :size="20"><Delete /></el-icon> 移除此項
                          </el-button>
                        </el-col>
                      </el-row>

                      <div class="mt-6 pt-6 border-t border-gray-50">
                        <label class="detail-label block mb-3"
                          >📸 現場施作前照片存證</label
                        >
                        <WChoiceUploader v-model="item.photos" mini />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-form>
    </div>

    <!-- 🌟 底部吸附總體結算欄 (Sticky Footer Bar) -->
    <div
      class="sticky-footer border-t bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      <div class="max-w-7xl mx-auto px-6 h-20 flex-bc">
        <div class="flex items-center gap-10">
          <div class="info-group">
            <span
              class="text-xs text-gray-400 uppercase tracking-widest font-bold"
              >Total Time</span
            >
            <div class="text-xl font-mono text-gray-800 font-bold">
              {{ form.totalTimeMin }}
              <span class="text-xs font-normal">min</span>
            </div>
          </div>
          <div class="info-group">
            <span
              class="text-xs text-gray-400 uppercase tracking-widest font-bold"
              >Double Work</span
            >
            <div class="text-xl font-mono text-blue-600 font-bold">
              {{ form.totalDoubleHours }}
              <span class="text-xs font-normal">hrs</span>
            </div>
          </div>
          <div class="h-8 w-px bg-gray-100 hidden sm:block" />
          <div class="info-group">
            <span
              class="text-xs text-orange-400 uppercase tracking-widest font-bold"
              >Total Amount</span
            >
            <div
              class="text-2xl font-mono text-orange-500 font-black tracking-tighter"
            >
              <span class="text-sm mr-1 font-sans">NTD</span>
              {{ form.totalPrice.toLocaleString() }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <el-button
            size="large"
            class="rounded-full! px-8 border-none! bg-gray-100! hover:bg-gray-200!"
            @click="$router.back()"
            >取消離開</el-button
          >
          <el-button
            type="primary"
            size="large"
            class="rounded-full! px-12 h-12.5! text-base! bg-orange-500! border-orange-500! shadow-lg shadow-orange-200"
            @click="submitForm"
          >
            產製報價單並傳送
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quotation-form-wrapper {
  min-height: 100vh;
  background-color: #fcfcfc;
}

.service-config-card {
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 20px;

  :deep(.el-card__header) {
    padding: 24px;
    background-color: #fff;
    border-bottom: 1px solid #f8f8f8;
  }
}

.custom-tabs-modern {
  :deep(.el-tabs__header) {
    padding: 0 24px;
    margin-bottom: 0;
  }

  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }
}

.item-node {
  &.active-item {
    background-color: #fffaf0;
    box-shadow: inset 0 2px 10px rgb(0 0 0 / 2%);
  }
}

.detail-label {
  font-size: 12px;
  font-weight: 600;
  color: #a0a0a0;
  letter-spacing: 0.5px;
}

.sticky-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
}

.shadow-inner-soft {
  box-shadow: inset 0 2px 8px rgb(0 0 0 / 3%);
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    max-height: 0;
    opacity: 0;
  }

  to {
    max-height: 500px;
    opacity: 1;
  }
}

:deep(.el-input__wrapper),
:deep(.el-select__wrapper) {
  border-radius: 8px !important;
  box-shadow: 0 0 0 1px #e5e7eb inset !important;

  &.is-focus {
    box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
  }
}
</style>
