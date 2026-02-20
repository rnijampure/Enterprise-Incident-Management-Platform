// src/features/AI/api/aiService.ts
const URL = import.meta.env.VITE_API_BASE_URL;

export const sendMessage = async (message: string) => {
  const res = await fetch(`${URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }), // must be { message: string }
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Failed to send message");

  return data.reply;
};
