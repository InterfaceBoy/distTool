<!--
 * @Author: 何元鹏
 * @Date: 2021-05-20 16:16:48
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-12-13 15:45:43
-->
<template>
  <textarea v-model="geojsonEdit"></textarea>
</template>

<script>
export default {
  name: "Edit",
  props: {
    geojson: Object
  },
  computed: {
    geojsonEdit: {
      set(value) {
        console.log(value);
        this.$emit("change", JSON.parse(value));
      },
      get() {
        console.log(this.geojson);
        return JSON.stringify(this.geojson, null, " ");
      }
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
  resize: none;
}
</style>
