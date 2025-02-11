"use client";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { UserCircleIcon, LogoutIcon } from "@heroicons/react/solid";

const NavBar = ({ onLogout }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let attempts = 0;
      const maxAttempts = 3; // Coba ambil data max 10x (dalam 2 detik)

      const checkUserData = setInterval(() => {
        const userData = localStorage.getItem("authData");

        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            setUsername(parsedData?.username || "Guest");
            clearInterval(checkUserData); // Hentikan interval jika data ditemukan
          } catch (error) {
            console.error("Error parsing userData:", error);
            clearInterval(checkUserData);
            onLogout();
          }
        }

        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(checkUserData);
          console.warn("User data not found, logging out...");
          onLogout();
        }
      }, 200); // Cek setiap 200ms (2 detik total)

      return () => clearInterval(checkUserData); // Cleanup interval saat komponen unmount
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left Section */}
      <div className="flex gap-6 text-lg font-semibold">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/diary" className="hover:underline">
          Diary
        </a>
        <a href="/zip" className="hover:underline">
          Zip
        </a>
      </div>

      {/* Right Section (User Dropdown) */}
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded-md">
          <UserCircleIcon className="h-6 w-6" />
          <span>{username || "Guest"}</span>
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-md overflow-hidden">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onLogout}
                className={`flex items-center px-4 py-2 w-full text-red-600 ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <LogoutIcon className="h-5 w-5 mr-2" /> Log Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  );
};

export default NavBar;
