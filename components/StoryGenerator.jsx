"use client";

import { useState } from "react";

const TEXT = {
  en: {
    dir: "ltr",
    title: "Story Sky",
    subtitle: "Magical stories made just for you!",
    nameLabel: "What is the hero's name?",
    namePlaceholder: "Type a name... like Lina or Adam",
    generate: "✨ Generate My Story! ✨",
    generating: "Writing your story...",
    loadingFun: "The sun is spinning up a wonderful tale...",
    storyReady: "Your story is ready!",
    again: "🪄 Tell me another story!",
    errorTitle: "Oops! A little cloud got in the way ☁️",
    errors: {
      invalid_name: "Please type the hero's name first (up to 50 letters).",
      server_config: "The story machine isn't set up yet. Ask a grown-up to add the magic key!",
      default: "We couldn't reach the story land right now. Please try again in a moment!",
    },
    langButton: "العربية",
    langSwitchTo: "ar",
  },
  ar: {
    dir: "rtl",
    title: "سماء الحكايات",
    subtitle: "قصص سحرية صُنعت خصيصاً لك!",
    nameLabel: "ما اسم بطل القصة؟",
    namePlaceholder: "اكتب اسماً... مثل لينا أو آدم",
    generate: "✨ أنشئ قصتي! ✨",
    generating: "جارٍ كتابة قصتك...",
    loadingFun: "الشمس تنسج لك حكاية رائعة...",
    storyReady: "قصتك جاهزة!",
    again: "🪄 احكِ لي قصة أخرى!",
    errorTitle: "عذراً! غيمة صغيرة اعترضت الطريق ☁️",
    errors: {
      invalid_name: "من فضلك اكتب اسم البطل أولاً (٥٠ حرفاً كحد أقصى).",
      server_config: "آلة القصص ليست جاهزة بعد. اطلب من شخص كبير إضافة المفتاح السحري!",
      default: "لم نستطع الوصول إلى أرض الحكايات الآن. حاول مرة أخرى بعد قليل!",
    },
    langButton: "English",
    langSwitchTo: "en",
  },
};

function LoadingSun({ t }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8" role="status" aria-live="polite">
      <div className="relative h-20 w-20 animate-spin-slow">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-7 w-2 origin-top rounded-full bg-sunshine"
            style={{ transform: `rotate(${i * 45}deg) translateY(26px)` }}
          />
        ))}
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-200 to-amber-400 shadow-lg" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">😊</div>
      </div>
      <div className="flex items-end gap-2">
        <span className="animate-bounce-soft text-3xl">☁️</span>
        <span className="animate-bounce-soft text-2xl" style={{ animationDelay: "0.3s" }}>☁️</span>
        <span className="animate-bounce-soft text-xl" style={{ animationDelay: "0.6s" }}>☁️</span>
      </div>
      <p className="text-lg font-semibold text-sky-800">{t.loadingFun}</p>
    </div>
  );
}

export default function StoryGenerator() {
  const [language, setLanguage] = useState("en");
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = TEXT[language];

  async function generateStory(e) {
    e.preventDefault();
    if (loading) return;

    const trimmed = name.trim();
    if (!trimmed) {
      setError(t.errors.invalid_name);
      return;
    }

    setLoading(true);
    setError("");
    setStory("");

    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, language }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.story) {
        setError(t.errors[data.error] || t.errors.default);
        return;
      }
      setStory(data.story);
    } catch {
      setError(t.errors.default);
    } finally {
      setLoading(false);
    }
  }

  function switchLanguage() {
    setLanguage(t.langSwitchTo);
    setError("");
  }

  return (
    <div dir={t.dir} className="w-full">
      {/* Language toggle */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={switchLanguage}
          className="rounded-full border-4 border-white bg-grass px-6 py-2 text-lg font-bold text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          🌍 {t.langButton}
        </button>
      </div>

      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="animate-pop-in text-5xl font-extrabold text-white drop-shadow-[0_4px_0_rgba(2,132,199,0.45)] sm:text-6xl">
          {t.title}
        </h1>
        <p className="mt-3 text-xl font-semibold text-sky-900/80">{t.subtitle}</p>
      </header>

      {/* Input card */}
      <form
        onSubmit={generateStory}
        className="animate-pop-in rounded-[2.5rem] border-4 border-white/80 bg-white/85 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
      >
        <label htmlFor="hero-name" className="mb-3 block text-2xl font-bold text-sky-900">
          🦸 {t.nameLabel}
        </label>
        <input
          id="hero-name"
          type="text"
          value={name}
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          disabled={loading}
          className="w-full rounded-3xl border-4 border-sky-deep/50 bg-sky-50 px-5 py-4 text-xl font-semibold text-sky-900 placeholder:text-sky-400 focus:border-candy focus:outline-none disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-candy via-orange-400 to-sunshine px-8 py-4 text-2xl font-extrabold text-white shadow-xl transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? t.generating : t.generate}
        </button>

        {error && (
          <div
            role="alert"
            className="mt-6 animate-pop-in rounded-3xl border-4 border-orange-300 bg-orange-50 p-5 text-center"
          >
            <p className="text-xl font-bold text-orange-600">{t.errorTitle}</p>
            <p className="mt-1 text-lg font-semibold text-orange-500">{error}</p>
          </div>
        )}
      </form>

      {/* Loading animation */}
      {loading && (
        <div className="mt-8 animate-pop-in rounded-[2.5rem] border-4 border-white/80 bg-white/85 shadow-2xl backdrop-blur-sm">
          <LoadingSun t={t} />
        </div>
      )}

      {/* Story card */}
      {story && !loading && (
        <article className="mt-8 animate-pop-in rounded-[2.5rem] border-4 border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          <p className="mb-4 inline-block animate-wiggle rounded-full bg-grass/20 px-5 py-2 text-lg font-bold text-green-700">
            📖 {t.storyReady}
          </p>
          <div className="story-text text-xl font-medium text-sky-950">{story}</div>
          <button
            type="button"
            onClick={generateStory}
            className="mt-8 w-full rounded-full bg-gradient-to-r from-sky-deep to-indigo-400 px-8 py-4 text-xl font-extrabold text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            {t.again}
          </button>
        </article>
      )}
    </div>
  );
}
