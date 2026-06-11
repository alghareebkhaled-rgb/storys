# Story Sky | سماء الحكايات ☀️📖

A bright, child-friendly story generator for kids aged 6–15. Pick a language
(English or Arabic), type the hero's name, and a brand-new story is written
by AI — under a blue sky with a glowing sun and drifting clouds.

## Tech stack

- **Next.js** (App Router) — server-side API route keeps the key secret
- **Tailwind CSS** — custom animations (drifting clouds, glowing sun, spinning loader)
- **OpenRouter API** — `openai/gpt-oss-120b:free` (free tier) for stories
- Full **RTL support** — the whole UI flips and translates for Arabic

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file and add your [OpenRouter key](https://openrouter.ai/keys):

   ```bash
   cp .env.local.example .env.local
   # then edit .env.local and paste your real key
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and generate a story!

## Project structure

```
app/
  layout.js            # Root layout + playful Arabic/Latin font
  page.js              # Home page (server component)
  globals.css          # Sky gradient, cloud shapes, Tailwind layers
  api/story/route.js   # Secure server-side OpenRouter call
components/
  SkyBackground.jsx    # Animated sun + drifting clouds (pure CSS)
  StoryGenerator.jsx   # Client component: language toggle, form, story view
```

## Safety

The system prompt forces stories to be positive, educational, imaginative,
and age-appropriate — no violence, fear, or unsafe content. The API key never
reaches the browser; all OpenRouter calls happen on the server.
