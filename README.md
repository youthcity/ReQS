# ReQS

[体验地址](http://120.77.34.58:8000/)
ReQS前台部署在阿里云，mongodDB部署在国外，接口访问可能较慢。

## 主题名称

「Req」+「Res」 = ReQS
ReQS，取自 `Request`、 `Response`的前三个字母的。

## 主要技术栈

### React + Dva + Antd + roadhog + Express + MongoDB

## 开发环境

- Node.js: v7.9.0
- MongoDB: v3.4.3
- Express: 4.15.2

## 项目介绍

本项目由三部分组成，面向普通用户、游客的问答前台，面向管理员的后台管理系统，以及提供数据持久化的后端。

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

## TODO

- 增加消息提示

## 后台管理系统功能

### 功能性

- 注册用户统计
- 问题总数统计
- 回答总数统计
- 话题总数统计
- 用户信息管理（搜索、添加、修改、删除）
- 话题管理(搜索、添加、更新、删除)
- 问题管理（加精、查询、删除）

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
