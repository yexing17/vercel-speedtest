# Vercel Speed Test

A privacy-friendly, open-source internet speed test powered **entirely by Vercel**. It measures latency, jitter, download throughput and upload throughput against the Vercel deployment serving the page.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yexing17/vercel-speedtest)

## Features

- Pure Vercel architecture — no Cloudflare, Speedtest.net, external VPS, database or analytics required.
- Ping and jitter measurement.
- Multi-stream download throughput testing.
- Multi-stream upload throughput testing.
- Vercel region reporting.
- Adjustable test duration, concurrency and chunk size.
- Responsive dark UI for desktop and mobile.
- No persistent storage and no result tracking.
- Zero-build static frontend plus Vercel Functions.

## How it works

The browser talks only to endpoints in the same Vercel deployment:

```text
Browser
  ├─ /api/ping      latency + jitter
  ├─ /api/download  random binary chunks
  ├─ /api/upload    binary POST chunks
  └─ /api/info      deployment region metadata
```

The download endpoint caps each response below Vercel's request/response payload ceiling. The client continuously opens multiple requests for a selected time window and calculates throughput from the total transferred bytes. Upload testing follows the same idea with small repeated POST bodies.

## Deploy

### One click

Use the **Deploy with Vercel** button above. Vercel will fork/clone the repository and deploy it with no required environment variables.

### From the CLI

```bash
git clone https://github.com/yexing17/vercel-speedtest.git
cd vercel-speedtest
npx vercel
```

No build step is required.

## Accuracy notes

This project measures the path from the user's browser to the Vercel infrastructure serving this deployment. It is not intended to exactly reproduce Ookla, Cloudflare Speed Test, ISP lab testing, or a direct test to a specific VPS. Browser scheduling, function placement, cold starts, congestion, plan limits and Vercel routing can all affect results.

For more stable results, run several tests, avoid background downloads, and compare tests using the same duration/concurrency settings.

## Vercel usage and cost warning

Speed tests intentionally transfer a lot of data. Public deployments can consume bandwidth and request quotas quickly. Owners should monitor Vercel usage and consider protecting, rate-limiting or restricting public instances when necessary.

The default settings are intentionally moderate. Increasing duration and concurrency raises traffic usage significantly.

## Privacy

This application does not store test results, use cookies, require accounts, or include third-party analytics. Vercel may still process normal request metadata as part of hosting and platform operations. Operators who fork this project are responsible for disclosing any additional analytics, logging or tracking they add.

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

Issues and pull requests are welcome. Useful contribution areas include improved throughput estimation, accessibility, localization, mobile UX, test presets, abuse controls and better Vercel region visualization.

When changing the transfer engine, keep individual request and response bodies safely below Vercel platform limits and avoid adding third-party speed-test infrastructure unless the behavior is clearly optional and documented.

## License

MIT © yexing17
