<template>
  <div class="maps">
    <div ref="map-root" style="width: 100%; height: 100%"></div>
    <div class="ol-popup" ref="olPopup">定位点</div>
  </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import {
  defaults as defaultInteractions,
  DragRotateAndZoom
} from "ol/interaction";
import { defaults, FullScreen, MousePosition, ScaleLine } from "ol/control";
import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
// eslint-disable-next-line no-unused-vars
import { createRegularPolygon, createBox } from "ol/interaction/Draw";
// eslint-disable-next-line no-duplicate-imports
import { Modify } from "ol/interaction";
// eslint-disable-next-line no-duplicate-imports
import { Draw } from "ol/interaction";

import "ol/ol.css";

export default {
  name: "MapContainer",
  components: {},
  props: {},
  mounted() {
    /*
    创建地图实例
    */
    this.olMap = new Map({
      target: this.$refs["map-root"],
      loadTilesWhileAnimating: true,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        // fromLonLat方法能将坐标从经度/纬度转换为其他投影
        center: fromLonLat([120.771441, 30.756433]), // 地图中心点
        zoom: 15, // 缩放级别
        minZoom: 0, // 最小缩放级别
        maxZoom: 18, // 最大缩放级别
        constrainResolution: true // 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
      }),
      // 用于地图旋转
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      controls: defaults().extend([
        new FullScreen(), // 全屏
        new MousePosition(), // 显示鼠标当前位置的经纬度
        new ScaleLine() // 显示比例尺
      ])
    });
    /*
    获取四至范围
    */
    const range = this.olMap.getView().calculateExtent(this.olMap.getSize());
    const state = {
      minLon: range[0],
      minLat: range[1],
      maxLon: range[2],
      maxLat: range[3],
      zoomLevel: this.olMap.getView().getZoom() // 当前缩放级别，缩放级别可用来判断是否要将要素聚合进行显示
    };
    console.log(state);
    /*
    创建标记点
    */
    const marker = new Overlay({
      element: this.$refs.olPopup,
      positioning: fromLonLat([120.771441, 30.756434]), // 根据position属性的位置来进行相对点位
      offset: [-17, 17], // 在positioning之上再进行偏移
      autoPan: true
    });
    this.olMap.addOverlay(marker);

    /*
    创建标记点icon
     */
    // 实例化要素
    const feature = new Feature({
      geometry: new Point([120.771441, 30.756433]) // 地理几何图形选用点几何
    });

    // 设置样式，这里就是显示一张图片icon
    feature.setStyle([
      new Style({
        image: new Icon({
          anchor: [0.5, 1], // 显示位置
          size: [18, 28], // 尺寸
          src: require("@/assets/map_d.png") // 图片url
        })
      })
    ]);

    // 矢量源
    const source = new VectorSource({
      features: [feature]
    });
    // 矢量图层
    const vector = new VectorLayer({
      source: source
    });
    // 添加到地图
    this.olMap.addLayer(vector);

    /*
    画园或者画四边形
    */
    // createRegularPolygon方法执行后返回一个创建正方形的geometryFunction
    // createBox方法执行后返回一个创建长方形的geometryFunction

    const draw = new Draw({
      source: source,
      type: "Circle",
      // geometryFunction: createBox(),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1], // 显示位置
          size: [12, 24], // 尺寸
          src: require("@/assets/map_d.png") // 图片url
        })
      })
    });
    // 监听完成事件
    draw.on("drawend", e => {
      console.log(e);
      // 如果只需要放置一个的话可以移除该交互，否则可以一直添加
      this.olMap.removeInteraction(draw);
    });
    this.olMap.addInteraction(draw);

    /* 可拖动多边形 */
    const modify = new Modify({
      source
    });
    this.olMap.addInteraction(modify);
  }
};
</script>
<style lang="scss" scoped>
.maps {
  width: 100%;
  height: 100vh;
  .ol-popup {
    position: absolute;
    z-index: 100;
    color: red;
    width: 100px;
    height: 100px;
    top: 0;
  }
}
</style>
