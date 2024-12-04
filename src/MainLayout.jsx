import React from "react";
import Navbar from "./Components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <nav  className="w-11/12 max-w-screen-xl mx-auto font-inter">
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
