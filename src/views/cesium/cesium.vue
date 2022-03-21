<!--
 * @Author: 何元鹏
 * @Date: 2022-02-16 11:29:42
 * @LastEditors: 何元鹏
 * @LastEditTime: 2022-02-24 17:20:58
-->
<template>
  <div>
    <div class="containers" id="cesiumContainer"></div>
  </div>
</template>

<script>
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
    // 地图实例
    init() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDUyZDY3Ny0wYzA3LTQ5YjYtYmI3ZC02MjA0OTc1N2Q5NTciLCJpZCI6Nzk4ODgsImlhdCI6MTY0MjQ3MjUxOX0.gXGwm6DPITjRkzjdikD5dm4gPR1ZUKEP19hZewsDj54";

      const viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url: Cesium.IonResource.fromAssetId(1)
        }),
        baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
        fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
        vrButton: false, // 如果设置为false，将不会创建VR应用场景
        geocoder: true, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
        homeButton: true, // 如果设置为false，将不会创建右上角主页(房子)按钮。
        infoBox: false, // 是否显示点击要素之后显示的信息,cesium中的沙盒开关
        sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
        selectionIndicator: false, // 获取当选定实体更改时引发的事件。
        navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
        navigationInstructionsInitiallyVisible: true, // 如果帮助说明最初应该是可见的，则为true；如果直到用户明确单击该按钮，则不显示该说明，否则为false。
        timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
        scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
        animation: false, // 如果设置为false，将不会创建左下角动画小部件。
        shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
        // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
        sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
        requestRenderMode: false, // 启用请求渲染模式，不需要渲染，节约资源吧
        fullscreenElement: document.body // 全屏时渲染的HTML元素 暂时没发现用处，虽然我关闭了
      });
      // 初始化位置
      const boundingSphere = new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(104.1, 30.6, 600),
        600
      );
      // 定位到初始位置
      // 将相机移到当前视图包含所提供的包围球的位置。
      viewer.camera.flyToBoundingSphere(boundingSphere, {
        // 动画，定位到初始位置的过渡时间，设置成0，就没有动画
        duration: 0
      });
      // 隐藏版权
      viewer._cesiumWidget._creditContainer.style.display = "none";

      const tilesetModel = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: "public/Scene/testm3DTiles.json"
        })
      );
      tilesetModel.readyPromise
        .then(currentModel => {
          // 定位到模型
          viewer.zoomTo(
            currentModel,
            new Cesium.HeadingPitchRange(
              0.5,
              -0.2,
              currentModel.boundingSphere.radius * 1.0
            )
          );
        })
        .otherwise(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.containers {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
