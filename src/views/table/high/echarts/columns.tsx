import { tableDataDrag } from "../data";
import { message } from "@/utils/message";
import { ref, computed, useTemplateRef } from "vue";
import { clone, useDark, useECharts } from "@pureadmin/utils";

export function useColumns() {
  const dataList = ref(clone(tableDataDrag, true).splice(0, 4));

  const columns: TableColumnList = [
    {
      label: "ID",
      prop: "id"
    },
    {
      label: "姓名",
      prop: "name"
    },
    {
      label: "日期",
      prop: "date"
    },
    {
      label: "echarts圖表",
      slot: "echart"
    }
  ];

  const { isDark } = useDark();

  const theme = computed(() => (isDark.value ? "dark" : "light"));

  dataList.value.forEach((_, i) => {
    const { setOptions } = useECharts(useTemplateRef(`PieChartRef${i}`), {
      theme
    });

    setOptions(
      {
        tooltip: {
          trigger: "item",
          // 將 tooltip 控制在圖表區域里
          confine: true
        },
        series: [
          {
            name: "Github信息",
            type: "pie",
            // center: ["30%", "50%"],
            data: [
              { value: 1067, name: "watchers" },
              { value: 4037, name: "star" },
              { value: 859, name: "forks" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      {
        name: "click",
        callback: ({ data: { name, value } }) => {
          message(
            `您點選了第 ${i + 1} 行，圖表標題為${name}，圖表數據為：${value}`,
            {
              type: "success"
            }
          );
        }
      }
    );
  });

  return {
    columns,
    dataList
  };
}
