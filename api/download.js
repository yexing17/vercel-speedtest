import crypto from 'node:crypto';

export default function handler(req, res) {
  const raw = Number(req.query?.bytes || 1024 * 1024);
  const bytes = Math.min(Math.max(raw, 64 * 1024), 3.5 * 1024 * 1024);
  const body = crypto.randomBytes(Math.floor(bytes));
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', String(body.length));
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Encoding', 'identity');
  res.status(200).send(body);
}
