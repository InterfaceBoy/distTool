<!--
 * @Author: raojw
 * @Date: 2020-05-29 16:00:28
 * @LastEditors: raojw
 * @LastEditTime: 2020-05-29 16:16:50
-->
<template>
  <div>
    <SvgIcon name="vue" />
    <highlight-code lang="vue" :code="code" v-copy="code" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: `<SvgIcon name="vue" />`
    };
  }
};
</script>
