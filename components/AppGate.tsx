'use client';

import React, { useEffect, useState, type ReactNode } from 'react';
import { TruckLoader } from '@/components/TruckLoader';

const INITIAL_LOADING_MS = 600; // Tempo suave de apresentação inicial
const FADE_MS = 400;

class LoaderBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state: { hasError: boolean; error: Error | null } = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    console.error('Erro na renderização:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="loader-overlay" role="status" aria-live="polite">
          <TruckLoader
            title="Recuperando"
            message="Ocorreu uma instabilidade momentânea. Clique abaixo para recarregar."
            footer={
              <div className="loader-actions">
                <button
                  className="loader-button"
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.reload();
                  }}
                >
                  Recarregar página
                </button>
              </div>
            }
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export function AppGate({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayFading, setOverlayFading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = window.setTimeout(() => {
      setOverlayFading(true);
      const fadeTimer = window.setTimeout(() => {
        setOverlayVisible(false);
      }, FADE_MS);
      return () => window.clearTimeout(fadeTimer);
    }, INITIAL_LOADING_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <LoaderBoundary>
      {children}
      {overlayVisible && (
        <div
          className={'loader-overlay' + (overlayFading ? ' loader-overlay-leave' : '')}
          role="status"
          aria-live="polite"
        >
          <TruckLoader
            title="Carregando"
            message="Estamos carregando o site. Isso leva apenas alguns instantes."
          />
        </div>
      )}
    </LoaderBoundary>
  );
}

export default AppGate;
