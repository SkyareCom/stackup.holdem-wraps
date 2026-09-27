import React from "react";
import { Play, X } from "lucide-react";

export function TrainingSheet({ module, onClose, onStart }) {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-3 backdrop-blur-sm">
      <button type="button" aria-label="Fechar" className="absolute inset-0 cursor-default" onClick={onClose} />
      <section className="relative mb-[calc(10px+env(safe-area-inset-bottom))] w-full max-w-[430px] rounded-[28px] border border-white/10 bg-gradient-to-b from-[#2a0a10] to-[#080304] p-5 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-300/55">{module.tag}</p>
            <h3 className="mt-1 text-xl font-black tracking-wide text-white">{module.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65">
            <X size={18} />
          </button>
        </div>
        <p className="text-[12px] leading-6 text-white/55">{module.description}</p>
        <button type="button" onClick={() => onStart(module)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 px-4 py-3.5 text-[12px] font-black tracking-[0.08em] text-black active:scale-[0.99]">
          <Play size={16} fill="currentColor" />
          INICIAR TREINO
        </button>
      </section>
    </div>
  );
}