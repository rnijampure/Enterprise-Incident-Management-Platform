// src/components/common/ThemeToggleButton.tsx
import { IconButton, useTheme, Tooltip } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

interface ThemeToggleButtonProps {
  onToggle: () => void;
}

export default function ThemeToggleButton({
  onToggle,
}: ThemeToggleButtonProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Tooltip title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <IconButton color="inherit" onClick={onToggle}>
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
