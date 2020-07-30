# vue-base-template 1.0

🚀 开箱即用的 vue 项目基础框架解决方案 (非 gis，不接运维版)

**gis、运维版皆在该骨架基础上加料**

## feature

- 符合规范的组织结构
- 提供常用工具的配置
- 配置文件读取
- 自动加载全局组件&vuex modules
- eventBus 解决方案
- rem
- iview
- svg 图标
- hjson
- yarn commit
- ie 11
- bable 可选链
- gzip
- dart-sass

## 开发环境

- nodejs >= 10
- vscode（插件安装 vetur、eslint、prettier、gitlens、Hjson、koroFileHeader）
- yarn (不能用 npm 安装依赖)

## 开发过程

```
开发
yarn serve

提交
xcli commit && git push

生产
yarn build
```

## 目录结构

```
├── README.md
├── .env                            # 全局环境
├── .env.development                # 开发环境
├── .env.production                 # 生产环境
├── .env.staging                    # 现场版环境
├── babel.config.js                 # babel
├── yarn.lock                       # package🔐
├── package.json                    # package管理
├── postcss.config.js               # postcss配置
├── public
│   ├── favicon.ico                 # 系统图标
│   ├── index.html                  # 单页面
│   └── static                      # 本地自定义json
├── src
│   ├── main.js                     # 项目入口文件
│   ├── App.vue                     # Vue根组件
│   ├── api                         # 后端api统一管理
│   ├── assets                      # 静态文件
│   ├── components                  # 通用组件
│   ├── icon                        # icon
│   ├── router                      # 路由表管理
│   │   └── routes
│   ├── store                       # vuex
│   ├── styles                      # 全局scss变量、全局样式
│   ├── utils                       # 通用工具函数
│   └── views                       # 页面
│       ├── xxx                   # 业务页面
│       ├── xxx                    # 业务页面
│       ├── xxx                    # 业务页面
│       └── xxx                 # 业务页面
└── vue.config.js                   # 工程配置文件
```

## 规范约束

- [风格指南](http://elb-791125809.cn-northwest-1.elb.amazonaws.com.cn:5335/xdata/xdata-FE/awesome/-/issues/10)

- git 提交规范 (use xcli commit)

## 开发协同

- 禅道:xxxx

- 蓝湖:xxx

- MockServer:xxx

- Swagger:xxx

## 版本发布

| 版本号 | 关联模块 | 发布功能 | 发布时间      |
| ------ | -------- | -------- | ------------- |
| v1.0.0 | xxx      | xxx      | YYYY-MM-DD-HH |

> 详细更新日志：CHANGELOG

## 关联人员

| 角色     | 人员 |
| -------- | ---- |
| 产品经理 | xxx  |
| 需求负责 | xxx  |
| 技术经理 | xxx  |
| 前端开发 | xxx  |
| 后台开发 | xxx  |
| 计算开发 | xxx  |
| 交互设计 | xxx  |

## 特殊说明

- icon 使用 `svg` 图标，`/svg页面`可以看到已有的 svg 图标，如果遇到单色图标无法设置颜色，请到`svg`源文件中删除**path 标签或者 g 标签下的 fill、fill-rule 属性！**
- 不能随意安装第三方库，安装之前需求征求系统负责人的同意
- 在同时开发多个模块时，如有遇到很多同样的组件，都统一抽到 components 全局组件下
- 已经安装 bable 可选链插件，使用方式见 [可选链](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- 蓝湖 rem，应设为 **19.2**，并设置**数值保留 2 位小数**，小于**3**的间距，可以使用 px
- scss 深度选择器 /deep/ 已被弃用，改成 >>>

## TODO

- 提供 layout 层示例
- 全局组件、全局工具函数
- jest 测试框架集成
