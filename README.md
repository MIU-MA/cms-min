# 还没有写完喵，将就着先看吧

基于 NestJS 的个人博客后台，提供文章管理、音乐管理、文件上传、JWT 认证等接口。

## 待办

- 上传文章功能
- 美化仪表盘
- 实现多网站共用

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（热重载）
npm run start:dev

# 编译
npm run build

# 生产模式
npm run start:prod
```

首次启动会自动创建默认管理员账号 `admin / admin123`。

启动后访问：
- 后端：http://localhost:3002
- API 文档：http://localhost:3002/docs

## 项目结构

```
src/
├── main.ts              # 入口：CORS、静态资源、Scalar 文档
├── app.module.ts        # 根模块：TypeORM 配置
├── auth/                # 认证模块（注册/登录/JWT策略/守卫）
├── articles/            # 文章模块（CRUD）
├── music/               # 音乐模块（CRUD + 同步本地文件）
├── upload/              # 上传模块（图片/音乐/Markdown + 文件浏览/删除）
└── public/              # 静态文件目录
    ├── uploads/         # 图片
    └── music/           # 音乐
```

## API 概览

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/register` | 注册 | — |
| POST | `/api/auth/login` | 登录 | — |
| GET | `/api/articles` | 文章列表 | — |
| GET | `/api/articles/:id` | 文章详情 | — |
| POST | `/api/articles` | 创建文章 | Token |
| PATCH | `/api/articles/:id` | 更新文章 | Token |
| DELETE | `/api/articles/:id` | 删除文章 | Token |
| GET | `/api/music` | 音乐列表 | — |
| GET | `/api/music/:id` | 音乐详情 | — |
| POST | `/api/music` | 添加音乐 | Token |
| PATCH | `/api/music/:id` | 修改音乐 | Token |
| DELETE | `/api/music/:id` | 删除音乐 | Token |
| POST | `/api/music/sync` | 同步本地文件 | Token |
| GET | `/api/upload/images` | 图片列表 | — |
| GET | `/api/upload/musics` | 音乐文件列表 | — |
| GET | `/api/upload/markdowns` | Markdown 列表 | — |
| POST | `/api/upload/image` | 上传图片 | Token |
| POST | `/api/upload/music` | 上传音乐 | Token |
| POST | `/api/upload/markdown` | 导入 Markdown | Token |
| DELETE | `/api/upload/image/:name` | 删除图片 | Token |
| DELETE | `/api/upload/music/:name` | 删除音乐文件 | Token |
| DELETE | `/api/upload/markdown/:name` | 删除 Markdown | Token |

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | 3001 | 服务端口 |
| `JWT_SECRET` | `secret-key-change-in-production` | JWT 签名密钥 |
