import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSun, HiMoon, HiMenu, HiX } from "react-icons/hi";
import { AiOutlineCode } from "react-icons/ai";
import { BiServer } from "react-icons/bi";
import { MdStorage } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Profile from "./Profile";
import Logo from "./logo";

const Navbar = ({ minimal = false }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [mode, setMode] = useState(localStorage.getItem("projectMode") || "frontend");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ name: "", email: "", role: "" });
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Logo darkMode={theme === "dark"} />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              TitanAx Labs
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>

            {!minimal && (
              <>
                <button
                  onClick={() => {
                    const newMode = mode === "frontend" ? "backend" : "frontend";
                    setMode(newMode);
                    localStorage.setItem("projectMode", newMode);
                    navigate(`/${newMode}`);
                  }}
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                  title={mode === "frontend" ? "Switch to Backend Mode" : "Switch to Frontend Mode"}
                >
                  {mode === "frontend" ? <BiServer size={20} /> : <AiOutlineCode size={20} />}
                </button>

                <button
                  onClick={() => navigate("/database")}
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                  title="Switch to Database Generator"
                >
                  <MdStorage size={20} />
                </button>
              </>
            )}

            {/* Profile */}
            {user.name ? (
              <Profile />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                title="Profile"
              >
                <FaUser size={20} />
              </button>
            )}

            {/* Contact */}
            <button
              onClick={() => navigate("/contactus")}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              title="Contact Us"
            >
              <RiContactsBookLine size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
              <span>Toggle Theme</span>
            </button>

            {!minimal && (
              <>
                <button
                  onClick={() => {
                    const newMode = mode === "frontend" ? "backend" : "frontend";
                    setMode(newMode);
                    localStorage.setItem("projectMode", newMode);
                    navigate(`/${newMode}`);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {mode === "frontend" ? <BiServer size={20} /> : <AiOutlineCode size={20} />}
                  <span>Switch Mode</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/database");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <MdStorage size={20} />
                  <span>Database</span>
                </button>
              </>
            )}

            {user.name ? (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setShowMobileProfile(!showMobileProfile)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaUser size={20} />
                  <span>Profile</span>
                </button>
                {showMobileProfile && (
                  <div className="mt-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Name:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="text-gray-900 dark:text-gray-100 truncate ml-2">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Role:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user.role}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FaUser size={20} />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => {
                navigate("/contactus");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <RiContactsBookLine size={20} />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
