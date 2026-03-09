// src/components/PageFooter.tsx
"use client";

import SettingsToggleBar from "./SettingsToggleBar";          // adjust path if needed
import FeedbackFormInline from "./FeedbackFormInline";  // from step 1

export default function PageFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 mt-10">
                <div className="flex justify-end">
          <SettingsToggleBar />
        </div>
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Top row: settings toggle (can be aligned as you like) */}
      

        {/* Feedback form */}
        <div className="flex justify-center">
          <FeedbackFormInline />
        </div>
    
                    
        {/* Small footer text if you want */}
        <p className="text-[11px] text-slate-500 text-center">
          {/* Prototype – innholdet kan være ufullstendig eller inneholde feil. */}
        </p>
      </div>
    </footer>
  );
}
