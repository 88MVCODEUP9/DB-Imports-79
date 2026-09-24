'use client';

import { useEffect, useState } from 'react';
import { TruckLoader } from '@/components/TruckLoader';

/*
 * Erro em uma rota/página: a tela de carregamento (caminhão 3D) volta e
 * permanece, tentando novamente sozinha, até o site voltar ao normal.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    console.error('Erro no site:', error);
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
    <div className="loader-overlay" role="status" aria-live="polite">
      <TruckLoader
        title="Recuperando"
        message="O site encontrou um erro e está se recuperando. Tentando novamente em instantes..."
        footer={
          <div className="loader-actions">
            <button className="loader-button" onClick={() => reset()}>
              Tentar novamente agora
            </button>
            <span className="loader-hint">
              Tentando novamente automaticamente em {countdown}s
            </span>
          </div>
        }
      />
    </div>
  );
}