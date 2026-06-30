import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePortfolioData } from "../../hooks/usePortfolioData";

export default function Header({ profileName }) {
  const { isAdmin } = usePortfolioData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Resume", path: "/resume" },
    { label: "Works", path: "/works" },
    { label: "Contact", path: "/contact" },
    ...(isAdmin ? [{ label: "Admin", path: "/admin" }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center glass-container rounded-[2rem] p-4 lg:px-8 lg:py-4">
            <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter shrink-0">
              {profileName.split(' ')[0]}<span className="text-blue-600">.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        location.pathname === item.path
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-all border border-white/40 dark:border-slate-700/40 shadow-sm"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.05 7.05l.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                )}
              </button>

              <Link
                to="/contact"
                className="hidden sm:flex items-center justify-center h-12 px-6 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-transform active:scale-95"
              >
                Hire Me
              </Link>
            </div>
         </div>
      </div>
    </header>
  );
}
