'use client';

import { useEffect, useState } from 'react';

/*
 * Último recurso: erro no layout raiz. Neste caso o CSS global pode não estar
 * disponível, então a tela é autocontida com estilos inline. Continua tentando
 * recarregar sozinha até o site voltar ao normal.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    console.error('Erro no layout raiz:', error);
  }, [error]);

  useEffect(() => {
    if (countdown <= 0) {
      reset();
      return;
    }
    const t = window.setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [countdown, reset]);

  return (
    <html lang="pt-BR" className="dark">
      <body
        style={{
          margin: 0,
          background: '#1a140b',
          color: '#f2e2c2',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <style>{`@keyframes gerr-bar { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }`}</style>
        <div
          role="status"
          aria-live="polite"
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 22,
            textAlign: 'center',
            padding: '0 24px',
            background:
              'radial-gradient(120% 80% at 50% 10%, #3a2c18 0%, #1a140b 70%)',
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 3,
              color: '#f0d9a6',
              textShadow: '0 2px 18px rgba(255,180,80,.35)',
            }}
          >
            RECUPERANDO
          </div>
          <div style={{ maxWidth: 430, fontSize: 15, lineHeight: 1.7, color: '#c9b184' }}>
            O site encontrou um problema e está se recuperando. Tentando novamente em instantes...
          </div>
          <div
            style={{
              height: 6,
              width: 280,
              maxWidth: '70vw',
              borderRadius: 999,
              overflow: 'hidden',
              background: 'rgba(20,16,8,.8)',
              boxShadow: 'inset 0 0 0 1px rgba(240,217,166,.25)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '42%',
                borderRadius: 999,
                background: 'linear-gradient(90deg,#d97a2b,#e8c256)',
                animation: 'gerr-bar 1.4s ease-in-out infinite',
              }}
            />
          </div>
          <button
            onClick={() => reset()}
            style={{
              border: '1px solid rgba(240,217,166,.45)',
              color: '#f0d9a6',
              background: 'rgba(255,255,255,.04)',
              padding: '12px 18px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Tentar novamente agora
          </button>
          <span style={{ fontSize: 12, color: '#95794f' }}>
            Tentando novamente automaticamente em {countdown}s
          </span>
        </div>
      </body>
    </html>
  );
}