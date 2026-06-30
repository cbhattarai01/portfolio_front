import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

export default function Login() {
  const { setIsAdmin } = usePortfolio();
  const [email, setEmail] = useState("");
  // ... rest of the state ...
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 5;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.login(email, password);
      setIsAdmin(true);
      navigate("/admin", { replace: true });
    } catch (err) {
      const message = err.message === "Too Many Requests" ? "Too many login attempts. Please wait a few minutes and try again." : err.message;
      setError(message);
      setAttempts((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Sign in to manage your portfolio</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || attempts >= maxAttempts}
              className="w-full py-4 text-base"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              {attempts > 0 && (
                <p className="text-xs text-red-400">
                  Attempts: {attempts} / {maxAttempts}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            ← Back to website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
