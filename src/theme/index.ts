import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: {
      card: string;
      elevated: string;
      button: string;
    };
  }
  interface ThemeOptions {
    customShadows?: {
      card: string;
      elevated: string;
      button: string;
    };
  }
}

const commonThemeOptions = {
  // ... your other options
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Inter",
          fontDisplay: "swap", // This allows the system font to show first
        },
      },
    },
    // ... rest of your components
  },
};
// Define reusable box shadows here
const customShadows = {
  card: "0px 4px 12px rgba(0, 0, 0, 0.1)", // example for cards
  elevated: "0px 4px 12px rgba(0, 0, 0, 0.3)", // more prominent shadow
  button: "0px 2px 6px rgba(0,0,0,0.08)", // subtle shadow for buttons
};
export const theme = createTheme({
  ...commonThemeOptions,
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: { main: "#5e60ce" },
        secondary: { main: "#00b4d8" },
        error: { main: red.A400 },
        background: { default: "#f4f6f8", paper: "#ffffff" },
        text: { primary: "#1f2937", secondary: "#4b5563" },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: { main: "#5e60ce" },
        secondary: { main: "#00b4d8" },
        error: { main: red.A400 },
        background: { default: "#1e1e2f", paper: "#2c2c3e" },
        text: { primary: "#e0e0e0", secondary: "#a0a0a0" },
      },
    },
  },

  typography: {
    fontFamily: '"Inter Variable", "Inter", sans-serif',
  },
  customShadows: customShadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          textRendering: "optimizeLegibility",
        },
      },
    },
  },
});
