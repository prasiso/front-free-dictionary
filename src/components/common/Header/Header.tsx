"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, logout, nameIcon } from "@/helper";

export const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const user = getUser();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  function handleLogout() {
    logout();
  }

  return (
    <header className="flex justify-between items-center px-6 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-sans">
      <div className="font-bold text-xl select-none" aria-label="Logo">
        Free Dictionary
      </div>
      <div
        className="relative flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        ref={userMenuRef}
        aria-haspopup="true"
        aria-expanded={isUserMenuOpen}
        role="button"
        tabIndex={0}
      >
        <span className="font-semibold text-base">{user?.name}</span>
        <div
          aria-label={`User initials for ${user?.name}`}
          className="w-9 h-9 rounded-full bg-purple-300 text-purple-900 font-bold text-lg flex justify-center items-center shadow-md transition-colors duration-300 hover:bg-purple-400 hover:text-purple-800"
        >
            {nameIcon(user?.name)}
        </div>
        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              className="absolute top-12 right-0 w-56 bg-white rounded-lg shadow-lg text-gray-800 p-4 flex flex-col gap-3 z-20"
              role="menu"
              aria-label="User info"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: -10, pointerEvents: "none" },
                visible: { opacity: 1, y: 0, pointerEvents: "auto" },
                exit: { opacity: 0, y: -10, pointerEvents: "none" },
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-semibold text-indigo-700">
                Nome:{" "}
                <span className="font-normal text-gray-900">{user?.name}</span>
              </p>
              <p className="text-sm font-semibold text-indigo-700">
                Email:{" "}
                <span className="font-normal text-gray-900">{user?.email}</span>
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="self-start bg-purple-600 text-white px-3 py-1 rounded-md font-semibold text-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
