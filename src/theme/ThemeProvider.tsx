// src/theme/ThemeProvider.tsx

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { type ReactNode } from "react";
import { theme } from "./index";

interface Props {
  children: ReactNode;
}

export default function AppThemeProvider({ children }: Props) {
  return (
    <>
      <InitColorSchemeScript defaultMode="system" />
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </>
  );
}
