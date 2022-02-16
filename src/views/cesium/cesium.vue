<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
window.CESIUM_BASE_URL = "/";

import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default {
  // 组件名称
  name: "CesiumDemo",
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},

  created() {},

  mounted() {
    this.init();
  },
  // 组件方法
  methods: {
    init() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDUyZDY3Ny0wYzA3LTQ5YjYtYmI3ZC02MjA0OTc1N2Q5NTciLCJpZCI6Nzk4ODgsImlhdCI6MTY0MjQ3MjUxOX0.gXGwm6DPITjRkzjdikD5dm4gPR1ZUKEP19hZewsDj54";

      // 使用“cesiumContainer”ID 在 HTML 元素中初始化 Cesium 查看器。
      const viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain()
      });
      // 添加 Cesium OSM Buildings，一个全球 3D 建筑图层。
      /*   const buildingTileset = viewer.scene.primitives.add(
        Cesium.createOsmBuildings()
      ); */
      // 以给定的经度、纬度和高度将相机飞到旧金山。
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-15.0)
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.box {
  height: 100%;
}
</style>
