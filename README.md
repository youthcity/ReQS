# ReQS

## 主题名称

「Req」+「Res」 = ReQS
ReQS，取自 `Request`、 `Response`的前三个字母的。

## 特点

- 全站JavaScript（ALL IN JavaScript）
- 浅度响应式设计
- 前后端分离，`CORS`解决跨域
- Restful后端接口（一共34个接口），后端可复用
- 全站ES6（ECMAScript 6，JavaScript语言标准，2015年6月发布）语法编写
- 使用Redux进行状态管理

## 主要技术栈

### React + Dva + Antd + roadhog + Express + MongoDB

## 开发环境

- Node.js: v7.9.0
- MongoDB: v3.4.3
- Express: 4.15.2

## 主要功能

- 提问
- 回答
- 评论
- 点赞
- 投票
- 搜索
- 关注
- 上传图片
- 个人信息管理
- 访问次数计数
- 集成社会化分享
- 回答排序
- 回到顶部

## 通用功能

- 注册
- 登录
- 注销
- 用户状态持久化

## 非功能性

- 浅度响应式设计 (针对1366px页面和 768px页面)
- 时间动态化显示

## 后台管理系统功能

### 功能性

- 注册用户统计
- 问题总数统计
- 回答总数统计
- 话题总数统计
- 用户信息管理（搜索、添加、修改、删除）
- 话题管理(搜索、添加、更新、删除)
- 问题管理（加精、查询、删除）

### 非功能性

- 浅度响应式设计
- 导航栏伸展持久化
- 导航栏颜色持久化
- 多级导航（侧边栏导航、面包屑导航）

## Web安全

### XSS防御

[测试脚本](http://www.cnblogs.com/dsky/archive/2012/04/06/2434768.html)
[未做XSS防御页面](https://jsfiddle.net/jhg34rfs/)

## 用到的知识

### session

当用户首次登入时，服务器为该用户创建一个 session ID，同时向游览器传送一个 cookie，cookie保存会话连接中用到的数据，session ID作为会话标识，游览器后续的请求均基于该session ID。

### 关于RESTful（表现层状态转移） API

作者Roy Fielding
URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作

> (1）每一个URI代表一种资源；
>（2）客户端和服务器之间，传递这种资源的某种表现层；
>（3）客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。

### Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。

## 用到的工具

- `react-markdown`

## 前台构建过程

### step 1

- `dva new sf`
- `cd sf`

### step 2

- `npm i antd --save`
- `npm i babel-plugin-import --save-dev`

在 修改 .roadhogrc，在 "extraBabelPlugins" 里加上：
`["import", { "libraryName": "antd", "style": "css" }]`

### step 3

修改roadhog版本
`cnpm install roadhog@0.6.0-beta.6 --save-dev`

### step 4 基础设施

#### Ajax请求封装

我们使用`axios`作为我们ajax库

### step 5 路由设置

### step 6 组件开发
