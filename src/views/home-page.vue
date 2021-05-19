<template>
  <div class="home-page">
    <div class="cell cell-map">
      <div ref="map-root" style="width: 100%; height: 100%"></div>
    </div>
    <div class="cell cell-edit">Edit</div>
    <div class="cell cell-inspect">Inspect</div>
  </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import "ol/ol.css";

// 功能
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
export default {
  name: "home-page",
  mixins: [],
  directives: {},
  components: {},
  props: {
    propData: {
      type: Object,
    },
  },
  data() {
    return {
      sthData: {},
      geometryData: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-27.0703125, 43.58039085560784],
              [-28.125, 23.563987128451217],
              [-10.8984375, 32.84267363195431],
              [-27.0703125, 43.58039085560784],
            ],
          ],
        },
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    this.handleSelect();
  },
  methods: {
    handleSelect() {
      // a feature (geospatial object) is created from the GeoJSON
      const feature = new GeoJSON().readFeature(this.geometryData, {
        // this is required since GeoJSON uses latitude/longitude,
        // but the map is rendered using “Web Mercator”
        featureProjection: "EPSG:3857",
      });

      // a new vector layer is created with the feature
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [feature],
        }),
      });
      // this is where we create the OpenLayers map
      new Map({
        // the map will be created using the 'map-root' ref
        target: this.$refs["map-root"],
        layers: [
          // adding a background tiled layer
          new TileLayer({
            source: new OSM(), // tiles are served by OpenStreetMap
          }),
          vectorLayer,
        ],

        // the map view will initially show the whole world
        view: new View({
          zoom: 0,
          center: [0, 0],
          constrainResolution: true,
        }),
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  display: grid;
  grid-template-columns: 100vh;
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  .cell {
    border-radius: 4px;
    background-color: lightgrey;
  }

  .cell-map {
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .cell-edit {
    grid-column: 2;
    grid-row: 1;
  }

  .cell-inspect {
    grid-column: 2;
    grid-row: 2;
  }
}
</style>
