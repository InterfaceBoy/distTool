<!--
 * @Author: 何元鹏
 * @Date: 2021-05-20 14:32:51
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-12-13 15:47:43
-->
<template>
  <div id="openLayer">
    <div class="cell cell-map">
      <MapContainer
        :geojson="geojson"
        @select="selected = $event"
      ></MapContainer>
    </div>
    <div class="cell cell-edit">
      <Edit :geojson="geojson" @change="geojson = $event"></Edit>
    </div>
    <div class="cell cell-inspect">
      <Inspect :feature="selected"></Inspect>
    </div>
  </div>
</template>

<script>
import MapContainer from "./components/map-container";
import Edit from "./components/edit";
import Inspect from "./components/inspect";

export default {
  name: "OpenLayer",
  components: {
    Inspect,
    Edit,
    MapContainer
  },
  data: () => ({
    selected: undefined,
    geojson: {
      type: "Feature",
      properties: {
        name: "default object",
        quality: "top"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-27.0703125, 43.58039085560784],
            [-28.125, 23.563987128451217],
            [-10.8984375, 32.84267363195431],
            [-27.0703125, 43.58039085560784]
          ]
        ]
      }
    }
  })
};
</script>

<style>
#openLayer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  display: grid;
  grid-template-columns: 100vh;
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}
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
</style>
