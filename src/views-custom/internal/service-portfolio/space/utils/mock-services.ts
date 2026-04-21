/**
 * 物理隔離的服務項目假資料 (用於 Space 模塊的關聯選擇)
 * 結構對齊 service-item/utils/data.ts
 */

export interface MockServiceItem {
  id: string;
  name: string;
  unit: string;
  defaultPrice: number;
  defaultTime: number;
  desc: string;
}

export const MOCK_SERVICES: MockServiceItem[] = [
  {
    id: "s1",
    name: "冷氣清消 (標準)",
    unit: "台",
    defaultPrice: 800,
    defaultTime: 10,
    desc: "含濾網清潔、出風口、機身擦拭"
  },
  {
    id: "s2",
    name: "牆面除毛清消",
    unit: "面",
    defaultPrice: 100,
    defaultTime: 5,
    desc: "專業除塵毯與濕布擦拭"
  },
  {
    id: "s3",
    name: "洗澡台深層清潔",
    unit: "座",
    defaultPrice: 500,
    defaultTime: 15,
    desc: "含移動清洗、縫隙黴菌處理"
  },
  {
    id: "s4",
    name: "烘箱內部除毛",
    unit: "座",
    defaultPrice: 400,
    defaultTime: 15,
    desc: "清潔上蓋粉塵與內部死角"
  },
  {
    id: "s5",
    name: "線籠基礎消毒",
    unit: "組",
    defaultPrice: 200,
    defaultTime: 10,
    desc: "除毛清潔與滅菌紙巾擦拭"
  },
  {
    id: "s6",
    name: "地面高流量清潔",
    unit: "坪",
    defaultPrice: 150,
    defaultTime: 10,
    desc: "洗地機刷洗與吸水處理"
  },
  {
    id: "s7",
    name: "美容台表面消毒",
    unit: "張",
    defaultPrice: 150,
    defaultTime: 5,
    desc: "工作台面與座椅細部清潔"
  },
  {
    id: "s8",
    name: "吹水機濾網清理",
    unit: "台",
    defaultPrice: 200,
    defaultTime: 10,
    desc: "進氣口過濾系統除塵"
  },
  {
    id: "s9",
    name: "落地玻璃景觀窗",
    unit: "面",
    defaultPrice: 600,
    defaultTime: 20,
    desc: "專業刮刀除垢與亮面處理"
  },
  {
    id: "s10",
    name: "室內全效防護鍍膜",
    unit: "式",
    defaultPrice: 2000,
    defaultTime: 60,
    desc: "長效抗菌除臭噴塗處理"
  },
  {
    id: "s11",
    name: "櫃檯與座椅細部擦拭",
    unit: "式",
    defaultPrice: 500,
    defaultTime: 30,
    desc: "複雜面與把手重點清潔"
  },
  {
    id: "s12",
    name: "天花板管線除塵",
    unit: "面",
    defaultPrice: 100,
    defaultTime: 10,
    desc: "高處除塵與蜘蛛網清除"
  }
];
