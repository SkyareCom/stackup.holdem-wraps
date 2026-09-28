import React from "react";
import {
  BarChart3,
  Dumbbell,
  Home,
  ShoppingBag,
  UserRound,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "HOME", icon: Home },
  { id: "treinos", label: "TREINOS", icon: Dumbbell },
  { id: "stats", label: "STATS", icon: BarChart3 },
  { id: "perfil", label: "PERFIL", icon: UserRound },
  { id: "loja", label: "LOJA", icon: ShoppingBag },
];

export function BottomNavigation({ active, onChange }) {
  return (
    <nav className="bottom-safe fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-[#070203]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] w-full max-w-[430px] items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex h-full min-w-[56px] flex-col items-center justify-center gap-1 transition ${isActive ? "text-red-400" : "text-white/35"}`}
            >
              {isActive && (
                <span className="absolute top-0 h-[2px] w-9 rounded-b-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
              )}
              <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
              <span className="text-[8px] tracking-[0.08em]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}