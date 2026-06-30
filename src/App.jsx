import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import { PortfolioProvider } from "./context/PortfolioContext";
import SplashScreen from "./components/ui/SplashScreen";
import { AnimatePresence } from "framer-motion";

// Main Pages
import HomePage from "./pages/main/HomePage";
import AboutPage from "./pages/main/AboutPage";
import ResumePage from "./pages/main/ResumePage";
import WorksPage from "./pages/main/WorksPage";
import ContactPage from "./pages/main/ContactPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PortfolioProvider>
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <BrowserRouter>
          <Routes>
            {/* Public Multi-Page Routes */}
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
            <Route path="/resume" element={<MainLayout><ResumePage /></MainLayout>} />
            <Route path="/works" element={<MainLayout><WorksPage /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </PortfolioProvider>
  );
}

export default App;
