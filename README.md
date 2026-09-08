# Vercel Speed Test

**English** · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [日本語](README.ja.md) · [Português](README.pt-BR.md)

A privacy-friendly, open-source internet speed test powered **entirely by Vercel**. It measures latency, jitter, download throughput and upload throughput against the Vercel deployment serving the page.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yexing17/vercel-speedtest)

## Features

- Pure Vercel architecture — no Cloudflare, Speedtest.net, external VPS, database or analytics required.
- Ping and jitter measurement.
- Multi-stream download and upload throughput testing.
- Vercel region reporting.
- Adjustable duration, concurrency, chunk size and traffic caps.
- Up-front traffic usage warning with hard download/upload caps.
- Light and dark themes with system-theme detection and saved preference.
- Responsive UI for desktop and mobile.
- No persistent storage and no result tracking.
- Zero-build static frontend plus Vercel Functions.

## How it works

The browser talks only to endpoints in the same Vercel deployment:

```text
Browser
  ├─ /api/ping      latency + jitter
  ├─ /api/download  binary chunks
  ├─ /api/upload    binary POST chunks
  └─ /api/info      deployment region metadata
```

The client uses multiple small requests within both a time limit and a traffic budget. A phase ends when either limit is reached. This makes bandwidth usage predictable while still allowing throughput measurement.

## Deploy

### One click

Use the **Deploy with Vercel** button above. No environment variables are required.

### From the CLI

```bash
git clone https://github.com/yexing17/vercel-speedtest.git
cd vercel-speedtest
npx vercel
```

No build step is required.

## Accuracy notes

This project measures the path from the user's browser to the Vercel infrastructure serving this deployment. It is not intended to exactly reproduce Ookla, Cloudflare Speed Test, ISP lab testing, or a direct test to a specific VPS. Browser scheduling, function placement, cold starts, congestion, plan limits and Vercel routing can affect results.

For more stable results, run several tests and compare tests using the same settings.

## Vercel usage and traffic warning

Speed tests intentionally transfer significant amounts of data. Before a test begins, the UI shows the maximum download, upload and total payload. The transfer engine enforces these caps, and a phase stops when it reaches either its traffic cap or time limit.

The default profile allows up to **128 MiB download + 32 MiB upload = 160 MiB total payload per test**. Actual usage can be lower. Operators of public instances should monitor Vercel usage and choose conservative caps appropriate for their plan.

## Privacy

This application does not store test results, require accounts, or include third-party analytics. The theme preference is stored locally in the browser. Vercel may process normal request metadata as part of hosting and platform operations. Fork operators are responsible for disclosing any additional analytics, logging or tracking they add.

## Project structure

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

## Contributing

Issues and pull requests are welcome. Useful contribution areas include throughput accuracy, accessibility, localization, mobile UX, test presets, abuse controls and Vercel region visualization.

When changing the transfer engine, keep individual request and response bodies safely below Vercel platform limits and avoid adding third-party speed-test infrastructure unless clearly optional and documented.

## License

MIT © yexing17
