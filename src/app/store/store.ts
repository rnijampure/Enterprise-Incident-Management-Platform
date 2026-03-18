// src/app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slice/authSlice";
import { incidentApi } from "../../features/incident/api/incidentApi";
import { lookupApi } from "../../features/lookups/api/lookupApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { usersApi } from "../../features/user/api/usersApi";
//../features/AI/slice/aiSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [incidentApi.reducerPath]: incidentApi.reducer,
    [lookupApi.reducerPath]: lookupApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      incidentApi.middleware,
      lookupApi.middleware,
      usersApi.middleware,
    ),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Enables refetchOnFocus / refetchOnReconnect
setupListeners(store.dispatch);
