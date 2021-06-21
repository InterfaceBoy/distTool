<!--
 * @Author: 何元鹏
 * @Date: 2021-06-11 14:49:57
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-06-17 14:27:04
-->
<template>
  <div class="login">
    <div class="login-main active">
      <div class="switchWrapper">
        <div class="text flexCenter">去登录</div>
        <div class="text flexCenter">去注册</div>
      </div>
    </div>
    <div class="login-features">
      <div class="login-box">
        <div class="">注册内容区</div>
      </div>
      <div class="login-sign">
        <div class="">登录内容区</div>
      </div>
    </div>

    <!-- <div class="main">
      <div class="switchWrapper flexCenter">
        <div class="btn flexCenter">
          <div class="text flexCenter">去登录</div>
          <div class="text flexCenter">去注册</div>
        </div>
      </div>
    </div>
    <div class="outerBox">
      <div class="container ">
        <div class="signInBox">注册内容区</div>
      </div>
      <div class="container ">
        <div class="signInBox">登录内容区</div>
      </div>
    </div> -->
  </div>

</template>

<script>
export default {
  // 组件名称
  name: 'demo',
  // 组件参数 接收来自父组件的数据
  props: {
        cs: {
             type: String,
             default: () => ''
       }
      },
  // 局部注册的组件
  components: {},
  // 组件状态值



  data () {
   return {
   }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {

  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 在实例初始化之后，组件属性计算之前，如data属性等
  */
  beforeCreate () {
  },
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性–
  */
  created () {
  },
  /**
  * 在挂载开始之前被调用：相关的 render 函数首次被调用。
  */
  beforeMount () {
  },
  /**
  * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该–
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用–也在文档内。
  */
  mounted () {
 const main = document.querySelector('.main');
      const btn = document.querySelector('.btn');
      const signInBox = document.querySelector('.signInBox');
      btn.onclick = () => {
        if (main.className.indexOf('active') != -1) {
          main.className = 'main';
          setTimeout(() => {
            signInBox.innerText = '注册内容区';
          }, 500);
        } else {
          main.className = 'main active';
          setTimeout(() => {
            signInBox.innerText = '登录内容区';
          }, 500);
        }
      };
  },
  /**
  * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
  * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重–
  */
  beforeUpdate () {
  },
  /**
  * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后–子。
  * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以–DOM 的操作。
  */
  updated () {

  },
  /**
  * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
  */
  activated () {
  },
  /**
  * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
  */
  deactivated () {
  },
  /**
  * 实例销毁之前调用。在这一步，实例仍然完全可用。
  */
  beforeDestroy () {
  },
  /**
  * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
  * 所有的事件监听器会被移除，所有的子实例也会被销毁。
  */
  destroyed () {
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: relative;
  &-main {
    position: absolute;
    width: 50%;
    height: 100%;
    background-image: url("../assets/bk.jpg");
    background-size: cover;
    background-position: top left;
    transition: transform 3s ease-in-out;
    transform: translateX(100%);
  }
  .active {
    transform: translateX(0%);
  }
  &-features {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 50%;
    grid-template-rows: 100%;
    grid-auto-flow: column;
  }
}
</style>
<style scoped lang="scss">
// .body {
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   .flexCenter {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .main {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     margin: auto;
//     overflow: hidden;

//     .text {
//       width: 100%;
//       height: 100%;
//       transition: all 1.5s ease-in-out;
//     }
//   }
//   .outerBox {
//     width: 100%;
//     height: 100%;
//     display: grid;
//     grid-template-columns: 50%;
//     grid-template-rows: 100%;
//     .container {
//     }
//   }
// }

// .switchWrapper {
//   position: absolute;
//   z-index: 99;
//   left: 0;
//   overflow: hidden;
//   width: 50%;
//   height: 100%;
//   background-color: rgba(255, 255, 255, 0.4);
//   transition: transform 1s ease-in-out;
// }
// .btn {
//   position: absolute;
//   width: 90px;
//   height: 36px;
//   color: #fffffe;
//   background-color: #ff8906;
//   font-size: 15px;
//   border-radius: 30px;
//   cursor: pointer;
//   flex-wrap: wrap;
//   overflow: hidden;
// }

// .active .switchWrapper {
//   transform: translateX(100%);
// }

// .active .outerBox {
//   transform: translateX(calc(50% + 100%));
// }
// .switchWrapper::after {
//   content: "";
//   display: block;
//   background-image: url("../assets/bk.jpg");
//   background-size: 990px 100%;
//   background-position: top left;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   transition: all 1s ease-in-out;
// }

// .active .switchWrapper::after {
//   background-position: top right;
// }

/* .active .text:first-child {
  margin-top: -100%;
} */
</style>
