<!--
 * @Author: 何元鹏
 * @Date: 2021-05-20 16:17:40
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-12-13 15:45:38
-->
<template>
  <div ref="map-root" style="width: 100%; height: 100%"></div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

export default {
  name: "MapContainer",
  components: {},
  props: {
    geojson: Object
  },
  data: () => ({
    olMap: null,
    vectorLayer: null,
    selectedFeature: null
  }),
  watch: {
    geojson(value) {
      this.updateSource(value);
    },
    selectedFeature(value) {
      this.$emit("select", value);
    }
  },
  mounted() {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    });
    this.olMap = new Map({
      target: this.$refs["map-root"],
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      view: new View({
        zoom: 0,
        center: [121.498586, 31.239637],
        constrainResolution: true
      })
    });
    this.olMap.on("pointermove", event => {
      const hovered = this.olMap.forEachFeatureAtPixel(
        event.pixel,
        feature => feature
      );
      if (hovered !== this.selectedFeature) {
        this.$set(this, "selectedFeature", hovered);
      }
    });
    this.updateSource(this.geojson);
  },
  methods: {
    updateSource(geojson) {
      const view = this.olMap.getView();
      const source = this.vectorLayer.getSource();
      const features = new GeoJSON({
        featureProjection: "EPSG:3857"
      }).readFeatures(geojson);
      source.clear();
      source.addFeatures(features);
      view.fit(source.getExtent());
    }
  }
};
</script>
