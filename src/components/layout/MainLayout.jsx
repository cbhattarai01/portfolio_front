import { usePortfolioData } from "../../hooks/usePortfolioData";
import Header from "./Header";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

export default function MainLayout({ children }) {
  const { profile, loading, isAdmin } = usePortfolioData();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh-light dark:bg-mesh transition-colors selection:bg-blue-100 selection:text-blue-600 pb-24 lg:pb-12">
      <Header profileName={profile?.full_name || "Portfolio"} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-44">
        <main className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="glass-container rounded-[3rem] p-8 lg:p-12 min-h-[600px] w-full relative overflow-hidden"
            >
              {/* Decorative glows inside the glass panel */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 lg:mt-12">
            <Footer profileName={profile?.full_name} />
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 lg:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-100 dark:border-slate-800 p-2 shadow-2xl z-50">
        <ul className="flex justify-between items-center px-2">
           {[
             { label: "Home", path: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2" },
             { label: "About", path: "/about", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0" },
             { label: "Resume", path: "/resume", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5" },
             { label: "Works", path: "/works", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6" },
             { label: "Contact", path: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8" },
             ...(isAdmin ? [{ label: "Admin", path: "/admin", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }] : [])
           ].map((item) => (
             <li key={item.path} className="flex-1">
               <Link to={item.path} className={`flex flex-col items-center gap-1 py-2 rounded-2xl text-[10px] font-black transition-colors ${
                 location.pathname === item.path ? "text-blue-600" : "text-slate-400"
               }`}>
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                 {item.label}
               </Link>
             </li>
           ))}
        </ul>
      </nav>
    </div>
  );
}
