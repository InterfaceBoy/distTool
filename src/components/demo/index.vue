<!--
 * @Author: 何元鹏
 * @Date: 2020-05-29 15:55:20
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-05-29 15:58:50
-->
<template>
  <Layout :style="{ height: '100%' }">
    <Sider
      hide-trigger
      :style="{ background: '#fff' }"
    >
      <Menu
        :style="{ height: '100%', overflow: 'auto' }"
        theme="light"
        width="auto"
        @on-select="menuSelect"
      >
        <MenuItem
          v-for="item in menuData"
          :key="item.name"
          :name="item.name"
        >
          {{
          item.name
          }}
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <Content :style="{ padding: '24px', background: '#fff' }">
        <!-- <router-view /> -->
        <component
          :is="currentComp"
          class="comp2-viewer"
        />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import Vue from "vue";

import "highlight.js/styles/atom-one-light.css";

import VueHighlightJS from "vue-highlight.js";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import vue from "vue-highlight.js/lib/languages/vue";
import "highlight.js/styles/atom-one-light.css";

Vue.use(VueHighlightJS, {
  languages: {
    css,
    javascript,
    vue
  }
});

Vue.directive("copy", {
  inserted: function(el, binding) {
    const { value } = binding;
    Object.assign(el.style, {
      position: `relative`,
      width: `90%`
    });
    // 创建一个复制按钮
    const div = document.createElement(`div`);
    Object.assign(div.style, {
      padding: `10px`,
      position: `absolute`,
      right: `5px`,
      top: `5px`,
      cursor: `pointer`
    });
    div.innerHTML = `复制代码`;
    copyHandler(div, value);
    el.appendChild(div);
  }
});

function copyHandler(node, value) {
  node.addEventListener("click", async function() {
    await navigator.clipboard.writeText(value);
    compInstance.$Message.success(`代码已复制到剪切板`);
  });
}

const compMap = {};
let compInstance;
export default {
  name: "comp-demo",
  data: () => ({
    menuData: [],
    currentComp: null
  }),
  created() {
    this.init();
    compInstance = this;
  },
  methods: {
    init() {
      const data = [];
      const req = require.context("./", false, /\.vue$/);
      req.keys().forEach(fileName => {
        if (/\/index\.vue$/.test(fileName)) {
          return;
        }
        const name = fileName.replace(/^\.\/(.*\/)?/, "").replace(/\.vue$/, "");
        const componentConfig = req(fileName);
        data.push({
          name
        });
        compMap[name] = componentConfig.default || componentConfig;
      });
      this.menuData = data;
    },
    menuSelect(name) {
      this.currentComp = compMap[name];
    }
  }
};
</script>

<style lang="scss">
.comp2-viewer {
  h1,
  h2,
  h3 {
    margin: 0.67em 0;
  }
}
</style>
