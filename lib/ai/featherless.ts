const FEATHERLESS_API_URL =
  "https://api.featherless.ai/v1/chat/completions";

export async function callFeatherless(
  systemPrompt: string,
  userPrompt: string
) {
  const apiKey = process.env.FEATHERLESS_API_KEY;
  const model = process.env.FEATHERLESS_MODEL;

  if (!apiKey) {
    throw new Error("FEATHERLESS_API_KEY is missing");
  }

  if (!model) {
    throw new Error("FEATHERLESS_MODEL is missing");
  }

  const response = await fetch(FEATHERLESS_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "X-Title": "CHAKSH",
    },

    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1500,
      chat_template_kwargs: {
        enable_thinking: false,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Featherless API error ${response.status}: ${errorText}`
    );
  }

  const data = await response.json();

  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Featherless returned an empty response");
  }

  return content;
}
