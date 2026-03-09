"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSettings } from "../SettingsContext";

const feedbackText = {
  title: {
    no: "Tilbakemelding på denne siden",
    en: "Feedback on this page",
  },
  intro: {
    no: "Fant du feil eller har forslag? Dette er en prototype – dine kommentarer hjelper oss å forbedre verktøyet.",
    en: "Found an error or have suggestions? This is a prototype – dine kommentarer hjelper oss å forbedre verktøyet.",
  },
  placeholderMessage: {
    no: "Beskriv hva som er uklart, feil eller kan forbedres …",
    en: "Describe what’s confusing, wrong, or could be improved…",
  },
  placeholderEmail: {
    no: "E‑post (valgfritt, hvis du ønsker tilbakemelding)",
    en: "Email (optional, if you want us to follow up)",
  },
  buttonSending: {
    no: "Sender …",
    en: "Sending…",
  },
  buttonDefault: {
    no: "Send tilbakemelding",
    en: "Send feedback",
  },
  sent: {
    no: "Takk! Tilbakemeldingen din er sendt.",
    en: "Thank you! Your feedback has been sent.",
  },
  error: {
    no: "Noe gikk galt. Prøv igjen senere.",
    en: "Something went wrong. Please try again later.",
  },
};

export default function FeedbackFormInline() {
  const pathname = usePathname();
  const { lang } = useSettings();
  const l = lang === "no" ? "no" : "en";

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email: email.trim() || null,
          path: pathname,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setMessage("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-3xl border border-slate-400 bg-white rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-1">
        {feedbackText.title[l]}
      </h3>
      <p className="text-xs text-slate-700 mb-3">
        {feedbackText.intro[l]}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={3}
          className="w-full text-sm text-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-slate-800"
          placeholder={feedbackText.placeholderMessage[l]}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="email"
            className="flex-1 text-sm text-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder:text-slate-800"
            placeholder={feedbackText.placeholderEmail[l]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={status === "loading" || !message.trim()}
            className="px-4 py-2 rounded-md bg-black text-white text-xs font-semibold tracking-[0.12em] uppercase disabled:bg-slate-400 disabled:text-slate-100"
          >
            {status === "loading"
              ? feedbackText.buttonSending[l]
              : feedbackText.buttonDefault[l]}
          </button>
        </div>
        {status === "sent" && (
          <p className="text-xs text-slate-900">
            {feedbackText.sent[l]}
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-600">
            {feedbackText.error[l]}
          </p>
        )}
      </form>
    </div>
  );
}
