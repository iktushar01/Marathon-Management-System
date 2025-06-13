import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import SmoothFollower from "../Shared/Cursor/SmoothFollower";
import Loading from "../Shared/Loading/Loading";
import ScrollToTop from "../Hooks/ScrollToTop";
import useIsLargeScreen from "../hooks/useIsLargeScreen";

const MainLayout = () => {
  const navigation = useNavigation();
  const isLarge = useIsLargeScreen();
  return (
    <div>
      {/* Global Mouse Cursor */}
      {isLarge && <SmoothFollower />}

      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Global Loader while navigation is loading */}
      {navigation.state === "loading" && <Loading />}

      {/* Main Page Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
