import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import AppThemeProvider from "./theme/ThemeProvider";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Components
import LoginForm from "./features/auth/LoginForm";
import PrivateRoute from "./features/auth/routing/PrivateRoute";
import Layout from "./component/layout/layout";
// // Fonts - These are fine, but ensure ThemeProvider uses 'swap'
// import "@fontsource/inter/400.css";
// import "@fontsource/inter/500.css";
// import "@fontsource/inter/600.css";
// import "@fontsource/inter/700.css";
import "@fontsource-variable/inter/index.css";
import ErrorBoundary from "./component/common/ErrorBoundary";

// Lazy load the Dashboard to shrink the initial JS bundle
const Dashboard = lazy(() => import("./features/dashboard/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <AppThemeProvider>
          <RouterProvider router={router} />
        </AppThemeProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
