export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString();

  let rawPassword = '';
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('application/json')) {
    try { rawPassword = JSON.parse(rawBody).password || ''; } catch {}
  } else {
    try { rawPassword = new URLSearchParams(rawBody).get('password') || ''; } catch {}
  }

  const password = rawPassword.trim();
  const sitePassword = (process.env.SITE_PASSWORD || 'iplabiplabgogo').trim();

  if (password === sitePassword) {
    res.setHeader(
      'Set-Cookie',
      `auth=${sitePassword}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
    );
    return res.redirect(302, '/');
  }
  return res.redirect(302, '/login?error=1');
}
