import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ finishLoading }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(finishLoading, 500); // Small delay after 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-50"
    >
      {/* Premium Background: Animated Mesh Blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-violet-400/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-cyan-300/15 rounded-full blur-[110px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Centerpiece: Logo/Name */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12"
        >
          {/* Subtle Glow behind logo */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150" />

          <div className="relative bg-white/40 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] shadow-2xl flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
              <span className="bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">Chetan.</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </h1>
          </div>
        </motion.div>

        {/* Loading Section */}
        <div className="w-48 space-y-4">
          <div className="h-1 w-full bg-slate-200/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-400"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center px-1"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Initializing</span>
            <span className="text-[10px] font-black text-blue-600 tabular-nums">{percent}%</span>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400"
      >
        Version 2.0 • 2026 Edition
      </motion.p>
    </motion.div>
  );
}
