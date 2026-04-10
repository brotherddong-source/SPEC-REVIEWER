import { NextResponse } from 'next/server';

const ALLOWED_IP = '112.218.85.3';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 로그인 페이지·인증 엔드포인트는 항상 허용
  if (pathname === '/login' || pathname.startsWith('/api/login') || pathname === '/api/whoami') {
    return NextResponse.next();
  }

  // 클라이언트 IP 추출 (Vercel: request.ip → x-real-ip → x-forwarded-for)
  const ip = (
    request.ip ||
    request.headers.get('x-real-ip') ||
    (request.headers.get('x-forwarded-for') || '').split(',')[0]
  ).trim();

  // 허용된 IP면 바로 통과
  if (ip === ALLOWED_IP) {
    return NextResponse.next();
  }

  // 인증 쿠키 확인
  const sitePassword = (process.env.SITE_PASSWORD || 'iplabiplabgogo').trim();
  const authCookie = request.cookies.get('auth');
  if (authCookie?.value?.trim() === sitePassword) {
    return NextResponse.next();
  }

  // 그 외: 로그인 페이지로 리다이렉트
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
