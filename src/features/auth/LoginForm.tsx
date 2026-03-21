import { useState } from "react";
import { useAppDispatch } from "../../app/hooks/hooks";
import { loginSuccess } from "./slice/authSlice";
import api from "./api/authInterceptor";
import {
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 1. State for real credentials
  const [email, setEmail] = useState("marcus.engineer@example.com");
  const [password, setPassword] = useState("Password123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // 2. Call your HTTPS Backend
      const response = await api.post("/user/login", { email, password });

      // 3. Extract real data (User profile + Access Token)
      const { accessToken, user } = response.data;
      console.log("LOGIN DATA:::", response);
      // 4. Dispatch to Redux (This also saves to localStorage via your slice)
      dispatch(loginSuccess({ user, accessToken }));

      // 5. Navigate to the dashboard or intended page
      const origin = location.state?.from?.pathname || "/dashboard";

      navigate(origin);
    } catch (err: any) {
      // Handle 401 (Invalid) or 500 (Server Down) errors
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      noValidate
      autoComplete="on"
      className="p-8 max-w-sm mx-auto mt-20 shadow-lg rounded-xl bg-white"
    >
      <Typography
        variant="h5"
        className="mb-6 font-bold text-center text-gray-800"
      >
        Enterprise Incident Login
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <TextField
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
        disabled={loading}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
        disabled={loading}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        className="mt-6 py-3"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
      </Button>

      <Typography variant="body2" className="mt-4 text-center text-gray-500">
        Secure Access for RiskOS Teams
      </Typography>
    </Box>
  );
}
