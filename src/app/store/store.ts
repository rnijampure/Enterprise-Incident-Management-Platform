// src/app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slice/authSlice";
import { incidentApi } from "../../features/incident/api/incidentApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import aiReducer from "../../features/AI/slice/aiSlice";
//../features/AI/slice/aiSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ai: aiReducer,
    [incidentApi.reducerPath]: incidentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(incidentApi.middleware),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Enables refetchOnFocus / refetchOnReconnect
setupListeners(store.dispatch);
