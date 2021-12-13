<!--
 * @Author: 何元鹏
 * @Date: 2021-08-30 11:13:53
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-12-13 15:15:18
-->
<template>
  <div></div>
</template>

<script>
export default {
  // 组件名称
  name: "Demo",
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
    return {
      tree: [
        {
          name: "一号",
          age: 100,
          children: [
            {
              name: "一号大儿子",
              age: 75,
              children: [
                {
                  name: "一号大孙子",
                  age: 50,
                  children: [{ name: "一号大重孙子", age: 25, children: [] }]
                },
                { name: "一号二孙子", age: 49, children: [] }
              ]
            },
            {
              name: "一号二儿子",
              age: 65,
              children: [
                { name: "一号二儿子的大儿子", age: 38, children: [] },
                { name: "一号二儿子的二儿子", age: 35, children: [] }
              ]
            }
          ]
        }
      ],
      list: [
        {
          id: "p1",
          title: "广东"
        },
        {
          id: "p1-1",
          pid: "p1",
          title: "广州"
        },
        {
          id: "p2",
          title: "四川"
        },
        {
          id: "p2-1",
          pid: "p2",
          title: "成都"
        },
        {
          id: "p2-2",
          pid: "p2",
          title: "德阳"
        },
        {
          id: "p2-3",
          pid: "p2",
          title: "绵阳"
        },
        {
          id: "p2-1-1",
          pid: "p2-1",
          title: "高新区"
        }
      ]
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {},
  mounted() {
    this.grammarGet();
    this.treeConversionListArray(this.tree);
    this.listConversionTree(this.list);
    this.interviewQuestions();
  },
  // 组件方法
  methods: {
    /**
     * @description:
     * @param {*}
     * @return {*}
     */
    interviewQuestions() {
      const x = 1;
      function f(
        x,
        y = function() {
          x = 3;
          console.log(x);
        }
      ) {
        console.log(x);
        x = 2;
        y();
        console.log(x);
      }
      f();
      console.log(x);
    },
    /**
     * @description: class方法
     * @param {*}
     * @return {*}
     */
    grammarGet() {
      function Point(x, y) {
        this.x = x;
        this.y = y;
      }

      Point.prototype.a = function() {
        return this.x + this.y;
      };

      const p = new Point(1, 2);
      console.log(p);

      class Points {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }

        toString() {
          return this.x + this.y;
        }
      }
      const s = new Points(1, 2);
      console.log(s);
    },
    /**
     * @description:tree树形转list数组
     * @param {*}
     * @return {*}
     */
    treeConversionListArray(tree) {
      // 方法一：
      const dataList = tree.map(i => {
        return deepFirstSearch(i, []);
      });
      function deepFirstSearch(node, nodeList) {
        if (node) {
          nodeList.push(node);
          const children = node.children;
          for (
            let i = 0;
            i < children.length;
            i++ // 每次递归的时候将 需要遍历的节点 和 节点所存储的数组传下去
          ) {
            deepFirstSearch(children[i], nodeList);
          }
        }
        return nodeList;
      }
      return dataList;
      /*
      // 方法二
      let list = [];
      function treeDataList(tree, listData) {
        console.log(listData);
        tree.forEach((i) => {
          const { children, ...other } = i;
          if (children.length > 0) {
            treeDataList(children, Object.assign({}, listData, other));
          } else {
            console.log(other, listData);
            list.push(Object.assign({}, listData, other));
          }
        });

        console.log(list);
      }
      treeDataList(tree, {});
      return list; */
      /*  const list = [];
      const queue = [...tree];
      console.log(queue, queue.length, queue === tree);
      while (queue.length) {
        const node = queue.pop()
        const nodeChildren = node.children;
        if (nodeChildren) {
          queue.push(...nodeChildren);
        }
        const { children, ...other } = node;
        list.push(other);
      }
      return list;
      */
    },
    /**
     * @description: list数组转tree树形
     * @param {*}
     * @return {*}
     */
    listConversionTree(list) {
      // 方法一：双层循环
      list.forEach(child => {
        const pid = child.pid;
        if (pid) {
          list.forEach(parent => {
            if (parent.id === pid) {
              parent.children = parent.children || [];
              parent.children.push(child);
            }
          });
        }
      });
      return list.filter(n => !n.pid);
      /*
      // 递归组装
      const tree = [];
      for (const node of list) {
        // 如果没有pid就可以认为是根节点
        if (!node.pid) {
          let p = { ...node };
          p.children = getChildren(p.id, list);
          tree.push(p);
        }
      }
      function getChildren(id, list) {
        const children = [];
        for (const node of list) {
          if (node.pid === id) {
            children.push(node);
          }
        }

        for (const node of children) {
          const children = getChildren(node.id, list);
          if (children.length) {
            node.children = children;
          }
        }

        return children;
      }
      console.log(tree);
      return tree; */
    }
  }
};
</script>

<style scoped lang="scss"></style>
