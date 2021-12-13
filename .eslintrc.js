module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "no-console": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false
      }
    ],
    // prop属性名使用连字符
    "vue/attribute-hyphenation": "off",
    // 如果prop为required则必须具有默认值
    "vue/require-default-prop": "off",
    // 组件名称必须为PascalCase
    "vue/component-definition-name-casing": "error",
    // 组件内各属性顺序
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          "inheritAttrs",
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "ROUTER_GUARDS",
          "beforeCreate",
          "created",
          "beforeMount",
          "mounted",
          "beforeUpdate",
          "updated",
          "activated",
          "deactivated",
          "beforeDestroy",
          "destroyed",
          "methods",
          ["template", "render"],
          "renderError"
        ]
      }
    ],
    "vue/no-template-shadow": "error",
    "vue/prop-name-casing": "error",
    "vue/require-prop-types": "warn",
    "vue/no-v-html": "warn",
    "vue/this-in-template": "error",
    "vue/v-bind-style": "warn",
    "vue/v-on-style": "warn",
    "vue/v-slot-style": "warn",
    // element或component上的属性排序
    "vue/attributes-order": "off",
    // html自闭合标签规则
    "vue/html-self-closing": "off",
    // 新增一些重要rules
    // 要求使用 let 或 const 而不是 var
    "no-var": 2,
    // 注释前空格
    "spaced-comment": ["error", "always"],
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 要求或禁止 var 声明中的初始化(初值)
    "init-declarations": 0,
    // 禁用 eval()
    "no-eval": 2,
    // 要求 for-in 循环中有一个 if 语句
    "guard-for-in": 0,
    // 禁止重复声明变量
    "no-redeclare": 2,
    // 不允许省略大括号
    curly: "error",
    // else 语句不应出现在含有 return 语句的 if 语句之后
    "no-else-return": "error",
    // 函数内没有使用this时不需要使用bind
    "no-extra-bind": "error",
    // 禁止不必要的return await语句
    "no-return-await": "error",
    // 禁止逗号操作符
    "no-sequences": "error",
    // async函数中必须具有await表达式
    "require-await": "error",
    // else 中不允许出现唯一的if语句，应该被替换为 else if
    "no-lonely-if": "error",
    // 禁止不必要的boolean类型的三元表达式
    "no-unneeded-ternary": "error",
    // 类的成员间应出现空行
    "lines-between-class-members": ["error", "always"],
    // 空行填充
    "padding-line-between-statements": [
      "error",
      // import语句段结束之后需要有空行
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "any", prev: "import", next: "import" }
    ],
    // 单个模块的所有的导入应该在一条import语句中
    "no-duplicate-imports": "error",
    // 对于声明后未改变赋值的变量需要使用const声明
    "prefer-const": "error",
    // 使用三等号而不是双等号
    eqeqeq: "warn",
    // 禁止在return语句中出现赋值语句
    "no-return-assign": "error",
    // 禁止在循环中使用一成不变的条件
    "no-unmodified-loop-condition": "error",
    // 禁止不必要的return语句
    "no-useless-return": "error",
    // 不推荐使用alert、confirm 和 prompt
    "no-alert": "warn"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
