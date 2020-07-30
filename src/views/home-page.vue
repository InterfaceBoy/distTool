<template>
  <div class="home-page">
    <Menu active-name="1-2" :open-names="['1']" on-select="handleSelect"></Menu>
  </div>
</template>

<script>
export default {
  name: "home-page",
  mixins: [],
  directives: {},
  components: {},
  props: {
    propData: {
      type: Object
    }
  },
  data() {
    return {
      sthData: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  beforeDestroy() {},
  methods: {
    handleSelect() {}
  }
};
</script>
