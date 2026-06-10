# GitHub Actions 自动部署说明

每次 `git push` 到 `main` 分支，自动编译并部署到宝塔服务器。

## 工作流做了什么

1. checkout 代码
2. 安装依赖 + TypeScript 编译
3. 把 `dist/`、`public/`、`package.json`、`ecosystem.config.js` 传到服务器
4. SSH 远程执行 `npm install --production` + `pm2 restart`

## 使用前配置

### 1. 服务器准备

```bash
# 装上 PM2
npm install -g pm2

# 创建项目目录
mkdir -p /www/wwwroot/cms
```

### 2. 生成 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github-actions
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github-actions         
```

### 3. 设置 GitHub Secrets

仓库 → Settings → Secrets and variables → Actions → New repository secret：

| Secret 名 | 值 |
|-----------|-----|
| `SERVER_IP` | 服务器 IP 地址 |
| `SERVER_SSH_KEY` | `cat ~/.ssh/github-actions` 的内容（含开头结尾标记） |

### 4. 修改 `ecosystem.config.js`

把 `JWT_SECRET` 改成一个随机字符串，不要用默认值。

## 验证

1. 推送代码 `git push origin main`
2. GitHub → Actions 标签页查看运行状态
3. 成功后访问 `https://你的域名/docs` 看 API 文档能否打开
