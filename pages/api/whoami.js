export const config = { runtime: 'edge' };

export default function handler(request) {
  const ip = request.ip || '(없음)';
  const realIp = request.headers.get('x-real-ip') || '(없음)';
  const forwarded = request.headers.get('x-forwarded-for') || '(없음)';

  return new Response(JSON.stringify({ ip, realIp, forwarded }, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
