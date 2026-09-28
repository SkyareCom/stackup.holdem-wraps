import React from "react";
import {
  ChevronRight,
  Play,
  Trophy,
} from "lucide-react";

function PlayerBadge({ session }) {
  return (
    <button
      type="button"
      aria-label="Abrir perfil do jogador"
      className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition active:scale-[0.98]"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 text-[11px] text-black">
        {session.initials}
      </div>
      <div className="hidden pr-2 text-left min-[390px]:block">
        <p className="text-[8px] uppercase tracking-[0.18em] text-white/40">
          {session.plan.toUpperCase()}
        </p>
        <p className="max-w-[88px] truncate text-[11px] text-white/85">
          {session.nickname}
        </p>
      </div>
    </button>
  );
}

function Header({ session }) {
  return (
    <header className="relative">
      <div className="flex justify-end">
        <PlayerBadge session={session} />
      </div>

      <div className="mt-4 flex flex-col items-center text-center">
        <div className="mb-3 h-28 w-28 overflow-hidden rounded-full shadow-[0_0_38px_rgba(255,65,72,0.16)]">
          <img
            src={`${import.meta.env.BASE_URL}stackup-wraps-logo.webp`}
            alt="StackUp Hold'em"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="brand-protest text-[#ff4148]">
          STACKUP HOLD&apos;EM
        </h1>

        <div className="wraps-word" aria-label="WRAPS">
          <span className="wraps-letter">W</span>
          <span className="wraps-letter">R</span>
          <span className="wraps-letter">A</span>
          <span className="wraps-letter">P</span>
          <span className="wraps-letter">S</span>
        </div>

        <p className="text-white/70">PLO COM CONFIANÇA.</p>
      </div>
    </header>
  );
}

function SectionTitle({ eyebrow, title, trailing }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-red-300/40">
          {eyebrow}
        </p>
        <h2 className="text-[17px] tracking-wide text-white">{title}</h2>
      </div>
      {trailing}
    </div>
  );
}

function ModuleCard({ module, onOpen }) {
  const featured = module.featured;

  return (
    <button
      type="button"
      onClick={() => onOpen(module)}
      className={
        featured
          ? "group relative w-full overflow-hidden rounded-[24px] border border-amber-400/35 bg-gradient-to-br from-[#4a2d0e]/90 via-[#201006] to-[#080402] p-4 text-left shadow-[0_16px_45px_rgba(0,0,0,0.35)] transition active:scale-[0.985]"
          : "group relative w-full overflow-hidden rounded-[22px] border border-red-800/30 bg-gradient-to-br from-[#301015]/90 via-[#160609]/95 to-[#070304] p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition active:scale-[0.985]"
      }
    >
      <div className="relative flex items-start gap-3">
        <div
          className={
            featured
              ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-amber-300/30 bg-gradient-to-br from-amber-300 to-amber-700 text-black"
              : "flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-red-700/25 bg-gradient-to-br from-red-950/80 to-black text-lg text-red-300/85"
          }
        >
          {featured ? <Trophy size={20} /> : module.symbol}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className={featured ? "text-[9px] uppercase tracking-[0.18em] text-amber-300/65" : "text-[9px] uppercase tracking-[0.18em] text-red-300/45"}>
                {module.tag}
              </p>
              <h3 className={featured ? "mt-0.5 text-[16px] tracking-[0.08em] text-amber-100" : "mt-0.5 text-[15px] tracking-[0.04em] text-white"}>
                {module.title}
              </h3>
            </div>
            <ChevronRight size={18} className={featured ? "mt-2 shrink-0 text-amber-300/55" : "mt-2 shrink-0 text-white/25"} />
          </div>

          <p className={featured ? "mt-2 text-[11px] leading-[1.6] text-amber-50/55" : "mt-2 text-[11px] leading-[1.6] text-white/48"}>
            {module.description}
          </p>
        </div>
      </div>
    </button>
  );
}

export function HomeScreen({
  modules,
  session,
  onOpenModule,
  onQuickStart,
}) {
  return (
    <main className="omaha-shell relative mx-auto w-full max-w-[430px] overflow-hidden bg-gradient-to-b from-[#4a0e17] via-[#21050a] to-[#050102] px-4 pt-4 shadow-[0_0_80px_rgba(0,0,0,0.7)]">
      <div className="soft-noise pointer-events-none absolute inset-0" />
      <div className="relative z-10">
        <Header session={session} />

        <section className="mt-8">
          <SectionTitle
            eyebrow="Modalidades"
            title="TREINAMENTO OMAHA"
            trailing={
              <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[8px] text-white/30">
                {modules.length} MÓDULOS
              </span>
            }
          />
          <div className="space-y-3">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} onOpen={onOpenModule} />
            ))}
          </div>
        </section>

        <section className="mt-7">
          <SectionTitle
            eyebrow="Training"
            title="PRÁTICA RÁPIDA"
            trailing={<p className="text-[9px] uppercase tracking-wider text-white/25">Spot aleatório</p>}
          />
          <button
            type="button"
            onClick={onQuickStart}
            className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-gradient-to-r from-[#d89a31] via-[#f3c866] to-[#bd7d1e] px-4 py-4 text-black shadow-[0_12px_35px_rgba(177,112,20,0.18)] transition active:scale-[0.985]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
              <Play size={17} fill="currentColor" />
            </div>
            <div className="text-left">
              <p className="text-[13px] tracking-[0.07em]">COMEÇAR JOGO RÁPIDO</p>
              <p className="text-[9px] text-black/55">Treine decisões em spots aleatórios</p>
            </div>
          </button>
        </section>
      </div>
    </main>
  );
}