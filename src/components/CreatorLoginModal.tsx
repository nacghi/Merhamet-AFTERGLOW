import React, { useState } from 'react';
import { Lock, KeyRound, Sparkles, X, ShieldCheck } from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { EagleIcon } from './Symbols';

export const CreatorLoginModal: React.FC = () => {
  const { isCreatorLoginOpen, setIsCreatorLoginOpen, loginCreator } = useNovel();
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCreatorLoginOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');
    const ok = await loginCreator(passcode);
    setIsSubmitting(false);

    if (ok) {
      setPasscode('');
      setIsCreatorLoginOpen(false);
    } else {
      setErrorMessage('Invalid Creator Passcode. (Default is "afterglow2026")');
    }
  };

  const handleQuickDemoAccess = async () => {
    setIsSubmitting(true);
    await loginCreator('afterglow2026');
    setIsSubmitting(false);
    setIsCreatorLoginOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02040b]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#080e1e] border border-[#7292bf]/30 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#142345] border border-[#7292bf]/40 flex items-center justify-center text-[#e39264]">
              <EagleIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#eef4fb]">Creator Studio</h3>
              <p className="text-[11px] font-mono text-[#7691b0]">Author & Lore Management</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreatorLoginOpen(false)}
            className="p-1.5 rounded-lg text-[#6c85a6] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8da8ca] mb-2">
              Author Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c85a6]" />
              <input
                type="password"
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full bg-[#040814] border border-white/10 focus:border-[#7292bf] text-[#edf4fd] pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#7292bf] transition-all placeholder-[#5d7596]"
              />
            </div>
            {errorMessage && <p className="text-xs text-rose-400 mt-2">{errorMessage}</p>}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={isSubmitting || !passcode.trim()}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#172b4f] to-[#253e70] hover:from-[#1e345e] hover:to-[#2e4d88] border border-[#7292bf]/50 text-[#ffffff] font-display text-xs tracking-wider uppercase font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(114,146,191,0.25)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#e39264]" />
                  <span>Unlock Creator Studio</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full py-2 px-4 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-[#8faecf] rounded-xl text-[11px] font-mono transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e39264]" />
              <span>Quick Login (Passcode: afterglow2026)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
