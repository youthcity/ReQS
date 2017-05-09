# SF

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

### step 4

#### 基础设施

##### Ajax请求封装

我们使用axios作为我们ajax库



