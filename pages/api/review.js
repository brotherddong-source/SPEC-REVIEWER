// Vercel Edge Function — OpenAI 스트리밍 프록시
// 프롬프트는 lib/prompt.js에서 관리, API 키는 환경변수로만 처리
import { SYSTEM_PROMPT } from '../../lib/prompt.js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' },
    });
  }
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const MODEL = 'gpt-5.2';
  let userText = '';
  try {
    const body = await req.json();
    userText = (body.userText || '').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // ping 또는 빈 입력 → OpenAI 호출 없이 즉시 응답
  if (!userText) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY 환경변수가 설정되지 않았습니다.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const openAIBody = {
    model: MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user',   content: userText },
    ],
    max_completion_tokens: 16000,
    temperature: 0,
    stream: true,
  };

  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(openAIBody),
  });

  if (!upstream.ok) {
    const errText = await upstream.text();
    return new Response(errText, { status: upstream.status, headers: { 'Content-Type': 'application/json' } });
  }

  // 스트리밍: OpenAI SSE를 그대로 클라이언트로 전달
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
}
