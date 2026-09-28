import React, { useEffect, useMemo, useRef, useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { LoginPage } from "./features/auth/LoginPage";
import { HomePage } from "./features/home/HomePage";
import { TrainingPage } from "./features/training/TrainingPage";
import { StatsPage } from "./features/stats/StatsPage";
import { ProfilePage } from "./features/profile/ProfilePage";
import { StorePage } from "./features/store/StorePage";
import { TrainingSheet } from "./features/training/TrainingSheet";
import { TRAINING_MODULES } from "./data/trainingModules";
import { readSession } from "./services/session";
import { canAccessTraining } from "./services/entitlements";
import { analytics } from "./services/analytics";

const PAGES = ["home", "treinos", "stats", "perfil", "loja"];
const SWIPE_THRESHOLD = 64;
const HORIZONTAL_LOCK_RATIO = 1.2;

function Notice({ text }) {
  if (!text) return null;
  return (
    <div className="fixed left-1/2 top-4 z-[60] w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-2xl border border-amber-400/20 bg-[#160a04]/95 px-4 py-3 text-center text-[11px] text-amber-100 shadow-2xl backdrop-blur-xl">
      {text}
    </div>
  );
}

export default function App() {
  const session = useMemo(() => readSession(), []);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [selectedModule, setSelectedModule] = useState(null);
  const [notice, setNotice] = useState("");
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const noticeTimer = useRef(null);
  const gesture = useRef({
    startX: 0,
    startY: 0,
    locked: null,
  });

  const activeIndex = PAGES.indexOf(activeNav);

  useEffect(() => {
    analytics.appOpen({
      plan: session.plan,
      authenticated: session.authenticated,
    });
  }, [session]);

  const showNotice = (text) => {
    setNotice(text);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 1800);
  };

  const handleModuleOpen = (trainingModule) => {
    if (!canAccessTraining(session, trainingModule)) {
      analytics.pricingViewed({
        plan: session.plan,
        required_plan: trainingModule.requiredPlan,
        source: "training_module",
        training_id: trainingModule.id,
      });
      showNotice(`Este treino requer o plano ${trainingModule.requiredPlan.toUpperCase()}.`);
      return;
    }

    analytics.trainingViewed({
      training_id: trainingModule.id,
      plan: session.plan,
    });
    setSelectedModule(trainingModule);
  };

  const handleTrainingStart = (trainingModule) => {
    analytics.trainingStarted({
      training_id: trainingModule.id,
      plan: session.plan,
      mode: "module",
    });
    setSelectedModule(null);
    showNotice(`${trainingModule.title}: treino iniciado.`);
  };

  const handleQuickStart = () => {
    analytics.trainingStarted({
      training_id: "quick-random",
      plan: session.plan,
      mode: "quick",
    });
    showNotice("Jogo rápido selecionado — preparando spot Omaha.");
  };

  const navigateTo = (destination, source = "footer") => {
    if (!PAGES.includes(destination) || destination === activeNav) return;

    setActiveNav(destination);
    setSelectedModule(null);
    setDragX(0);
    setIsDragging(false);

    analytics.navigationSelected({
      destination,
      source,
      plan: session.plan,
    });
  };

  const handleTouchStart = (event) => {
    if (selectedModule) return;
    const touch = event.touches[0];

    gesture.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      locked: null,
    };

    setDragX(0);
    setIsDragging(false);
  };

  const handleTouchMove = (event) => {
    if (selectedModule) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - gesture.current.startX;
    const deltaY = touch.clientY - gesture.current.startY;

    if (gesture.current.locked === null) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;

      gesture.current.locked =
        Math.abs(deltaX) > Math.abs(deltaY) * HORIZONTAL_LOCK_RATIO
          ? "horizontal"
          : "vertical";
    }

    if (gesture.current.locked !== "horizontal") return;

    const isFirstPage = activeIndex === 0 && deltaX > 0;
    const isLastPage = activeIndex === PAGES.length - 1 && deltaX < 0;
    const resistance = isFirstPage || isLastPage ? 0.22 : 1;

    setIsDragging(true);
    setDragX(deltaX * resistance);
  };

  const handleTouchEnd = () => {
    if (gesture.current.locked !== "horizontal") {
      setDragX(0);
      setIsDragging(false);
      return;
    }

    if (dragX <= -SWIPE_THRESHOLD && activeIndex < PAGES.length - 1) {
      navigateTo(PAGES[activeIndex + 1], "swipe");
      return;
    }

    if (dragX >= SWIPE_THRESHOLD && activeIndex > 0) {
      navigateTo(PAGES[activeIndex - 1], "swipe");
      return;
    }

    setDragX(0);
    setIsDragging(false);
  };

  const trackTransform = `translate3d(calc(-${activeIndex * 100}% + ${dragX}px), 0, 0)`;

  if (!hasEntered) {
    return <LoginPage onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#050102] text-white">
      <div
        className={`page-track ${isDragging ? "is-dragging" : ""}`}
        style={{ transform: trackTransform }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <section className="page-panel" aria-hidden={activeNav !== "home"}>
          <HomePage
            modules={TRAINING_MODULES}
            session={session}
            onOpenModule={handleModuleOpen}
            onQuickStart={handleQuickStart}
          />
        </section>

        <section className="page-panel" aria-hidden={activeNav !== "treinos"}>
          <TrainingPage />
        </section>

        <section className="page-panel" aria-hidden={activeNav !== "stats"}>
          <StatsPage />
        </section>

        <section className="page-panel" aria-hidden={activeNav !== "perfil"}>
          <ProfilePage />
        </section>

        <section className="page-panel" aria-hidden={activeNav !== "loja"}>
          <StorePage />
        </section>
      </div>

      <BottomNavigation
        active={activeNav}
        onChange={(destination) => navigateTo(destination, "footer")}
      />

      <TrainingSheet
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onStart={handleTrainingStart}
      />

      <Notice text={notice} />
    </div>
  );
}