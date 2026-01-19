import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars, BsCodeSquare } from "react-icons/bs";
import { HiOutlineCode, HiOutlineEye } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy, IoDownload } from "react-icons/io5";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { aiAPI } from "../services/api";

const Client = () => {
  const options = [
    {
      value: "html-css",
      label: "HTML + CSS (basic styling)",
      canPreview: true,
    },
    {
      value: "html-tailwind",
      label: "HTML + Tailwind (utility CSS)",
      canPreview: true,
    },
    {
      value: "html-bootstrap",
      label: "HTML + Bootstrap (responsive design)",
      canPreview: true,
    },
    {
      value: "html-css-js",
      label: "HTML + CSS + JS (interactive)",
      canPreview: true,
    },
    {
      value: "html-tailwind-bootstrap",
      label: "HTML + Tailwind + Bootstrap (combined styling)",
      canPreview: true,
    },
    { value: "react", label: "React (UI library)", canPreview: false },
    {
      value: "angular",
      label: "Angular (frontend framework)",
      canPreview: false,
    },
    { value: "vue", label: "Vue (progressive framework)", canPreview: false },
    { value: "svelte", label: "Svelte (reactive apps)", canPreview: false },
    { value: "nextjs", label: "Next.js (SSR React)", canPreview: false },
    { value: "nuxtjs", label: "Nuxt.js (SSR Vue)", canPreview: false },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  async function getResponse() {
    if (!prompt.trim())
      return toast.error("Please describe your component first");
    try {
      setLoading(true);
      const response = await aiAPI.generateFrontend(prompt, frameWork.value);
      
      if (response.data.success && response.data.code) {
        setCode(response.data.code);
        setOutputScreen(true);
        if (!frameWork.canPreview) setTab(1);
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const downloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");
    const extension =
      frameWork.value.includes("react") || frameWork.value === "svelte"
        ? "js"
        : "html";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `GenUI-Code.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  const isDark = document.documentElement.classList.contains("dark");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Frontend Code Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Describe your UI component and let AI generate clean, responsive code
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <BsCodeSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Component Generator
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose framework and describe your component
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Framework Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose Framework
                  </label>
                  <Select
                    options={options}
                    value={frameWork}
                    onChange={setFrameWork}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        borderColor: state.isFocused
                          ? "#6366f1"
                          : isDark ? "#374151" : "#d1d5db",
                        boxShadow: state.isFocused
                          ? "0 0 0 3px rgba(99, 102, 241, 0.1)"
                          : "none",
                        "&:hover": {
                          borderColor: "#6366f1",
                        },
                        minHeight: "48px",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
                        borderRadius: "0.75rem",
                        zIndex: 50,
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#6366f1"
                          : state.isFocused
                          ? isDark ? "#374151" : "#f3f4f6"
                          : "transparent",
                        color: state.isSelected
                          ? "#ffffff"
                          : isDark ? "#e5e7eb" : "#111827",
                        cursor: "pointer",
                        padding: "12px 16px",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }),
                      input: (base) => ({
                        ...base,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }),
                    }}
                  />
                </div>

                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Describe Your Component
                  </label>
                  <textarea
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    className="w-full min-h-[200px] p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none scrollbar-thin"
                    placeholder="E.g., Create a responsive navigation bar with logo, menu items, and a mobile hamburger menu..."
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={getResponse}
                  disabled={loading}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-cyan-700"
                  }`}
                >
                  {loading ? (
                    <>
                      <ClipLoader color="white" size={20} />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <BsStars className="w-5 h-5" />
                      <span>Generate Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Panel - Output */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              {!outputScreen ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <HiOutlineCode className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Generated Code Will Appear Here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Describe your component and click generate to see the magic happen
                  </p>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <button
                      onClick={() => setTab(1)}
                      className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                        tab === 1
                          ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-gray-800"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <BsCodeSquare className="w-4 h-4" />
                        Code
                      </div>
                    </button>
                    <button
                      onClick={() => setTab(2)}
                      disabled={!frameWork.canPreview}
                      className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                        tab === 2
                          ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-gray-800"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      } ${
                        !frameWork.canPreview ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <HiOutlineEye className="w-4 h-4" />
                        Preview
                      </div>
                    </button>
                  </div>

                  {/* Toolbar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {frameWork.label}
                    </p>
                    <div className="flex items-center gap-2">
                      {tab === 1 ? (
                        <>
                          <button
                            onClick={copyCode}
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
                            title="Copy Code"
                          >
                            <IoCopy className="w-5 h-5" />
                          </button>
                          <button
                            onClick={downloadFile}
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
                            title="Download Code"
                          >
                            <IoDownload className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsNewTabOpen(true)}
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
                            title="Open in New Tab"
                          >
                            <ImNewTab className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setRefreshKey((prev) => prev + 1)}
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
                            title="Refresh Preview"
                          >
                            <FiRefreshCcw className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Editor / Preview */}
                  <div className="flex-1 min-h-[500px]">
                    {tab === 1 || !frameWork.canPreview ? (
                      <Editor
                        value={code}
                        height="100%"
                        language={
                          frameWork.value.includes("react") ? "javascript" : "html"
                        }
                        theme={isDark ? "vs-dark" : "vs-light"}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          wordWrap: "on",
                        }}
                      />
                    ) : (
                      <iframe
                        key={refreshKey}
                        srcDoc={code}
                        className="w-full h-full bg-white"
                        title="Preview"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {isNewTabOpen && frameWork.canPreview && (
        <div className="fixed inset-0 z-50 bg-gray-900 dark:bg-black">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
            <p className="font-semibold text-white">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              <IoCloseSharp className="w-5 h-5" />
            </button>
          </div>
          <iframe
            srcDoc={code}
            className="w-full h-[calc(100vh-64px)] bg-white"
            title="Fullscreen Preview"
          />
        </div>
      )}
    </>
  );
};

export default Client;
