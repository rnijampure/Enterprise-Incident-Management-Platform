// src/features/auth/slice/authSlice.ts
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../../../types/types";

const storedUser = localStorage.getItem("incident_user");
const userObj = storedUser ? JSON.parse(storedUser) : null;
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  loginError: string | null;

  isSessionExpiring: boolean;
}
const initialState: AuthState = {
  user: userObj,
  accessToken: null,
  isLoggedIn: !!userObj,
  loginError: null,

  isSessionExpiring: false,
};
import api from "../api/authInterceptor"; // Your axios instance

// 1. Define the Async Thunk
export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/refresh", {
        withCredentials: true,
      });
      return response.data; // Should return { accessToken, user }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Refresh failed");
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; accessToken: string }>, // Type safety!
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      console.log(action.payload.user);
      localStorage.setItem(
        "incident_user",
        JSON.stringify(action.payload.user),
      );
      state.isLoggedIn = true;
      state.loginError = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loginError = action.payload;
    },
    setSessionExpiring: (state, action: PayloadAction<boolean>) => {
      state.isSessionExpiring = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isSessionExpiring = false;
    },
    logOut(state) {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      state.isSessionExpiring = false;
      //  localStorage.removeItem("incident_user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        // If refresh fails, clear the session
        state.user = null;
        state.accessToken = null;
        state.isLoggedIn = false;
        localStorage.removeItem("incident_user");
      });
  },
});

export const {
  loginSuccess, //
  //setCredentials,
  loginFailure,
  logOut,
  setSessionExpiring,
  updateToken,
} = authSlice.actions;
export default authSlice.reducer;
