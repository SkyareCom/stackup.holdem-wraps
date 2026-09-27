import React, { useState } from "react";
import {
  BarChart3,
  ChevronRight,
  Dumbbell,
  Home,
  Play,
  ShoppingBag,
  Spade,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

const modules = [
  {
    id: "omaha-hi",
    title: "OMAHA HI",
    tag: "PLO",
    symbol: "♠",
    description:
      "Omaha tradicional: a melhor mão de cinco cartas ganha todo o pote. Normalmente jogado no formato Pot-Limit Omaha.",
  },
  {
    id: "omaha-hi-lo",
    title: "OMAHA HI-LO",
    tag: "8 OR BETTER",
    symbol: "8",
    description:
      "O pote é dividido: metade para a melhor mão alta e metade para a melhor mão baixa válida, com cartas de oito ou menores.",
  },
  {
    id: "omaha-5",
    title: "OMAHA DE 5 CARTAS",
    tag: "5-CARD PLO",
    symbol: "5",
    description:
      "Cada jogador recebe cinco cartas fechadas, aumentando as combinações disponíveis, a conectividade e a volatilidade.",
  },
  {
    id: "omaha-6",
    title: "OMAHA DE 6 CARTAS",
    tag: "6-CARD",
    symbol: "6",
    description:
      "Cada participante recebe seis cartas no pré-flop, exigindo ainda mais rigor na seleção e leitura das combinações.",
  },
];

const navItems = [
  { id: "home", label: "HOME", icon: Home },
  { id: "treinos", label: "TREINOS", icon: Dumbbell },
  { id: "stats", label: "STATS", icon: BarChart3 },
  { id: "perfil", label: "PERFIL", icon: UserRound },
  { id: "loja", label: "LOJA", icon: ShoppingBag },
];

function PlayerBadge() {
  return (
    <button
      type="button"
      aria-label="Abrir perfil do jogador"
      className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition active:scale-[0.98]"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/35 bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 text-[11px] font-black text-black shadow-[0_0_18px_rgba(245,158,11,0.18)]">
        CH
      </div>
      <div className="hidden pr-2 text-left min-[390px]:block">
        <p className="text-[8px] uppercase tracking-[0.18em] text-white/40">
          Player
        </p>
        <p className="max-w-[88px] truncate text-[11px] font-bold text-white/85">
          CH_GRINDER
        </p>
      </div>
    </button>
  );
}

function Header() {
  return (
    <header className="relative">
      <div className="flex justify-end">
        <PlayerBadge />
      </div>

      <div className="mt-5 flex flex-col items-center text-center">
        <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/25 bg-gradient-to-b from-amber-300/15 to-amber-800/5 shadow-[0_0_35px_rgba(245,158,11,0.12)]">
          <Spade
            size={23}
            strokeWidth={1.7}
            className="fill-amber-400 text-amber-400"
          />
        </div>

        <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-red-300/55">
          Poker Training System
        </p>

        <h1 className="gold-text mt-1 text-[42px] font-black leading-none tracking-[0.12em] drop-shadow-[0_3px_10px_rgba(245,158,11,0.18)] min-[390px]:text-[46px]">
          OMAHA
        </h1>

        <h2 className="mt-1 text-[13px] font-extrabold tracking-[0.34em] text-white/90 min-[390px]:text-[14px]">
          POKER PRO
        </h2>

        <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <p className="mt-3 text-[10px] font-bold tracking-[0.24em] text-amber-200/70">
          TRAINING &amp; STRATEGY
        </p>

        <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/35">
          Treinamento de modalidades
        </p>
      </div>
    </header>
  );
}

function SectionTitle({ eyebrow, title, trailing }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-300/40">
          {eyebrow}
        </p>
        <h2 className="text-[17px] font-black tracking-wide text-white">
          {title}
        </h2>
      </div>
      {trailing}
    </div>
  );
}

