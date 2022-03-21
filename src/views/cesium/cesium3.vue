<!--
 * @Author: 何元鹏
 * @Date: 2022-02-16 11:29:42
 * @LastEditors: 何元鹏
 * @LastEditTime: 2022-02-23 14:14:11
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
      // 添加图层
      imageryLayers.add(new Cesium.ImageryLayer(UrlTemplate));
      // 隐藏版权
      viewer._cesiumWidget._creditContainer.style.display = "none";
      // 加载点位
      viewer.entities.add({
        name: "家",
        // 将经纬度转化成笛卡尔坐标
        position: new Cesium.Cartesian3.fromDegrees(104.09939, 30.58687, 130),
        // 文字标签
        label: {
          text: "家",
          font: "16px monospace", // 字体大小和字样
          style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 字体展示效果
          fillColor: Cesium.Color.LIME, // 指定填充颜色的属性
          outlineWidth: 2, // 字体轮廓宽度
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
          pixelOffset: new Cesium.Cartesian2(0, -15) // 偏移量
        },
        // 图标
        billboard: {
          image: require("@/assets/map_d.png"),
          width: 24,
          height: 30
        }
      });
      // 利用笛卡尔坐标定位
      viewer.camera.flyToBoundingSphere(
        new Cesium.BoundingSphere(
          Cesium.Cartesian3.fromDegrees(104.09939, 30.58687, 130),
          600
        )
      );
      // 监听地图点击事件
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      // 左击事件
      handler.setInputAction(click => {
        viewer.entities.removeAll();
        // 获取canvas屏幕坐标
        console.log(click.position);
        // 屏幕坐标转世界坐标
        const cartesian = viewer.camera.pickEllipsoid(click.position);
        console.log(cartesian);
        // 加载点位
        viewer.entities.add({
          name: "家",
          // 将经纬度转化成笛卡尔坐标
          position: cartesian,
          // 文字标签
          label: {
            text: "家",
            font: "16px monospace", // 字体大小和字样
            style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 字体展示效果
            fillColor: Cesium.Color.LIME, // 指定填充颜色的属性
            outlineWidth: 2, // 字体轮廓宽度
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
            pixelOffset: new Cesium.Cartesian2(0, -15) // 偏移量
          },
          // 图标
          billboard: {
            image: require("@/assets/map_d.png"),
            width: 24,
            height: 30
          }
        });
        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cartographic = ellipsoid.cartesianToCartographic(cartesian);
        console.log(cartographic);
        // 将弧度转为度的十进制度表示，保留5位小数
        const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
        const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
        console.log(`经度：${lon}, 纬度：${lat}`);
        // 将经纬度转成弧度
        const longitude = Cesium.Math.toRadians(lon).toFixed(5);
        const latitude = Cesium.Math.toRadians(lat).toFixed(5);
        console.log(`经弧度：${longitude}, 纬弧度：${latitude}`);

        const cartographic1 = new Cesium.Cartographic(lon, lat, 100);
        console.log(cartographic1);
        // 方法二：
        const cartographic2 = Cesium.Cartographic.fromDegrees(
          parseFloat(lon),
          parseFloat(lat),
          100
        );
        console.log(cartographic2);
        // 方法三：
        const cartographic3 = Cesium.Cartographic.fromRadians(lon, lat, 100); // 其中，longitude和latitude为弧度
        console.log(cartographic3);
        viewer.entities.add({
          name: "线",
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              parseFloat(lon),
              parseFloat(lat),
              0,
              parseFloat(lon),
              parseFloat(lat),
              100
            ]),
            width: 1,
            // 材质设置
            material: new Cesium.Color.fromCssColorString("#108de7")
          }
        });
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // 左击双击事件
      handler.setInputAction(click => {
        // 获取场景中的几何体对象，当场景中不存在几何体是返回undefined
        const pick = viewer.scene.pick(click.position);
        if (pick) {
          // 将笛卡尔坐标转换为地理坐标，返回的是地球经纬度的弧度
          const cartographic = Cesium.Cartographic.fromCartesian(
            // 几何体在场景中的笛卡尔坐标
            pick.id.position._value
          );
          console.log(cartographic);
          // 将弧度转为度的十进制度表示，保留5位小数
          const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
          const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);

          if (lon && lat) {
            const Cartesian3 = Cesium.Cartesian3.fromDegrees(
              parseFloat(lon),
              parseFloat(lat),
              parseFloat(cartographic.height)
            );
            console.log(Cartesian3);
            // 利用笛卡尔坐标定位
            viewer.camera.flyToBoundingSphere(
              new Cesium.BoundingSphere(Cartesian3, 600)
            );
            viewer.entities.add({
              name: "线",
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                  parseFloat(lon),
                  parseFloat(lat),
                  0,
                  parseFloat(lon),
                  parseFloat(lat),
                  parseFloat(cartographic.height)
                ]),
                width: 1,
                // 材质设置
                material: new Cesium.Color.fromCssColorString("#108de7")
              }
            });
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      // 中键单击事件
      handler.setInputAction(click => {
        // 屏幕坐标转世界坐标
        const cartesian = viewer.camera.pickEllipsoid(click.position);
        console.log(cartesian);
        viewer.entities.add({
          name: "实体",
          position: cartesian,
          box: {
            dimensions: new Cesium.Cartesian3(200, 200, 200), // 一个 Cartesian3 属性，用于指定框的长度，宽度和高度。
            material: Cesium.Color.fromCssColorString("#FFD700").withAlpha(1) // 配置颜色 withAlpha透明度
          }
        });
      }, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);
      // 右击事件
      handler.setInputAction(click => {
        const pick = viewer.scene.pick(click.position);
        console.log(pick);
        viewer.entities.remove(pick.id);
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
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
