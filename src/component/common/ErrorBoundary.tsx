// src/common/components/ErrorBoundary.tsx
import React, { Component, type ErrorInfo, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom UI
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // This is where you would log the error to a service like Sentry or LogRocket
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/"; // Force a hard refresh to clear memory
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We've been notified and are looking into it.
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>
            Return to Dashboard
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