function ModuleCard({ module, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(module)}
      className="group relative w-full overflow-hidden rounded-[22px] border border-red-800/30 bg-gradient-to-br from-[#301015]/90 via-[#160609]/95 to-[#070304] p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition duration-200 active:scale-[0.985]"
    >
      <div className="pointer-events-none absolute right-[-22px] top-[-28px] h-24 w-24 rounded-full bg-red-600/[0.08] blur-2xl" />

      <div className="relative flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-red-700/25 bg-gradient-to-br from-red-950/80 to-black text-lg font-black text-red-300/85 shadow-inner">
          {module.symbol}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-300/45">
                {module.tag}
              </p>
              <h3 className="mt-0.5 text-[15px] font-black tracking-[0.04em] text-white">
                {module.title}
              </h3>
            </div>

            <ChevronRight
              size={18}
              className="mt-2 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5"
            />
          </div>

          <p className="mt-2 text-[11px] leading-[1.6] text-white/48">
            {module.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function CourchevelCard({ onOpen }) {
  const module = {
    id: "courchevel",
    title: "COURCHEVEL",
    tag: "VARIANTE ESPECIAL",
    symbol: "C",
    description:
      "Semelhante ao Omaha de 5 cartas, mas uma carta do flop é revelada antes da primeira rodada de apostas.",
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(module)}
      className="group relative w-full overflow-hidden rounded-[24px] border border-amber-400/35 bg-gradient-to-br from-[#4a2d0e]/90 via-[#201006] to-[#080402] p-4 text-left shadow-[0_16px_45px_rgba(0,0,0,0.35)] transition active:scale-[0.985]"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-400/45 to-transparent" />

      <div className="relative flex gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-amber-300/30 bg-gradient-to-br from-amber-300 to-amber-700 shadow-[0_0_24px_rgba(245,158,11,0.15)]">
          <Trophy size={20} className="text-black" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-300/65">
                {module.tag}
              </p>
              <h3 className="mt-0.5 text-[16px] font-black tracking-[0.08em] text-amber-100">
                {module.title}
              </h3>
            </div>
            <ChevronRight
              size={18}
              className="mt-2 shrink-0 text-amber-300/55 transition-transform group-hover:translate-x-0.5"
            />
          </div>

          <p className="mt-2 text-[11px] leading-[1.6] text-amber-50/55">
            {module.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function QuickPlay({ onStart }) {
  return (
    <section className="mt-7">
      <SectionTitle
        eyebrow="Training"
        title="PRÁTICA RÁPIDA"
        trailing={
          <p className="text-[9px] uppercase tracking-wider text-white/25">
            Spot aleatório
          </p>
        }
      />

      <button
        type="button"
        onClick={onStart}
        className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-gradient-to-r from-[#d89a31] via-[#f3c866] to-[#bd7d1e] px-4 py-4 text-black shadow-[0_12px_35px_rgba(177,112,20,0.18)] transition active:scale-[0.985]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
          <Play size={17} fill="currentColor" />
        </div>
        <div className="text-left">
          <p className="text-[13px] font-black tracking-[0.07em]">
            COMEÇAR JOGO RÁPIDO
          </p>
          <p className="text-[9px] font-semibold text-black/55">
            Treine decisões em spots aleatórios
          </p>
        </div>
      </button>
    </section>
  );
}

function BottomNavigation({ active, onChange }) {
  return (
    <nav className="bottom-safe fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-[#070203]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] w-full max-w-[430px] items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`relative flex h-full min-w-[56px] flex-col items-center justify-center gap-1 transition ${
                isActive ? "text-red-400" : "text-white/35"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 h-[2px] w-9 rounded-b-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
              )}
              <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
              <span className="text-[8px] font-bold tracking-[0.08em]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function TrainingSheet({ module, onClose }) {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-3 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <section className="relative mb-[calc(10px+env(safe-area-inset-bottom))] w-full max-w-[430px] rounded-[28px] border border-white/10 bg-gradient-to-b from-[#2a0a10] to-[#080304] p-5 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-300/55">
              {module.tag}
            </p>
            <h3 className="mt-1 text-xl font-black tracking-wide text-white">
              {module.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-[12px] leading-6 text-white/55">
          {module.description}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 px-4 py-3.5 text-[12px] font-black tracking-[0.08em] text-black active:scale-[0.99]"
        >
          <Play size={16} fill="currentColor" />
          INICIAR TREINO
        </button>
      </section>
    </div>
  );
}

function Notice({ text }) {
  if (!text) return null;

  return (
    <div className="fixed left-1/2 top-4 z-[60] w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-2xl border border-amber-400/20 bg-[#160a04]/95 px-4 py-3 text-center text-[11px] font-bold text-amber-100 shadow-2xl backdrop-blur-xl">
      {text}
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [selectedModule, setSelectedModule] = useState(null);
  const [notice, setNotice] = useState("");

  const showNotice = (text) => {
    setNotice(text);
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => setNotice(""), 1800);
  };

  const handleNav = (id) => {
    setActiveNav(id);
    if (id !== "home") {
      const item = navItems.find((nav) => nav.id === id);
      showNotice(`${item?.label ?? id}: módulo preparado para próxima etapa.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050102] text-white">
      <main className="omaha-shell relative mx-auto w-full max-w-[430px] overflow-hidden bg-gradient-to-b from-[#4a0e17] via-[#21050a] to-[#050102] px-4 pt-4 shadow-[0_0_80px_rgba(0,0,0,0.7)]">
        <div className="soft-noise pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-red-700/10 blur-[80px]" />
        <div className="pointer-events-none absolute -right-32 top-64 h-80 w-80 rounded-full bg-red-950/30 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-700/[0.05] blur-[70px]" />

        <div className="relative z-10">
          <Header />

          <section className="mt-8">
            <SectionTitle
              eyebrow="Modalidades"
              title="TREINAMENTO OMAHA"
              trailing={
                <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[8px] font-bold text-white/30">
                  5 MÓDULOS
                </span>
              }
            />

            <div className="space-y-3">
              {modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onOpen={setSelectedModule}
                />
              ))}
              <CourchevelCard onOpen={setSelectedModule} />
            </div>
          </section>

          <QuickPlay
            onStart={() => showNotice("Jogo rápido selecionado — preparando spot Omaha.")}
          />
        </div>
      </main>

      <BottomNavigation active={activeNav} onChange={handleNav} />
      <TrainingSheet module={selectedModule} onClose={() => setSelectedModule(null)} />
      <Notice text={notice} />
    </div>
  );
}