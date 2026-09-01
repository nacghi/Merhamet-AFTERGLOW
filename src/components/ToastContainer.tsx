import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useNovel } from '../context/NovelContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useNovel();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 ${
            toast.type === 'success'
              ? 'bg-[#121a15]/95 border-emerald-500/40 text-emerald-100'
              : toast.type === 'error'
              ? 'bg-[#1f1214]/95 border-rose-500/40 text-rose-100'
              : 'bg-[#161821]/95 border-[#c49b66]/30 text-amber-100'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#c49b66]" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs mt-0.5 opacity-80 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 p-1 opacity-60 hover:opacity-100 transition-opacity rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
