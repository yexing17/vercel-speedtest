# Vercel Speed Test

[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · **日本語** · [Português](README.pt-BR.md)

**Vercel 上だけで動作する**、プライバシーに配慮したオープンソースのインターネット速度テストです。ブラウザとこのページを配信している Vercel Deployment 間のレイテンシ、ジッター、ダウンロード速度、アップロード速度を測定します。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yexing17/vercel-speedtest)

## 特徴

- Cloudflare、Speedtest.net、外部 VPS、データベース、外部測定サービスを必要としない純粋な Vercel 構成。
- Ping と Jitter の測定。
- 複数ストリームによるダウンロード・アップロード測定。
- Vercel Region の表示。
- 測定時間、並列数、チャンクサイズ、通信量上限を調整可能。
- 測定前に最大通信量を表示し、ダウンロード・アップロードの上限を実際に強制。
- ライト/ダークテーマ、OS テーマの自動検出、選択内容の保存。
- デスクトップとモバイルに対応。
- 測定結果の永続保存やサードパーティ分析なし。
- ビルド不要の静的フロントエンド + Vercel Functions。

## 仕組み

ブラウザは同じ Vercel Deployment 内のエンドポイントだけにアクセスします。

```text
Browser
  ├─ /api/ping      レイテンシ + ジッター
  ├─ /api/download  バイナリチャンク
  ├─ /api/upload    バイナリ POST チャンク
  └─ /api/info      デプロイ先リージョン情報
```

クライアントは複数の小さなリクエストを使用し、「時間制限」と「通信量予算」の両方を適用します。どちらか一方に達するとその測定フェーズを終了するため、スループットを測定しつつ通信量を予測可能にできます。

## デプロイ

上の **Deploy with Vercel** ボタンを使用してください。環境変数は不要です。

CLI からもデプロイできます。

```bash
git clone https://github.com/yexing17/vercel-speedtest.git
cd vercel-speedtest
npx vercel
```

## 精度について

このプロジェクトは、ユーザーのブラウザから現在の Deployment を配信する Vercel インフラまでの経路を測定します。Ookla、Cloudflare Speed Test、ISP のラボ測定、特定 VPS への直接測定と完全に同じ結果になることを目的としていません。ブラウザのスケジューリング、Function の配置、コールドスタート、混雑、プラン制限、Vercel のルーティングなどが結果に影響します。

同じ設定で複数回測定して比較することをおすすめします。

## Vercel の通信量と利用枠

速度テストは意図的に多くのデータを転送します。開始前に最大ダウンロード量、アップロード量、合計通信量を表示し、測定エンジンがその上限を実際に適用します。各フェーズは通信量上限または時間上限のどちらかに達すると停止します。

デフォルトでは 1 回あたり最大 **ダウンロード 128 MiB + アップロード 32 MiB = 合計 160 MiB** のペイロードを許可します。実際の使用量はこれより少ない場合があります。公開インスタンスの運営者は Vercel の Usage を監視し、プランに適した上限を設定してください。

## プライバシー

測定結果は保存せず、アカウントも不要で、サードパーティ分析も含みません。テーマ設定だけをブラウザ内に保存します。ホスティング運用の一環として Vercel が通常のリクエストメタデータを処理する場合があります。

## コントリビューション

Issue と Pull Request を歓迎します。精度、アクセシビリティ、多言語化、モバイル UX、測定プリセット、不正利用対策、Vercel Region の表示改善などが主な改善候補です。

## ライセンス

MIT © yexing17
