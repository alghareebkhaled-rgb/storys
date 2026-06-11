import { NextResponse } from "next/server";

const MODEL = "openai/gpt-oss-120b:free";

const SYSTEM_PROMPTS = {
  en: `You are a beloved children's storyteller. Write a creative, engaging,
and age-appropriate story for a child between 6 and 15 years old.

Rules you MUST follow:
- The main character's name MUST be exactly the name provided by the user.
- The story MUST be written entirely in English.
- Keep the tone positive, educational, imaginative, and completely safe for children.
- No violence, fear, romance, or any inappropriate content.
- Length: roughly 300-450 words, split into short, easy-to-read paragraphs.
- Start with a fun title on the first line, then the story.
- End with a gentle, uplifting lesson or moral.`,
  ar: `أنت حكواتي محبوب للأطفال. اكتب قصة إبداعية وشيقة ومناسبة
لطفل يتراوح عمره بين 6 و 15 سنة.

قواعد يجب الالتزام بها:
- يجب أن يكون اسم الشخصية الرئيسية هو الاسم الذي قدمه المستخدم بالضبط.
- يجب أن تُكتب القصة بالكامل باللغة العربية الفصحى المبسطة.
- حافظ على نبرة إيجابية وتعليمية وخيالية وآمنة تماماً للأطفال.
- لا عنف ولا خوف ولا أي محتوى غير مناسب.
- الطول: حوالي 300-450 كلمة، مقسمة إلى فقرات قصيرة سهلة القراءة.
- ابدأ بعنوان ممتع في السطر الأول، ثم القصة.
- اختم بعبرة أو درس لطيف ومُلهم.`,
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const language = body?.language === "ar" ? "ar" : "en";

  if (!name || name.length > 50) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY is not set");
    return NextResponse.json({ error: "server_config" }, { status: 500 });
  }

  const userPrompt =
    language === "ar"
      ? `اكتب قصة جديدة الآن. اسم الشخصية الرئيسية: "${name}".`
      : `Write a brand new story now. The main character's name is: "${name}".`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/alghareebkhaled-rgb/storys",
          "X-Title": "Story Sky - Children's Story Generator",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPTS[language] },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 1200,
          temperature: 0.9,
        }),
      }
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("OpenRouter error:", response.status, detail);
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    const data = await response.json();
    // Strip markdown emphasis markers some models add — the UI renders plain text.
    const story = data?.choices?.[0]?.message?.content
      ?.replace(/\*\*|__|^#+\s*/gm, "")
      .trim();

    if (!story) {
      console.error("OpenRouter returned an empty story:", data);
      return NextResponse.json({ error: "empty_story" }, { status: 502 });
    }

    return NextResponse.json({ story });
  } catch (err) {
    console.error("Failed to reach OpenRouter:", err);
    return NextResponse.json({ error: "network" }, { status: 502 });
  }
}
