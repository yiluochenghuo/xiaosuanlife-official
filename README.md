# 小算生活 XiaoSuanLife 官网

> 🌐 **官方网站：** [https://xiaosuanlife-official.qq3809326694.chatgpt.site/](https://xiaosuanlife-official.qq3809326694.chatgpt.site/)

小算生活官方产品网站，包含品牌首页、Android 下载中心、二维码下载、静态版本配置与版本查询 API。

## 本地开发

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 发布 APK

1. 将正式安装包放入 `public/download/xiaosuanlife.apk`。
2. 编辑 `public/version.json`，填写版本、实际大小、更新日期和更新说明，并将 `available` 改为 `true`。
3. 在 `app/api/version/route.ts` 中同步 App 更新检查接口的数据。
4. 重新构建和部署。下载页二维码会自动使用当前网站域名。

## 部署

项目可以部署到 Cloudflare Sites，也兼容支持 React/Vite 输出的托管平台。Node.js 建议使用 22.13 或更高版本。
