import { reactive, computed } from "vue";
import type { QuotationForm, ServiceRegion } from "./types";
import { message } from "@/utils/message";

/** 根據 Prototype 精確映射的服務項目與選項 */
const MOCK_REGIONS: ServiceRegion[] = [
  {
    id: "r1",
    name: "美容區",
    active: true,
    sections: [
      {
        id: "s1",
        title: "標準美容配置",
        items: [
          {
            id: "i1",
            name: "冷氣",
            checked: false,
            count: 1,
            unit: "台",
            attribute: "",
            photos: [],
            isExpanded: false,
            selectedOptionIndex: 0,
            price: 800,
            time_min: 10,
            options: [
              { label: "標準清消 ($800 / 10min)", price: 800, time_min: 10 },
              {
                label: "深層(含濾網) ($1500 / 30min)",
                price: 1500,
                time_min: 30
              }
            ]
          },
          {
            id: "i2",
            name: "牆面",
            checked: false,
            count: 1,
            unit: "面",
            attribute: "局部擦拭",
            photos: [],
            isExpanded: false,
            price: 100,
            time_min: 5
          },
          {
            id: "i3",
            name: "洗澡台",
            checked: false,
            count: 1,
            unit: "座",
            attribute: "標準規模",
            photos: [],
            isExpanded: false,
            price: 500,
            time_min: 15
          },
          {
            id: "i4",
            name: "烘箱",
            checked: false,
            count: 1,
            unit: "座",
            attribute: "",
            photos: [],
            isExpanded: false,
            selectedOptionIndex: 0,
            price: 400,
            time_min: 15,
            options: [
              { label: "小烘箱 ($400 / 15min)", price: 400, time_min: 15 },
              { label: "大型烘房 ($1200 / 40min)", price: 1200, time_min: 40 }
            ]
          },
          {
            id: "i5",
            name: "線籠",
            checked: false,
            count: 1,
            unit: "組",
            attribute: "基本清消",
            photos: [],
            isExpanded: false,
            price: 200,
            time_min: 10
          },
          {
            id: "i6",
            name: "地面",
            checked: false,
            count: 1,
            unit: "坪",
            attribute: "一般清掃",
            photos: [],
            isExpanded: false,
            price: 100,
            time_min: 5
          },
          {
            id: "i7",
            name: "美容台",
            checked: false,
            count: 1,
            unit: "張",
            attribute: "表面清消",
            photos: [],
            isExpanded: false,
            price: 150,
            time_min: 5
          },
          {
            id: "i8",
            name: "吹水機",
            checked: false,
            count: 1,
            unit: "台",
            attribute: "過濾清理",
            photos: [],
            isExpanded: false,
            price: 200,
            time_min: 10
          },
          {
            id: "i9",
            name: "玻璃",
            checked: false,
            count: 1,
            unit: "面",
            attribute: "標準刮拭",
            photos: [],
            isExpanded: false,
            price: 300,
            time_min: 10
          },
          {
            id: "i10",
            name: "抗菌鍍膜",
            checked: false,
            count: 1,
            unit: "式",
            attribute: "",
            photos: [],
            isExpanded: false,
            selectedOptionIndex: 0,
            price: 2000,
            time_min: 60,
            options: [
              { label: "全效防護 ($2000 / 60min)", price: 2000, time_min: 60 },
              { label: "加強除臭型 ($3500 / 90min)", price: 3500, time_min: 90 }
            ]
          },
          {
            id: "i11",
            name: "擦拭",
            checked: false,
            count: 1,
            unit: "式",
            attribute: "雜物架/櫃體",
            photos: [],
            isExpanded: false,
            price: 500,
            time_min: 30
          },
          {
            id: "i12",
            name: "天花板",
            checked: false,
            count: 1,
            unit: "面",
            attribute: "標準清消",
            photos: [],
            isExpanded: false,
            price: 100,
            time_min: 10
          }
        ]
      }
    ]
  },
  {
    id: "r2",
    name: "會客區",
    active: false,
    sections: [
      {
        id: "s2",
        title: "公共空間配置",
        items: [
          {
            id: "i13",
            name: "冷氣",
            checked: false,
            count: 1,
            unit: "台",
            attribute: "標準清消",
            photos: [],
            isExpanded: false,
            price: 800,
            time_min: 10
          },
          {
            id: "i14",
            name: "抗菌鍍膜",
            checked: false,
            count: 1,
            unit: "式",
            attribute: "全效防護",
            photos: [],
            isExpanded: false,
            price: 2000,
            time_min: 60
          },
          {
            id: "i15",
            name: "擦拭",
            checked: false,
            count: 1,
            unit: "式",
            attribute: "櫃檯與座椅",
            photos: [],
            isExpanded: false,
            price: 500,
            time_min: 30
          },
          {
            id: "i16",
            name: "玻璃",
            checked: false,
            count: 1,
            unit: "面",
            attribute: "落地景觀窗",
            photos: [],
            isExpanded: false,
            price: 600,
            time_min: 20
          },
          {
            id: "i17",
            name: "地面",
            checked: false,
            count: 1,
            unit: "坪",
            attribute: "高流量清潔",
            photos: [],
            isExpanded: false,
            price: 150,
            time_min: 10
          }
        ]
      }
    ]
  }
];

export function useQuotationForm(initialData?: Partial<QuotationForm>) {
  const form = reactive<QuotationForm>({
    clientName: initialData?.clientName || "",
    contactPerson: initialData?.contactPerson || "",
    contactPhone: initialData?.contactPhone || "",
    clientAddress: initialData?.clientAddress || "",
    executionPriority: initialData?.executionPriority || "",
    executionNotes: initialData?.executionNotes || "",
    salesName: initialData?.salesName || "",
    salesPhone: initialData?.salesPhone || "",
    expiryDate: initialData?.expiryDate || "",
    regions: initialData?.regions || JSON.parse(JSON.stringify(MOCK_REGIONS))
  });

  const totalPrice = computed(() => {
    let t = 0;
    form.regions.forEach(region => {
      region.sections.forEach(section => {
        section.items.forEach(item => {
          if (item.checked) {
            let p = item.price;
            if (item.options && item.selectedOptionIndex !== undefined) {
              p = item.options[item.selectedOptionIndex].price;
            }
            t += p * item.count;
          }
        });
      });
    });
    return t;
  });

  const totalTimeMin = computed(() => {
    let t = 0;
    form.regions.forEach(region => {
      region.sections.forEach(section => {
        section.items.forEach(item => {
          if (item.checked) {
            let tm = item.time_min;
            if (item.options && item.selectedOptionIndex !== undefined) {
              tm = item.options[item.selectedOptionIndex].time_min;
            }
            t += tm * item.count;
          }
        });
      });
    });
    return t;
  });

  const totalDoubleHours = computed(() => {
    return Number((totalTimeMin.value / 120).toFixed(1));
  });

  const submitForm = () => {
    if (!form.clientName || !form.clientAddress) {
      message("請填寫客戶名稱與服務地址", { type: "warning" });
      return null;
    }
    return {
      ...form, // Return combined payload
      totalPrice: totalPrice.value,
      totalTimeMin: totalTimeMin.value,
      totalDoubleHours: totalDoubleHours.value
    };
  };

  return {
    form,
    totalPrice,
    totalTimeMin,
    totalDoubleHours,
    submitForm
  };
}
