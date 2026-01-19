import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Profile = ({ variant = "dropdown" }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: "Unknown User", email: "", role: "" });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (variant === "mobile") return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.exp && payload.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }

      setUser({
        name: payload.name || payload.username || "Unknown User",
        email: payload.email || "",
        role: payload.role || "",
      });
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (variant === "mobile") {
    return (
      <div className="space-y-3 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">User Profile</h3>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-400">Name:</span>
          <span className="truncate text-gray-900 dark:text-gray-100">{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
          <span className="truncate text-gray-900 dark:text-gray-100">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-400">Role:</span>
          <span className="truncate text-gray-900 dark:text-gray-100">{user.role}</span>
        </div>
        <button
          className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
        title="User Profile"
        onClick={() => setShowProfile((prev) => !prev)}
      >
        <FaUser size={20} />
      </button>

      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-5 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-4">User Profile</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-400">Name:</span>
                <span className="truncate text-gray-900 dark:text-gray-100">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                <span className="truncate text-gray-900 dark:text-gray-100">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-400">Role:</span>
                <span className="truncate text-gray-900 dark:text-gray-100">{user.role}</span>
              </div>
            </div>
            <button
              className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
