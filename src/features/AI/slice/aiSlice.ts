// incident-management/src/features/AI/slice/aiSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { sendMessage } from "../api/aiService";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

interface AiState {
  chats: Record<string, ChatState>;
}

const initialState: AiState = { chats: {} };

// Thunk to send AI message
export const sendAiMessageThunk = createAsyncThunk<
  { incidentId: string; reply: string },
  { incidentId?: string; message: string }
>("ai/sendMessage", async ({ incidentId, message }) => {
  const id = incidentId ?? "global";
  const reply = await sendMessage(message);
  return { incidentId: id, reply };
});

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    addUserMessage: (
      state,
      action: PayloadAction<{ incidentId?: string; message: Message }>,
    ) => {
      const incidentId = action.payload.incidentId ?? "global";
      if (!state.chats[incidentId]) {
        state.chats[incidentId] = { messages: [], loading: false, error: null };
      }
      state.chats[incidentId].messages.push(action.payload.message);
    },
    clearChat: (state, action: PayloadAction<string>) => {
      delete state.chats[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAiMessageThunk.pending, (state, action) => {
        const incidentId = action.meta.arg.incidentId ?? "global";
        if (!state.chats[incidentId]) {
          state.chats[incidentId] = {
            messages: [],
            loading: false,
            error: null,
          };
        }
        state.chats[incidentId].loading = true;
        state.chats[incidentId].error = null;
      })
      .addCase(sendAiMessageThunk.fulfilled, (state, action) => {
        const { incidentId, reply } = action.payload;
        state.chats[incidentId].loading = false;
        state.chats[incidentId].messages.push({
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
        });
      })
      .addCase(sendAiMessageThunk.rejected, (state, action) => {
        const incidentId = action.meta.arg.incidentId ?? "global";
        state.chats[incidentId].loading = false;
        state.chats[incidentId].error =
          action.error.message || "AI request failed";
      });
  },
});

export const { addUserMessage, clearChat } = aiSlice.actions;
export default aiSlice.reducer;
