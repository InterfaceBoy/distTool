<!--
 * @Author: 何元鹏
 * @Date: 2020-07-31 11:03:21
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-08-23 10:59:14
-->

<template>
  <div class="app-main">
    <header class="app-main-header">
      <Menu
        mode="horizontal"
        active-name="1"
        theme="dark"
        @on-select="handelMenuItemSelect"
      >
        <MenuItem
          v-for="(item, index) in routerHome"
          :key="index"
          :name="JSON.stringify(item)"
        >
          <Icon :type="item.meta.icon" />
          {{ item.meta.title }}
        </MenuItem>
      </Menu>
    </header>
    <article class="app-main-center">
      <aside class="app-main-center-right">
        <menu-layout :subordinateRoute="subordinateRoute"></menu-layout>
      </aside>
      <section class="app-main-center-left">
        <router-view :key="key" />
      </section>
    </article>
    <footer class="app-main-footer"></footer>
  </div>
</template>

<script>
import store from "@/store";
export default {
  // 组件名称
  name: "Layout",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      subordinateRoute: store.getters["app/getRouterInfo"]
    };
  },
  // 计算属性
  computed: {
    routerHome() {
      console.log(this.$router.options.routes, this.$route.path);
      return this.$router.options.routes;
    },
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    handelMenuItemSelect(e) {
      const routeInfo = JSON.parse(e);
      const { name, children } = routeInfo;
      this.subordinateRoute = children?.length < 2 ? [] : children;
      this.$router.push({
        name
      });
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {
    console.log(store.getters["app/RouterInfo"]);
  },
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {}
};
</script>

<style scoped lang="scss">
.app-main {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 4.29rem auto 3rem;
  &-header {
    height: 4.29rem;
  }
  &-center {
    display: grid;
    grid-template-columns: 12rem auto;
    grid-template-rows: 100%;
    &-right {
      width: 12rem;
      border-right: 1px solid #eee;
    }
    &-left {
      width: 100%;
    }
  }
  &-footer {
    height: 3rem;
    border-top: 1px solid #eee;
  }
}
</style>
