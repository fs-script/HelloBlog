# 博客系统

> Node (Express) + SQLite + Vite + Vue3 (Vue-Router + Pinia) + Naive UI

🔗 [在线演示]()

## 一、服务端

### 01、初始化项目

- 安装服务端框架：`npm install express`

- 安装处理文件上传中间件： `npm install multer`

- 安装 SQLite3 数据库操作中间件： `npm install sqlite3`

- 安装 uuid 唯一标志生成中间件： `npm install uuid`

- 安装 cors 处理跨域请求：`npm install cors`

- 使用雪花 ID 算法：`https://gitee.com/baby_muxin/idgenerator/tree/master/Node.js`

### 02、配置中间件

- 处理跨域

- 处理 JSON

- 验证登录状态 (Token)

- 处理文件上传

- 设置静态资源目录

- 注册路由

### 03、创建数据库

- admin 表

| 字段 | 说明 |
| --- | --- |
| id | 唯一标识 |
| account | 用户名 |
| password | 密码 |
| token | 令牌 |

- blog 表

| 字段 | 说明 |
| --- | --- |
| id | 唯一标识 |
| category_id | 文章分类所属 id |
| title | 文章名 |
| content | 文章内容 |
| create_time | 创建时间 |

- category 表

| 字段 | 说明 |
| --- | --- |
| id | 唯一标识 |
| name | 分类名 |

### 04、连接数据库

- 将 db 封装为 Promise

### 05、管理员登录接口

> POST: `/admin/login`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| account | 用户名 | Body (json) |
| password | 密码 | Body (json) |

### 06、文章分类接口

- 添加文章分类

> POST: `/category/_token/add`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| name | 分类名 | Body (json) |
| token | 令牌 | Header |

- 修改文章分类

> PUT: `/category/_token/update`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| id | 分类标识 | Body (json) |
| name | 分类名 | Body (json) |
| token | 令牌 | Header |

- 删除文章分类

> DELETE: `/category/_token/delete`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| id | 分类标识 | Query |
| token | 令牌 | Header |

- 查询文章分类列表

> GET: `/category/list`

### 07、文章接口

- 添加文章

> POST: `/blog/_token/add`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| title | 文章标题 | Body (json) |
| categoryId | 文章分类标识 | Body (json) |
| content | 文章分类 | Body (json) |
| token | 令牌 | Header |

- 修改文章

> PUT: `/blog/_token/update`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| id | 文章标识 | Body (json) |
| title | 文章标题 | Body (json) |
| categoryId | 文章分类标识 | Body (json) |
| content | 文章分类 | Body (json) |
| token | 令牌 | Header |

- 删除文章

> DELETE: `/blog/_token/delete`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| id | 文章标识 | Query |
| token | 令牌 | Header |

- 查询文章

> GET: `/blog/search`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| keyword | 关键词 | Query |
| categoryId | 文章分类标识符 | Query |
| page | 页码 | Query |
| pageSize | 分页大小 | Query |

### 08、上传接口

> POST: `/editor/_token/upload`

| 参数 | 说明 | 备注 |
| --- | --- | --- |
| file | 图片 | Body (form-data) |
| token | 令牌 | Header |

## 二、客户端

### 01、使用 Vite 创建 Vue 项目

- 创建 vite 项目：`npm create vite@latest`

- 安装依赖：`npm install`

- 运行项目：`npm run dev`

### 02、安装模块

- Ajax请求：`npm install axios`

- 状态管理：`npm install pinia`

- 路由管理：`npm install vue-router@4`

- CSS扩展语言：`npm install sass`

- UI组件库与字体：`npm i -D naive-ui`、`npm i -D vfonts`

- 富文本编辑器：`npm install @wangeditor/editor-for-vue@next --save`

- 图标库：`npm i -D @vicons/ionicons5`

### 03、搭建项目

- 引入 UI 组件库

- 引入 Pinia

- 配置 router.js 引入路由

- 引入 Axios 配置服务端默认请求地址

### 04、登录页面

### 05、后台控制面板

- 文章管理

- 分类管理

- 退出登录

### 06、
