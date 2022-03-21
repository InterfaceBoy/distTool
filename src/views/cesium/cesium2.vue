<!--
 * @Author: 何元鹏
 * @Date: 2022-02-16 11:29:42
 * @LastEditors: 何元鹏
 * @LastEditTime: 2022-02-21 13:42:26
-->
<template>
  <div class="container" id="cesiumContainer"></div>
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
    // 地图实例
    init() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDUyZDY3Ny0wYzA3LTQ5YjYtYmI3ZC02MjA0OTc1N2Q5NTciLCJpZCI6Nzk4ODgsImlhdCI6MTY0MjQ3MjUxOX0.gXGwm6DPITjRkzjdikD5dm4gPR1ZUKEP19hZewsDj54";

      // 实例化地图
      /*
      用于构建应用程序的基本小部件。它将所有标准的 Cesium 小部件组合到一个可重用的包中。小部件总是可以通过使用 mixins 来扩展，它添加了对各种应用程序有用的功能。
      */
      const viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain(),
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
        fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处，虽然我关闭了全屏按钮，但是键盘按F11 浏览器也还是会进入全屏
        // 配置地图源:高德影像
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url:
            "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        })
      });
      // 获取图层集合
      const imageryLayers = viewer.imageryLayers;
      // 将图像转成图层
      const UrlTemplate = new Cesium.UrlTemplateImageryProvider({
        url:
          "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
      });

      // 通过图像添加图层
      imageryLayers.addImageryProvider(UrlTemplate);
      // 添加图层
      imageryLayers.add(new Cesium.ImageryLayer(UrlTemplate));
      // 获取图层数
      const layersLength = imageryLayers.length;
      console.log(layersLength);
      // 获取当前索引的图层
      const layersGet = imageryLayers.get(1);
      console.log(layersGet);
      // 获取图层的当前索引
      const layersIndexOf = imageryLayers.indexOf(layersGet);
      console.log(layersIndexOf);
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

      // 加载点位
      viewer.entities.add({
        name: "屌毛",
        // 将经纬度转化成笛卡尔坐标
        position: new Cesium.Cartesian3.fromDegrees(104.1, 30.6, 600),
        // 点
        point: {
          pixelSize: 5, // 当前点的大小
          color: Cesium.Color.RED, // 填充色
          outlineColor: Cesium.Color.WHITE, // 轮廓色
          outlineWidth: 2 // 轮廓线
        },
        // 文字标签
        label: {
          text: "屌毛",
          font: "18px monospace", // 字体大小和字样
          style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 字体展示效果
          fillColor: Cesium.Color.LIME, // 指定填充颜色的属性
          outlineWidth: 3, // 字体轮廓宽度
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
          pixelOffset: new Cesium.Cartesian2(0, -20) // 偏移量
        },
        // 图标
        billboard: {
          image: require("@/assets/map_d.png"),
          width: 18,
          height: 24
        }
      });
      /*   viewer.entities.add({
        name: "实体",
        position: new Cesium.Cartesian3.fromDegrees(104.1, 30.6, 600),
        box: {
          dimensions: new Cesium.Cartesian3(300, 300, 300), // 一个 Cartesian3 属性，用于指定框的长度，宽度和高度。
          material: Cesium.Color.fromCssColorString("#FFD700").withAlpha(0.9) // 配置颜色 withAlpha透明度
        }
      }); */

      /*    viewer.entities.add({
        name: "面",
        position: new Cesium.Cartesian3.fromDegrees(104.1, 30.6, 600),
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
              104.08,
              30.67,
              104.14,
              30.64,
              104.24,
              30.74
            ])
          ),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 4,
          material: Cesium.Color.fromCssColorString("#FFD700")
        }
      }); */
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
