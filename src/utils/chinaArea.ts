import REGION_DATA from "china-area-data";
import { cloneDeep } from "@pureadmin/utils";

interface ProvinceData {
  value: string;
  label: string;
  children?: Array<ProvinceData>;
}

// code转汉字大對象,例：CodeToText['110000']輸出北京市
const CodeToText = {};
// 汉字转code大對象,例：TextToCode['北京市']['市辖區']['朝阳區'].code輸出110105
const TextToCode = {};
// 省份對象
const provinceObject = REGION_DATA["86"];
// 省市區三級联動數據（不帶“全部”選項）
const regionData = [];
// 省市二級联動數據（不帶“全部”選項）
let provinceAndCityData = [];

const ALL_TEXT = "全部";

CodeToText[""] = ALL_TEXT;

// 计算省
Object.keys(provinceObject).forEach(prop => {
  const provinceText = provinceObject[prop];
  regionData.push({
    value: prop, // 省份code值
    label: provinceText // 省份汉字
  });
  CodeToText[prop] = provinceText;
  TextToCode[provinceText] = {
    code: prop
  };
  TextToCode[provinceText][ALL_TEXT] = {
    code: ""
  };
});

// 计算市
regionData.forEach((item: ProvinceData) => {
  const provinceCode = item.value;
  const provinceText = item.label;
  const provinceChildren = [];
  const provinceData = REGION_DATA[provinceCode] ?? {};

  Object.keys(provinceData).forEach(prop => {
    provinceChildren.push({
      value: prop,
      label: provinceData[prop]
    });
    CodeToText[prop] = provinceData[prop];
    TextToCode[provinceText][provinceData[prop]] = {
      code: prop
    };
    TextToCode[provinceText][provinceData[prop]][ALL_TEXT] = {
      code: ""
    };
  });

  if (provinceChildren.length) {
    item.children = provinceChildren;
  }
});
provinceAndCityData = cloneDeep(regionData);

// 计算區
regionData.forEach((item: ProvinceData) => {
  const province = item.children;
  const provinceText = item.label;

  if (province) {
    province.forEach(pItem => {
      const cityCode = pItem.value;
      const cityText = pItem.label;
      const cityChildren = [];
      const cityData = REGION_DATA[cityCode] ?? {};

      Object.keys(cityData).forEach(prop => {
        cityChildren.push({
          value: prop,
          label: cityData[prop]
        });
        CodeToText[prop] = cityData[prop];
        TextToCode[provinceText][cityText][cityData[prop]] = {
          code: prop
        };
      });

      if (cityChildren.length) {
        pItem.children = cityChildren;
      }
    });
  }
});

// 添加“全部”選項
const provinceAndCityDataPlus = cloneDeep(provinceAndCityData);
provinceAndCityDataPlus.unshift({
  value: "",
  label: ALL_TEXT
});
provinceAndCityDataPlus.forEach((item: ProvinceData) => {
  const province = item.children;

  if (province?.length) {
    province.unshift({
      value: "",
      label: ALL_TEXT
    });

    province.forEach(pItem => {
      const city = pItem.children;

      if (city?.length) {
        city.unshift({
          value: "",
          label: ALL_TEXT
        });
      }
    });
  }
});

const regionDataPlus = cloneDeep(regionData);
regionDataPlus.unshift({
  value: "",
  label: ALL_TEXT
});
regionDataPlus.forEach((item: ProvinceData) => {
  const province = item.children;

  if (province?.length) {
    province.unshift({
      value: "",
      label: ALL_TEXT
    });
    province.forEach(pItem => {
      const city = pItem.children;

      if (city?.length) {
        city.unshift({
          value: "",
          label: ALL_TEXT
        });
      }
    });
  }
});

/**
 * 汉字转區域码
 * @param provinceText 省
 * @param cityText 市
 * @param regionText 區
 * @returns
 */
function convertTextToCode(
  provinceText: string,
  cityText: string,
  regionText?: string
): string {
  let code = "";
  if (provinceText && TextToCode[provinceText]) {
    const province = TextToCode[provinceText];
    code = province.code;

    if (cityText && province[cityText]) {
      const city = province[cityText];
      code = `${code}${cityText === ALL_TEXT ? "" : ", "}${city.code}`;

      if (regionText && city[regionText]) {
        code = `${code}${regionText === ALL_TEXT ? "" : ", "}${
          city[regionText].code
        }`;
      }
    }
  }
  return code;
}
export {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
  convertTextToCode
};
