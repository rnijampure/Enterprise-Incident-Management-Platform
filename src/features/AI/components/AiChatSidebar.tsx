// incident-management/src/features/AI/components/AiChatSidebar.tsx
import React, { useState } from "react";
import { useAiAssistant } from "../hooks/useAiAssistant";

interface AiChatSidebarProps {
  incidentId?: string; // optional, global if not provided
  insertIntoNotes?: (text: string) => void; // callback from incident notes
}

const AiChatSidebar: React.FC<AiChatSidebarProps> = ({
  incidentId,
  insertIntoNotes,
}) => {
  const { messages, loading, send, regenerate } = useAiAssistant({
    incidentId,
  });
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    send(input.trim());
    setInput("");
  };

  const handleInsertLastAI = () => {
    const lastAI = [...messages].reverse().find((m) => m.role === "assistant");
    if (lastAI && insertIntoNotes) {
      insertIntoNotes(lastAI.content);
    }
  };

  return (
    <div style={{ width: 320, border: "1px solid #ccc", padding: 10 }}>
      <h3>AI Assistant</h3>
      <div
        style={{
          minHeight: 200,
          maxHeight: 400,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "4px 0",
            }}
          >
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
          </div>
        ))}
        {loading && <div>AI is thinking...</div>}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
        style={{ width: "100%", marginBottom: 5 }}
      />
      <button onClick={handleSend} style={{ width: "100%", marginBottom: 5 }}>
        Send
      </button>
      <button onClick={regenerate} style={{ width: "100%", marginBottom: 5 }}>
        Regenerate
      </button>
      <button onClick={handleInsertLastAI} style={{ width: "100%" }}>
        Insert into Notes
      </button>
    </div>
  );
};

export default AiChatSidebar;
