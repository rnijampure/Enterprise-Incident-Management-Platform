// incident-management/src/features/AI/hooks/useAiAssistant.ts
import { useAppDispatch, useAppSelector } from "../../../app/hooks/hooks";
import {
  addUserMessage,
  sendAiMessageThunk,
  type Message,
} from "../slice/aiSlice";

interface UseAiAssistantProps {
  incidentId?: string; // optional, global if not provided
}

export const useAiAssistant = ({ incidentId }: UseAiAssistantProps = {}) => {
  const dispatch = useAppDispatch();
  const chatId = incidentId ?? "global";

  const chat = useAppSelector((state) => state.ai.chats[chatId]);
  const messages = chat?.messages ?? [];
  const loading = chat?.loading ?? false;
  const error = chat?.error ?? null;

  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? null;

  const send = (content: string) => {
    const message: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    dispatch(addUserMessage({ incidentId: chatId, message }));
    dispatch(sendAiMessageThunk({ incidentId: chatId, message: content }));
  };

  const regenerate = () => {
    if (lastUserMessage) {
      dispatch(
        sendAiMessageThunk({ incidentId: chatId, message: lastUserMessage }),
      );
    }
  };

  return { messages, loading, error, send, regenerate };
};
