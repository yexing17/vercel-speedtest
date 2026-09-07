export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let bytes = 0;
  for await (const chunk of req) bytes += chunk.length;
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ ok: true, bytes });
}
