import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";

// Lazy load components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Client = lazy(() => import("./pages/Client"));
const Server = lazy(() => import("./pages/Server"));
const Database = lazy(() => import("./pages/Database"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NoPage = lazy(() => import("./pages/NoPage"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <ClipLoader color="#6366f1" size={50} />
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Generator Routes */}
            <Route
              path="/frontend"
              element={
                
                  <Client />
                
              }
            />

            <Route
              path="/backend"
              element={
                
                  <Server />
                
              }
            />

            <Route
              path="/database"
              element={
                
                  <Database />
                
              }
            />

            {/* Contact Us */}
            <Route path="/contactus" element={<ContactUs />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
