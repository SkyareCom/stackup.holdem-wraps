import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error("StackUp UI error", error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#050102] p-6 text-white">
          <section className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center">
            <h1 className="text-lg font-black">Não foi possível carregar esta tela</h1>
            <p className="mt-2 text-sm text-white/50">
              Reabra o aplicativo. Se o problema persistir, a sessão poderá ser restaurada sem perder a arquitetura do produto.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 w-full rounded-2xl bg-amber-400 px-4 py-3 text-sm font-black text-black"
            >
              TENTAR NOVAMENTE
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}