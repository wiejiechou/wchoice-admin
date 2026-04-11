<script setup lang="ts">
import { reactive, getCurrentInstance, onBeforeMount, onUnmounted } from "vue";
import { deviceDetection } from "@pureadmin/utils";
import AMapLoader from "@amap/amap-jsapi-loader";
import { mapJson } from "@/api/mock";
import car from "@/assets/car.png";

export interface MapConfigureInter {
  on: Fn;
  destroy?: Fn;
  clearEvents?: Fn;
  addControl?: Fn;
  setCenter?: Fn;
  setZoom?: Fn;
  plugin?: Fn;
}

defineOptions({
  name: "Amap"
});

let MarkerCluster;
let map: MapConfigureInter;

const instance = getCurrentInstance();

const mapSet = reactive({
  loading: deviceDetection() ? false : true
});

// 地圖创建完成(動畫關閉)
const complete = (): void => {
  if (map) {
    map.on("complete", () => {
      mapSet.loading = false;
    });
  }
};

onBeforeMount(() => {
  if (!instance) return;
  const { MapConfigure } = instance.appContext.config.globalProperties.$config;
  const { options } = MapConfigure;

  AMapLoader.load({
    key: MapConfigure.amapKey,
    version: "2.0",
    plugins: ["AMap.MarkerCluster"]
  })
    .then(AMap => {
      // 创建地圖實例
      map = new AMap.Map(instance.refs.mapview, options);

      //地圖中添加地圖操作ToolBar插件
      map.plugin(["AMap.ToolBar", "AMap.MapType"], () => {
        map.addControl(new AMap.ToolBar());
        //地圖類型切换
        map.addControl(
          new AMap.MapType({
            defaultType: 0
          })
        );
      });

      MarkerCluster = new AMap.MarkerCluster(map, [], {
        // 聚合网格像素大小
        gridSize: 80,
        maxZoom: 14,
        renderMarker(ctx) {
          const { marker, data } = ctx;
          if (Array.isArray(data) && data[0]) {
            const { driver, plateNumber, orientation } = data[0];
            const content = `<img style="transform: scale(1) rotate(${
              360 - Number(orientation)
            }deg);" src='${car}' />`;
            marker.setContent(content);
            marker.setLabel({
              direction: "bottom",
              //設定文本标注偏移量
              offset: new AMap.Pixel(-4, 0),
              //設定文本标注内容
              content: `<div> ${plateNumber}(${driver})</div>`
            });
            marker.setOffset(new AMap.Pixel(-18, -10));
            marker.on("click", ({ lnglat }) => {
              map.setZoom(13); //設定地圖層級
              map.setCenter(lnglat);
            });
          }
        }
      });

      // 获取模擬车辆信息
      mapJson()
        .then(({ code, data }) => {
          if (code === 0) {
            const points: object = data.map(v => {
              return {
                lnglat: [v.lng, v.lat],
                ...v
              };
            });
            if (MarkerCluster) MarkerCluster.setData(points);
          }
        })
        .catch(err => {
          console.log("err:", err);
        });

      complete();
    })
    .catch(() => {
      mapSet.loading = false;
      throw "地圖加載失敗，請重新加載";
    });
});

onUnmounted(() => {
  if (map) {
    // 销毁地圖實例
    map.destroy() && map.clearEvents("click");
  }
});
</script>

<template>
  <div id="mapview" ref="mapview" v-loading="mapSet.loading" />
</template>

<style lang="scss" scoped>
#mapview {
  height: calc(100vh - 86px);
}

:deep(.amap-marker-label) {
  border: none !important;
}
</style>
