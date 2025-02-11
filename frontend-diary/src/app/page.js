"use client";
import React from "react";
import NavBar from "./component/navbar/navbar";
import { Logout } from "./utils/logout"; // Pastikan ini sesuai dengan export di logout.js

const Home = () => {
  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="h-screen flex flex-col mt-3">
      <NavBar onLogout={handleLogout} />
      <main className="flex-1 mt-14">
        <iframe
          src="https://portofolio-git-main-verolies-projects.vercel.app/"
          style={{ overflow: "hidden" }}
          className="w-full h-full border-none"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
};

export default Home;
