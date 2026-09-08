# Vercel Speed Test

[English](README.md) · **简体中文** · [Español](README.es.md) · [日本語](README.ja.md) · [Português](README.pt-BR.md)

一个注重隐私、完全开源，并且**完全运行在 Vercel 上**的网络测速工具。它会测量用户浏览器到当前 Vercel 部署之间的延迟、抖动、下载速度和上传速度。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yexing17/vercel-speedtest)

## 功能

- 纯 Vercel 架构，不依赖 Cloudflare、Speedtest.net、外部 VPS、数据库或第三方测速服务。
- Ping 与 Jitter 测量。
- 多并发下载与上传测速。
- 显示 Vercel Region。
- 可调整测速时长、并发数、分块大小以及流量上限。
- 测试前明确提示最大流量，并强制执行下载/上传流量上限。
- 白天/黑夜主题，支持跟随系统并保存用户选择。
- 适配桌面端与移动端。
- 不持久化测速结果，不包含第三方分析服务。
- 静态前端 + Vercel Functions，无需构建步骤。

## 工作原理

浏览器只访问同一个 Vercel Deployment 中的接口：

```text
Browser
  ├─ /api/ping      延迟 + 抖动
  ├─ /api/download  二进制下载分块
  ├─ /api/upload    二进制 POST 分块
  └─ /api/info      部署区域信息
```

客户端通过多个小请求进行测速，同时受“时间限制”和“流量预算”约束；任一限制先达到，该阶段就结束。因此既能测量吞吐量，又能控制公开实例的 Vercel 流量消耗。

## 部署

点击上方 **Deploy with Vercel** 按钮即可一键部署，不需要环境变量。

也可以使用 CLI：

```bash
git clone https://github.com/yexing17/vercel-speedtest.git
cd vercel-speedtest
npx vercel
```

## 准确性说明

本项目测量的是用户浏览器到承载当前部署的 Vercel 基础设施之间的网络路径。结果不应被理解为与 Ookla、Cloudflare Speed Test、运营商实验室测速或指定 VPS 直连测速完全等价。浏览器调度、Function 部署位置、冷启动、网络拥塞、套餐限制和 Vercel 路由都可能影响结果。

建议使用相同设置连续测试数次进行比较。

## Vercel 流量与额度提示

测速天然会消耗较多流量。开始测试前，页面会显示本次测试允许消耗的最大下载、上传和总流量。测速引擎会真正执行这些上限；达到流量上限或时间上限中的任意一个，当前阶段就会停止。

默认配置最多使用 **128 MiB 下载 + 32 MiB 上传 = 160 MiB 测试负载**，实际流量可能更低。公开部署时建议根据自己的 Vercel 套餐设置较保守的流量上限，并关注账户 Usage。

## 隐私

本应用不会保存测速结果，不要求登录，也不包含第三方分析服务。主题偏好仅保存在用户浏览器本地。Vercel 作为托管平台仍可能处理正常的请求元数据。如果 Fork 后自行加入分析、日志或追踪功能，部署者应自行进行相应披露。

## 项目结构

```text
.
├── api/
│   ├── download.js
│   ├── info.js
│   ├── ping.js
│   └── upload.js
├── app.js
├── index.html
├── styles.css
├── package.json
└── vercel.json
```

## 参与贡献

欢迎提交 Issue 和 Pull Request。适合改进的方向包括测速准确度、无障碍支持、本地化、移动端体验、测速预设、防滥用以及更直观的 Vercel Region 展示。

修改传输引擎时，请确保单个请求/响应体始终安全低于 Vercel 平台限制。除非明确标注为可选功能，否则请不要引入第三方测速基础设施。

## 许可证

MIT © yexing17
