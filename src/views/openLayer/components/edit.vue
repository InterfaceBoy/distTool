<template>
  <textarea v-model="geojsonEdit"></textarea>
</template>

<script>
export default {
  name: "Edit",
  props: {
    geojson: Object,
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
      },
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
  resize: none;
}
</style>
