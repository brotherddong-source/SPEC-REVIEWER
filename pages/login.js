export default function Login({ hasError }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif;
          background: #f0f1f8;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .header-bar {
          position: fixed; top: 0; left: 0; right: 0;
          height: 56px;
          background: #2B2D7B;
          display: flex; align-items: center;
          padding: 0 28px;
          gap: 18px;
        }
        .header-logo {
          display: flex; align-items: center; gap: 8px;
          padding-right: 18px;
          border-right: 1px solid rgba(255,255,255,0.3);
        }
        .header-logo svg { width: 26px; height: 26px; }
        .header-logo-text { font-size: 14px; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
        .header-title { font-size: 15px; font-weight: 700; color: #fff; }
        .header-subtitle { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 1px; }
        .card {
          background: #fff;
          border: 1px solid #dde0f0;
          border-top: 4px solid #2B2D7B;
          padding: 2.5rem;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 4px 24px rgba(43,45,123,0.1);
          border-radius: 4px;
        }
        .title {
          font-size: 1rem; font-weight: 700;
          text-align: center; color: #2B2D7B;
          margin-bottom: 0.25rem;
        }
        .subtitle {
          font-size: 0.72rem; color: #6e6e6e;
          text-align: center; margin-bottom: 2rem;
        }
        .error-msg {
          background: #fef2f2; color: #dc2626;
          border: 1px solid #fecaca;
          padding: 0.625rem 0.875rem; font-size: 0.8rem;
          margin-bottom: 1rem; text-align: center;
          border-radius: 3px;
        }
        label {
          display: block; font-size: 0.72rem; font-weight: 600;
          color: #6e6e6e; margin-bottom: 0.375rem; letter-spacing: 0.03em;
        }
        input[type=password] {
          width: 100%; padding: 0.75rem 1rem;
          border: 1px solid #dde0f0;
          border-radius: 3px;
          font-size: 0.9375rem; color: #212121;
          outline: none; transition: border-color 0.15s;
          letter-spacing: 0.15em; background: #fff;
        }
        input[type=password]:focus { border-color: #2B2D7B; box-shadow: 0 0 0 3px rgba(43,45,123,0.1); }
        button {
          margin-top: 1.25rem; width: 100%;
          padding: 0.875rem;
          background: #2B2D7B; color: #fff;
          border: none; border-radius: 3px;
          font-size: 0.875rem; font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.15s;
        }
        button:hover { background: #222468; }
        button:active { background: #1a1c52; }
      `}} />
      <div className="header-bar">
        <div className="header-logo">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
            <circle cx="14" cy="10" r="4" fill="white" opacity="0.9"/>
            <rect x="11" y="16" width="6" height="2" rx="1" fill="white" opacity="0.9"/>
            <rect x="12" y="19" width="4" height="3" rx="1" fill="white" opacity="0.7"/>
          </svg>
          <span className="header-logo-text">IPLAB</span>
        </div>
        <div>
          <div className="header-title">명세서 검사기</div>
          <div className="header-subtitle">Patent Specification Checker</div>
        </div>
      </div>
      <div className="card">
        <div className="title">명세서 검수기</div>
        <div className="subtitle">Patent Spec Reviewer System</div>
        {hasError && (
          <div className="error-msg">⚠ 비밀번호가 올바르지 않습니다.</div>
        )}
        <form method="POST" action="/api/login">
          <label htmlFor="pw">비밀번호</label>
          <input
            id="pw"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            autoFocus
            autoComplete="current-password"
          />
          <button type="submit">입장하기 →</button>
        </form>
      </div>
    </>
  );
}

export function getServerSideProps({ query }) {
  return { props: { hasError: query.error === '1' } };
}
