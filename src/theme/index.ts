import { createTheme } from "@mui/material/styles";
import { type IncidentSeverity } from "../types/types";

/* =========================================================
   1️⃣  Theme Augmentation
========================================================= */

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

  interface Palette {
    severity: Record<IncidentSeverity, string>;
  }

  interface PaletteOptions {
    severity?: Record<IncidentSeverity, string>;
  }
}

/* =========================================================
   2️⃣  Reusable Shadows
========================================================= */

const customShadows = {
  card: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  elevated: "0px 4px 12px rgba(0, 0, 0, 0.3)",
  button: "0px 2px 6px rgba(0,0,0,0.08)",
};

/* =========================================================
   3️⃣  Common Component Overrides
========================================================= */

const commonComponents = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        textRendering: "optimizeLegibility",
      },
      "@font-face": {
        fontFamily: "Inter",
        fontDisplay: "swap",
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        color: "#9E9E9E", // default helper text color
        "&.Mui-error": {
          color: "#c1121f", // error color
        },
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        "&:last-child": {
          paddingBottom: 0,
        },
      },
    },
  },
};

/* =========================================================
   4️⃣  Color Palette
========================================================= */

// Map your custom palette
const PALETTE = {
  moltenLava: "#780000", // Critical / Error
  flagRed: "#c1121f", // High / Warning
  papayaWhip: "#fdf0d5", // Light background / paper
  deepSpaceBlue: "#003049", // Primary / medium
  steelBlue: "#669bbc", // Secondary / low
};

/* =========================================================
   5️⃣  Create Theme
========================================================= */

export const theme = createTheme({
  customShadows,

  typography: {
    fontFamily: '"Inter Variable", "Inter", sans-serif',
  },

  colorSchemes: {
    light: {
      palette: {
        mode: "light",

        primary: { main: PALETTE.deepSpaceBlue },
        secondary: { main: PALETTE.steelBlue },

        success: { main: PALETTE.steelBlue, contrastText: "#fff" },
        info: { main: PALETTE.deepSpaceBlue, contrastText: "#fff" },
        warning: { main: PALETTE.flagRed, contrastText: "#fff" },
        error: { main: PALETTE.moltenLava, contrastText: "#fff" },

        severity: {
          critical: PALETTE.moltenLava,
          high: PALETTE.flagRed,
          medium: PALETTE.deepSpaceBlue,
          low: PALETTE.steelBlue,
        },

        background: {
          default: PALETTE.papayaWhip,
          paper: PALETTE.papayaWhip,
        },

        text: {
          primary: PALETTE.deepSpaceBlue,
          secondary: PALETTE.steelBlue,
        },
      },
    },

    dark: {
      palette: {
        mode: "dark",

        primary: { main: PALETTE.deepSpaceBlue },
        secondary: { main: PALETTE.steelBlue },

        success: { main: PALETTE.steelBlue, contrastText: "#fff" },
        info: { main: PALETTE.deepSpaceBlue, contrastText: "#fff" },
        warning: { main: PALETTE.flagRed, contrastText: "#fff" },
        error: { main: PALETTE.moltenLava, contrastText: "#fff" },

        severity: {
          critical: PALETTE.moltenLava,
          high: PALETTE.flagRed,
          medium: PALETTE.deepSpaceBlue,
          low: PALETTE.steelBlue,
        },

        background: {
          default: "#001524", // Dark variant of Deep Space Blue
          paper: "#00263d",
        },

        text: {
          primary: "#fdf0d5", // Papaya Whip
          secondary: PALETTE.steelBlue,
        },
      },
    },
  },

  components: commonComponents,
});
