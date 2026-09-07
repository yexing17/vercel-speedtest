export default function handler(req, res) {
  const vercelId = req.headers['x-vercel-id'] || '';
  const region = process.env.VERCEL_REGION || (typeof vercelId === 'string' ? vercelId.split('::')[0] : '') || 'unknown';
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    region,
    deployment: process.env.VERCEL_ENV || 'unknown',
    vercelId,
    now: new Date().toISOString()
  });
}
