import React, { useState } from "react";
import {
  ChevronDown,
  Fingerprint,
  Globe2,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const CARD_CLASS =
  "w-full overflow-hidden rounded-[22px] border border-amber-300/55 bg-gradient-to-br from-[#301015]/90 via-[#160609]/95 to-[#070304] text-left shadow-[0_16px_40px_rgba(0,0,0,0.28),0_0_18px_rgba(232,198,117,0.06)]";

function LoginCard({ id, title, subtitle, icon: Icon, open, onToggle, children }) {
  return (
    <section className={CARD_CLASS}>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-amber-300/20 bg-black/30 text-amber-300">
          <Icon size={22} />
        </div>

        <div className="min-w-0 flex-1 text-left">
          <h2 className="ui-title text-white">{title}</h2>
          <p className="mt-1 text-white/45">{subtitle}</p>
        </div>

        <ChevronDown
          size={20}
          className={`shrink-0 text-white/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-amber-300/15 px-4 pb-4 pt-4 text-left">
          {children}
        </div>
      )}
    </section>
  );
}

function ChoiceButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-4 py-3 text-left transition active:scale-[0.99] ${
        active
          ? "border-amber-300/45 bg-amber-300/10 text-amber-100"
          : "border-white/10 bg-white/[0.03] text-white/70"
      }`}
    >
      {children}
    </button>
  );
}

export function LoginPage({ onEnter }) {
  const [openCard, setOpenCard] = useState(null);
  const [language, setLanguage] = useState("pt-BR");
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [stackupId, setStackupId] = useState("");
  const [password, setPassword] = useState("");

  const toggle = (id) => setOpenCard((current) => (current === id ? null : id));

  return (
    <main className="min-h-screen bg-[#050102] text-white">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-gradient-to-b from-[#4a0e17] via-[#21050a] to-[#050102] px-4 pb-8 pt-8 shadow-[0_0_80px_rgba(0,0,0,0.7)]">
        <div className="soft-noise pointer-events-none absolute inset-0" />

        <div className="relative z-10">
          <header className="pt-1 text-center">
            <div className="mx-auto h-36 w-36 overflow-hidden rounded-full shadow-[0_0_42px_rgba(255,65,72,0.18)]">
              <img
                src={`${import.meta.env.BASE_URL}stackup-wraps-logo.webp?v=20260928-2`}
                alt="StackUp Hold'em"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="wraps-word" aria-label="WRAPS">
              <span className="wraps-letter">W</span>
              <span className="wraps-letter">R</span>
              <span className="wraps-letter">A</span>
              <span className="wraps-letter">P</span>
              <span className="wraps-letter">S</span>
            </div>

            <p className="text-white/70">PLO COM CONFIANÇA.</p>
          </header>

          <div className="mt-8 space-y-3">
            <LoginCard
              id="language"
              title="IDIOMA"
              subtitle="Escolha o idioma de preferência"
              icon={Globe2}
              open={openCard === "language"}
              onToggle={toggle}
            >
              <div className="space-y-2">
                <ChoiceButton active={language === "pt-BR"} onClick={() => setLanguage("pt-BR")}>
                  PORTUGUÊS — PT-BR
                </ChoiceButton>
                <ChoiceButton active={language === "en-US"} onClick={() => setLanguage("en-US")}>
                  ENGLISH — EN-US
                </ChoiceButton>
              </div>
            </LoginCard>

            <LoginCard
              id="quick"
              title="ACESSO RÁPIDO"
              subtitle="Entrar com biometria ou face ID"
              icon={Fingerprint}
              open={openCard === "quick"}
              onToggle={toggle}
            >
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onEnter("biometric")}
                  className="flex w-full items-center gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-amber-100 active:scale-[0.99]"
                >
                  <Fingerprint size={20} />
                  BIOMETRIA
                </button>

                <button
                  type="button"
                  onClick={() => onEnter("google")}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/75 active:scale-[0.99]"
                >
                  <UserRound size={20} />
                  ENTRAR COM GOOGLE
                </button>
              </div>
            </LoginCard>

            <LoginCard
              id="whatsapp"
              title="VIA WHATSAPP"
              subtitle="Entrar com código de validação"
              icon={MessageCircle}
              open={openCard === "whatsapp"}
              onToggle={toggle}
            >
              <div className="space-y-3">
                <label className="block">
                  <span className="mb-2 block text-white/55">NÚMERO DO WHATSAPP</span>
                  <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    <span className="flex items-center border-r border-white/10 px-4 text-white/55">+55</span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      inputMode="tel"
                      placeholder="(00) 00000-0000"
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/25"
                    />
                  </div>
                </label>

                {!codeSent ? (
                  <button
                    type="button"
                    disabled={!phone.trim()}
                    onClick={() => setCodeSent(true)}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#d89a31] via-[#f3c866] to-[#bd7d1e] px-4 py-3 text-black disabled:opacity-35"
                  >
                    ENVIAR CÓDIGO
                  </button>
                ) : (
                  <>
                    <label className="block">
                      <span className="mb-2 block text-white/55">CÓDIGO DE 4 DÍGITOS</span>
                      <input
                        value={code}
                        onChange={(event) =>
                          setCode(event.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        inputMode="numeric"
                        placeholder="0000"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25"
                      />
                    </label>

                    <button
                      type="button"
                      disabled={code.length !== 4}
                      onClick={() => onEnter("whatsapp")}
                      className="w-full rounded-2xl bg-gradient-to-r from-[#d89a31] via-[#f3c866] to-[#bd7d1e] px-4 py-3 text-black disabled:opacity-35"
                    >
                      CONFIRMAR LOGIN
                    </button>
                  </>
                )}
              </div>
            </LoginCard>

            <LoginCard
              id="stackup-id"
              title="STACKUP HOLD'EM ID"
              subtitle="Entrar com a sua conta"
              icon={KeyRound}
              open={openCard === "stackup-id"}
              onToggle={toggle}
            >
              <div className="space-y-3">
                <input
                  value={stackupId}
                  onChange={(event) => setStackupId(event.target.value)}
                  placeholder="STACKUP ID OU E-MAIL"
                  autoComplete="username"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25"
                />

                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="SENHA"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25"
                />

                <button
                  type="button"
                  disabled={!stackupId.trim() || !password.trim()}
                  onClick={() => onEnter("stackup-id")}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d89a31] via-[#f3c866] to-[#bd7d1e] px-4 py-3 text-black disabled:opacity-35"
                >
                  <ShieldCheck size={20} />
                  ENTRAR COM STACKUP ID
                </button>
              </div>
            </LoginCard>
          </div>
        </div>
      </div>
    </main>
  );
}