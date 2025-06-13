import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import SmoothFollower from "../Shared/Cursor/SmoothFollower";
import Loading from "../Shared/Loading/Loading";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <div>
      {/* Global Mouse Cursor */}
      <div className="hidden lg:block">
        <SmoothFollower />
      </div>

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
