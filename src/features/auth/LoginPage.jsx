import React, { useState } from "react";
import { BRAND_LOGO } from "../../assets/brandLogo";
import {
  ChevronRight,
  Fingerprint,
  Globe2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Spade,
  UserRound,
} from "lucide-react";

const CARD_CLASS = "login-card";

function WhatsAppGlyph({ size = 24 }) {
  return (
    <span className="relative inline-flex items-center justify-center">
      <MessageCircle size={size} strokeWidth={1.8} />
      <Phone
        size={Math.round(size * 0.46)}
        strokeWidth={1.9}
        className="absolute"
      />
    </span>
  );
}

function LoginCard({ id, title, subtitle, icon: Icon, open, onToggle, children, accent = false }) {
  return (
    <section className={CARD_CLASS}>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="login-card-trigger"
        aria-expanded={open}
      >
        <div className={`login-card-icon ${accent ? "is-accent" : ""}`}>
          {id === "whatsapp" ? (
            <WhatsAppGlyph size={25} />
          ) : (
            <Icon
              size={24}
              strokeWidth={1.75}
              fill={accent ? "currentColor" : "none"}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="login-card-title">{title}</h2>
          <p className="login-card-subtitle">{subtitle}</p>
        </div>

        <ChevronRight
          size={21}
          strokeWidth={1.8}
          className={`login-card-chevron ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open && (
        <div className="login-card-drawer">
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
          ? "border-red-400/55 bg-red-500/12 text-red-100 shadow-[0_0_16px_rgba(255,45,55,0.08)]"
          : "border-white/10 bg-black/28 text-white/72"
      }`}
    >
      {children}
    </button>
  );
}

const ACTION_CLASS =
  "red-glass-btn w-full px-4 py-3 transition active:scale-[0.99] disabled:opacity-35";

const FIELD_CLASS =
  "w-full rounded-2xl border border-red-500/20 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-red-400/45 focus:shadow-[0_0_0_3px_rgba(255,45,55,0.06)]";

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
    <main className="min-h-screen bg-black text-white">
      <div className="login-mockup-shell relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden px-5 pb-8 pt-5 shadow-[0_0_90px_rgba(0,0,0,0.82)]">
        <div className="login-red-glow pointer-events-none absolute inset-x-0 top-0 h-[54%]" />
        <div className="soft-noise pointer-events-none absolute inset-0 opacity-40" />

        <img
          src={`${import.meta.env.BASE_URL}aces-behind-logo.webp?v=20260928-5`}
          alt=""
          aria-hidden="true"
          className="login-bg-aces"
        />

        <div className="relative z-10">
          <header className="pt-1 text-center">
            <div className="login-brand-logo">
              <img
                src={BRAND_LOGO}
                alt="StackUp Hold'em"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="bebrush-word" aria-label="WRAPS">WRAPS</div>
            <p className="login-brand-slogan">PLO COM CONFIANÇA.</p>
          </header>

          <div className="login-card-stack">
            <LoginCard
              id="language"
              title="IDIOMA"
              subtitle="Escolha o idioma do aplicativo"
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
              subtitle="Entre usando um acesso simplificado"
              icon={UserRound}
              open={openCard === "quick"}
              onToggle={toggle}
            >
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onEnter("biometric")}
                  className="flex w-full items-center gap-3 rounded-2xl border border-red-500/28 bg-red-500/8 px-4 py-3 text-white active:scale-[0.99]"
                >
                  <Fingerprint size={20} />
                  BIOMETRIA / FACE ID
                </button>

                <button
                  type="button"
                  onClick={() => onEnter("google")}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-white/78 active:scale-[0.99]"
                >
                  <UserRound size={20} />
                  ENTRAR COM GOOGLE
                </button>
              </div>
            </LoginCard>

            <LoginCard
              id="whatsapp"
              title="LOGIN COM WHATSAPP"
              subtitle="Receba um código de acesso no celular"
              icon={MessageCircle}
              open={openCard === "whatsapp"}
              onToggle={toggle}
            >
              <div className="space-y-3">
                <label className="block">
                  <span className="mb-2 block text-white/58">NÚMERO DO WHATSAPP</span>
                  <div className="flex overflow-hidden rounded-2xl border border-red-500/20 bg-black/35">
                    <span className="flex items-center border-r border-red-500/15 px-4 text-white/58">+55</span>
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
                    className={ACTION_CLASS}
                  >
                    ENVIAR CÓDIGO
                  </button>
                ) : (
                  <>
                    <label className="block">
                      <span className="mb-2 block text-white/58">CÓDIGO DE 4 DÍGITOS</span>
                      <input
                        value={code}
                        onChange={(event) =>
                          setCode(event.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        inputMode="numeric"
                        placeholder="0000"
                        className={FIELD_CLASS}
                      />
                    </label>

                    <button
                      type="button"
                      disabled={code.length !== 4}
                      onClick={() => onEnter("whatsapp")}
                      className={ACTION_CLASS}
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
              subtitle="Use sua identidade central StackUp"
              icon={Spade}
              accent
              open={openCard === "stackup-id"}
              onToggle={toggle}
            >
              <div className="space-y-3">
                <input
                  value={stackupId}
                  onChange={(event) => setStackupId(event.target.value)}
                  placeholder="STACKUP ID OU E-MAIL"
                  autoComplete="username"
                  className={FIELD_CLASS}
                />

                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="SENHA"
                  type="password"
                  autoComplete="current-password"
                  className={FIELD_CLASS}
                />

                <button
                  type="button"
                  disabled={!stackupId.trim() || !password.trim()}
                  onClick={() => onEnter("stackup-id")}
                  className={`${ACTION_CLASS} flex items-center justify-center gap-2`}
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
