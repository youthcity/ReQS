# SF

## 主题名称

ReQS，取自 Request、 Response

## 构建过程

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

根据我们项目的设计，结构为

```HTML
header
main
footer
```




