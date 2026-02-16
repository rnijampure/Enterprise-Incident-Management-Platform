import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import NavBar from "./header/NavBar";
import FooterItem from "./footer/FooterItem";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="header" sx={{ height: "65px" }}>
        <NavBar />
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", overflowY: "auto" }}
      >
        {/* Suspense here ensures that only the main content area shows a loader, 
            keeping the NavBar visible and interactive. */}
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <Outlet />
        </Suspense>
      </Box>

      <Box component="footer" sx={{ height: "50px" }}>
        <FooterItem />
      </Box>
    </Box>
  );
};
export default Layout;
