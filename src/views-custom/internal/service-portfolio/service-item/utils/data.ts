import type { ServiceItem } from "./types";

/**
 * 從 prototype settings.js 遷移的 12 筆服務項目資料
 * 已移除作業區域綁定欄位
 */
export const SERVICE_ITEM_DATA: ServiceItem[] = [
  {
    id: "1",
    name: "冷氣清消",
    unit: "台",
    defaultPrice: 800,
    defaultTime: 10,
    desc: "分離式冷氣清消\n1.清潔濾網\n2.安裝濾膜\n4.清潔出風口\n5.清潔機身",
    note: "標準清消: $800, 10分\n深層(含濾網): $1200, 20分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [
      { label: "①", name: "標準清消", price: 800, time: 10 },
      { label: "②", name: "深層(含濾網)", price: 1200, time: 20 }
    ]
  },
  {
    id: "2",
    name: "牆面清消",
    unit: "面",
    defaultPrice: 100,
    defaultTime: 5,
    desc: "牆面除毛\n1.除塵毯左至右上至下除毛\n2.濕布左至右上至下用力擦拭\n3.重點髒污清潔",
    note: "局部擦拭: $100, 5分\n全室噴灑: $300, 15分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [
      { label: "①", name: "局部擦拭", price: 100, time: 5 },
      { label: "②", name: "全室噴灑", price: 300, time: 15 }
    ]
  },
  {
    id: "3",
    name: "洗澡台",
    unit: "座",
    defaultPrice: 500,
    defaultTime: 15,
    desc: "洗澡台清潔\n1.移動洗澡台(兩人)\n2.清潔後方牆面毛髮及基本髒污\n3.清潔後方地面毛髮及基本髒汙\n4.移回洗澡台(兩人)\n5.由左面>中間>右面>槽體不鏽鋼擦拭清潔\n6.洗澡台門縫黴菌清潔.鐵條陰角清潔\n7.出水孔濾網清潔",
    note: "標準規模: $500, 15分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [{ label: "①", name: "標準規模", price: 500, time: 15 }]
  },
  {
    id: "4",
    name: "烘箱",
    unit: "座",
    defaultPrice: 400,
    defaultTime: 15,
    desc: "烘箱清潔\n1.移動烘箱(兩人)\n2.清潔後方牆面髒污及毛髮\n3.清潔後方地面毛髮及基本髒污\n4.清潔上蓋內部毛髮及粉塵\n5.清潔烘箱內部毛髮",
    note: "小烘箱: $400, 15分\n大烘箱: $1000, 60分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [
      { label: "①", name: "小烘箱", price: 400, time: 15 },
      { label: "②", name: "大烘箱", price: 1000, time: 60 }
    ]
  },
  {
    id: "5",
    name: "線籠",
    unit: "組",
    defaultPrice: 200,
    defaultTime: 10,
    desc: "線籠清潔\n1.除毛清潔\n2.紙巾擦拭",
    note: "基本清消: $200, 10分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [{ label: "①", name: "基本清消", price: 200, time: 10 }]
  },
  {
    id: "6",
    name: "地面清消",
    unit: "坪",
    defaultPrice: 100,
    defaultTime: 5,
    desc: "洗地流程\n1.移動美容桌及線籠\n2.地坪吸塵\n3.專業洗地\n4.地坪吸水",
    note: "一般清掃: $100, 5分\n高流量清潔: $150, 10分\n抗菌刷洗: $300, 20分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [
      { label: "①", name: "一般清掃", price: 100, time: 5 },
      { label: "②", name: "高流量清潔", price: 150, time: 10 },
      { label: "③", name: "抗菌刷洗", price: 300, time: 20 }
    ]
  },
  {
    id: "7",
    name: "美容台",
    unit: "張",
    defaultPrice: 150,
    defaultTime: 5,
    desc: "美容台清潔\n1.桌面擦拭\n2.陰陽角擦拭\n3.椅子毛髮清潔",
    note: "表面清消: $150, 5分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [{ label: "①", name: "表面清消", price: 150, time: 5 }]
  },
  {
    id: "8",
    name: "吹水機",
    unit: "台",
    defaultPrice: 200,
    defaultTime: 10,
    desc: "吹水機清潔\n1.濾網清潔\n2.出風口清潔",
    note: "進氣過濾清理: $200, 10分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [{ label: "①", name: "進氣過濾清理", price: 200, time: 10 }]
  },
  {
    id: "9",
    name: "玻璃門窗",
    unit: "面",
    defaultPrice: 300,
    defaultTime: 10,
    desc: "專業玻璃清潔流程\n1.濕布擦拭\n2.髒污清除\n3.水漬去除\n4.乾布收尾",
    note: "標準刮拭: $300, 10分\n落地景觀窗: $600, 20分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [
      { label: "①", name: "標準刮拭", price: 300, time: 10 },
      { label: "②", name: "落地景觀窗", price: 600, time: 20 }
    ]
  },
  {
    id: "10",
    name: "全效防護",
    unit: "式",
    defaultPrice: 2000,
    defaultTime: 60,
    desc: "環境整體抗菌除臭鍍膜流程",
    note: "全效防護: $2000, 60分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [{ label: "①", name: "全效防護", price: 2000, time: 60 }]
  },
  {
    id: "11",
    name: "現場擦拭",
    unit: "式",
    defaultPrice: 500,
    defaultTime: 30,
    desc: "環境細部與高難度部位擦拭流程",
    note: "雜物架/櫃體: $500, 30分\n櫃檯與座椅: $500, 30分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [
      { label: "①", name: "雜物架/櫃體", price: 500, time: 30 },
      { label: "②", name: "櫃檯與座椅", price: 500, time: 30 }
    ]
  },
  {
    id: "12",
    name: "天花板清消",
    unit: "面",
    defaultPrice: 100,
    defaultTime: 10,
    desc: "天花板除殘垢與除塵流程",
    note: "標準清消: $100, 10分",
    mTime: "2026-04-07 14:00:00",
    mUserName: "Admin",
    conditions: [{ label: "①", name: "標準清消", price: 100, time: 10 }]
  }
];

export function getServiceItemDetail(id: string) {
  const item = SERVICE_ITEM_DATA.find(i => i.id === id);
  if (!item) return null;
  return {
    id: item.id,
    name: item.name,
    unit: item.unit,
    desc: item.desc,
    conditions: [...item.conditions]
  };
}
