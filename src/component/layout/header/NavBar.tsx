// src/components/layout/NavBar.tsx
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggleButton from "../../common/ThemeToggleButton";
import { useColorScheme } from "@mui/material/styles";
export default function NavBar() {
  const { mode, setMode } = useColorScheme();
  if (!mode) return null; // Prevent hydration mismatch
  const toggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };
  return (
    <AppBar position="static" style={{ marginBottom: 2, borderRadius: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box>
          <ThemeToggleButton onToggle={toggleTheme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
