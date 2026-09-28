import React, { useEffect, useMemo, useRef, useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
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
  const [activeNav, setActiveNav] = useState("home");
  const [selectedModule, setSelectedModule] = useState(null);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef(null);

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

  const handleNavigation = (destination) => {
    setActiveNav(destination);
    setSelectedModule(null);
    analytics.navigationSelected({
      destination,
      plan: session.plan,
    });
  };

  const renderPage = () => {
    switch (activeNav) {
      case "treinos":
        return <TrainingPage />;
      case "stats":
        return <StatsPage />;
      case "perfil":
        return <ProfilePage />;
      case "loja":
        return <StorePage />;
      case "home":
      default:
        return (
          <HomePage
            modules={TRAINING_MODULES}
            session={session}
            onOpenModule={handleModuleOpen}
            onQuickStart={handleQuickStart}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050102] text-white">
      {renderPage()}

      <BottomNavigation active={activeNav} onChange={handleNavigation} />

      <TrainingSheet
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onStart={handleTrainingStart}
      />

      <Notice text={notice} />
    </div>
  );
}