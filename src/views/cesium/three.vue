<!--
 * @Author: 何元鹏
 * @Date: 2022-01-18 10:20:27
 * @LastEditors: 何元鹏
 * @LastEditTime: 2022-02-16 14:25:05
-->
<template>
  <div>
    <div class="three" id="WebGL-output"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GUI } from "dat.gui";

export default {
  // 组件名称
  name: "Three",
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    cs: {
      type: String,
      default: () => ""
    }
  },
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},

  created() {},

  mounted() {
    this.initThree();
  },

  // 组件方法
  methods: {
    initThree() {
      // 场景
      const scene = new THREE.Scene();
      // 摄像机
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      // 定位并将相机指向场景的中心
      camera.position.set(-30, 40, 30);
      camera.lookAt(scene.position);

      const renderer = new THREE.WebGLRenderer();
      // 场景底色
      renderer.setClearColor(new THREE.Color(0xeeeeee));
      // 场景大小
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 设置场景阴影
      renderer.shadowMapEnabled = true;

      // 设置光源
      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, -10);
      // 开启阴影功能
      spotLight.castShadow = true;
      // 控制阴影的精细程度
      spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      spotLight.shadow.camera.far = 130;
      spotLight.shadow.camera.near = 40;
      scene.add(spotLight);

      // 创建坐标轴
      const axes = new THREE.AxisHelper(20);
      scene.add(axes);

      // 设置平面（1、宽、高设置 ；2、平面外观设置）
      const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
      // MeshBasicMaterial材质不受光源影响
      const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;

      // 旋转和定位平面
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.set(0, 0, 0);
      scene.add(plane);
      // 将渲染器的输出添加到 html 元素
      document.getElementById("WebGL-output").appendChild(renderer.domElement);
      // 设置正方体
      const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      // MeshLambertMaterial受光源影响
      const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      // 允许物体产生阴影
      cube.castShadow = true;
      cube.position.set(-4, 3, 0);
      scene.add(cube);

      // 设置圆
      const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.position.set(20, 4, 2);
      scene.add(sphere);

      // 将渲染器的输出添加到 html 元素
      document.getElementById("WebGL-output").appendChild(renderer.domElement);

      // 渲染场景
      let step = 0;
      const controls = new (function() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
      })();
      const gui = new GUI();
      gui.add(controls, "rotationSpeed", 0, 0.5);
      gui.add(controls, "bouncingSpeed", 0, 0.5);

      renderScene();

      function renderScene() {
        // 围绕其轴旋转立方体
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        // 上下反弹球体
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

        // 渲染
        requestAnimationFrame(renderScene);

        renderer.render(scene, camera);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.three {
  width: 100%;
  height: 100vh;
  position: relative;
  &-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
