<template>
  <div id="app">
   <router-view />
  </div>
</template>
<script>
import Layout from "@/layout/Layout.vue";
export default {
 // 局部注册的组件
  // components: {Layout},
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
