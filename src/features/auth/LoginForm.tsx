// src/features/auth/LoginForm.tsx
import { use, useState } from "react";
//import { useAppDispatch } from "../../app/hooks";
//import { login } from "./authSlice";
import { Button, TextField, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
const roles = ["Admin", "Engineer", "Viewer"];

export default function LoginForm() {
  const location = useLocation();
  // const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState("Viewer");

  const handleLogin = () => {
    navigation.navigate("/dashboard", { state: { from: location } });
    // Mock token
    // dispatch(login({ role: selectedRole as any, token: "mock-token" }));
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <TextField
        select
        label="Role"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        fullWidth
        margin="normal"
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        Login
      </Button>
    </div>
  );
}
