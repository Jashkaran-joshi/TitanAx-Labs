import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars, BsServer } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import { IoCloseSharp, IoCopy, IoDownload } from "react-icons/io5";
import { ImNewTab } from "react-icons/im";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Editor from "@monaco-editor/react";
import { aiAPI } from "../services/api";

const Server = () => {
  const frameworkOptions = [
    { value: "node-express", label: "Node.js + Express" },
    { value: "django", label: "Python + Django" },
    { value: "flask", label: "Python + Flask" },
    { value: "spring-boot", label: "Java + Spring Boot" },
    { value: "fastapi", label: "Python + FastAPI" },
  ];

  const languageMap = {
    "Node.js + Express": "javascript",
    "Python + Django": "python",
    "Python + Flask": "python",
    "Python + FastAPI": "python",
    "Java + Spring Boot": "java",
  };

  const [outputScreen, setOutputScreen] = useState(false);
  const [frontendCode, setFrontendCode] = useState("");
  const [backendFiles, setBackendFiles] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState(frameworkOptions[0]);
  const [loading, setLoading] = useState(false);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);

  const isDark = document.documentElement.classList.contains("dark");

  async function getBackendCode() {
    if (!frontendCode.trim())
      return toast.error("Please paste your frontend code first");

    try {
      setLoading(true);
      const response = await aiAPI.generateBackend(frontendCode, selectedFramework.value);
      
      if (response.data.success && response.data.files) {
        if (response.data.files.length === 0) {
          toast.error("No backend files were returned.");
          return;
        }

        setBackendFiles(response.data.files);
        setActiveFileIndex(0);
        setOutputScreen(true);
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    if (!backendFiles.length) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(
        backendFiles.map((f) => `// ${f.filename}\n${f.content}`).join("\n\n")
      );
      toast.success("Backend code copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const downloadFile = () => {
    if (!backendFiles.length) return toast.error("No code to download");
    backendFiles.forEach((file) => {
      const blob = new Blob([file.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.filename;
      link.click();
      URL.revokeObjectURL(url);
    });
    toast.success("All backend files downloaded");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Backend Code Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Paste your frontend code and generate complete backend implementation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <BsServer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Backend Generator
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose framework and paste frontend code
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Framework Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose Backend Framework
                  </label>
                  <Select
                    options={frameworkOptions}
                    value={selectedFramework}
                    onChange={setSelectedFramework}
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
                    }}
                  />
                </div>

                {/* Frontend Code Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paste Frontend Code
                  </label>
                  <textarea
                    onChange={(e) => setFrontendCode(e.target.value)}
                    value={frontendCode}
                    className="w-full min-h-[300px] p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none scrollbar-thin font-mono text-sm"
                    placeholder="Paste your frontend code here (HTML, React, Vue, etc.)..."
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={getBackendCode}
                  disabled={loading}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:from-purple-700 hover:to-pink-700"
                  }`}
                >
                  {loading ? (
                    <>
                      <ClipLoader color="white" size={20} />
                      <span>Generating Backend...</span>
                    </>
                  ) : (
                    <>
                      <BsStars className="w-5 h-5" />
                      <span>Generate Backend</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Panel - Output */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              {!outputScreen ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                    <HiOutlineCode className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Generated Backend Code Will Appear Here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Paste your frontend code and click generate to see backend files
                  </p>
                </div>
              ) : (
                <>
                  {/* File Selector & Toolbar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <Select
                      options={backendFiles.map((file, index) => ({
                        value: index,
                        label: file.filename,
                      }))}
                      value={{
                        value: activeFileIndex,
                        label: backendFiles[activeFileIndex]?.filename,
                      }}
                      onChange={(selected) => setActiveFileIndex(selected.value)}
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: isDark ? "#1f2937" : "#ffffff",
                          borderColor: isDark ? "#374151" : "#d1d5db",
                          minWidth: "250px",
                          minHeight: "40px",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: isDark ? "#1f2937" : "#ffffff",
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
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }),
                      }}
                    />

                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyCode}
                        className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
                        title="Copy All Code"
                      >
                        <IoCopy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={downloadFile}
                        className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
                        title="Download All Files"
                      >
                        <IoDownload className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setIsNewTabOpen(true)}
                        className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105"
                        title="Open in New Tab"
                      >
                        <ImNewTab className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="flex-1 min-h-[500px]">
                    <Editor
                      value={backendFiles[activeFileIndex]?.content || ""}
                      height="100%"
                      language={languageMap[selectedFramework.label] || "text"}
                      theme={isDark ? "vs-dark" : "vs-light"}
                      options={{
                        readOnly: false,
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {isNewTabOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 dark:bg-black">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
            <p className="font-semibold text-white">Backend Code Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              <IoCloseSharp className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[calc(100vh-64px)] overflow-auto p-6">
            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
              {backendFiles
                .map((f) => `// ${f.filename}\n${f.content}`)
                .join("\n\n")}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default Server;
