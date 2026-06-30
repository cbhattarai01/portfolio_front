import { usePortfolioData } from "../../hooks/usePortfolioData";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
};

export default function HomePage() {
  const { profile, experience, projects, skills, stats, isAdmin } = usePortfolioData();

  const getStatIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'years experience':
      case 'years of impact':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'companies':
      case 'clients supported':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
          </svg>
        );
      case 'projects':
      case 'projects delivered':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'tech stack':
      case 'success rate':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  const getStatColor = (index) => {
    const colors = [
      "text-blue-600 bg-blue-100/50 dark:bg-blue-900/30",
      "text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/30",
      "text-violet-600 bg-violet-100/50 dark:bg-violet-900/30",
      "text-amber-600 bg-amber-100/50 dark:bg-amber-900/30",
    ];
    return colors[index % colors.length];
  };

  const calculateExperienceYears = () => {
    if (!experience || experience.length === 0) return 0;
    let earliestDate = new Date();
    experience.forEach(exp => {
      const startPart = exp.duration.split('-')[0].trim();
      const yearMatch = startPart.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        const monthIndex = monthNames.findIndex(m => startPart.toLowerCase().includes(m));
        const date = new Date(year, monthIndex !== -1 ? monthIndex : 0, 1);
        if (date < earliestDate) earliestDate = date;
      }
    });
    return Math.max(0, Math.floor((new Date() - earliestDate) / (1000 * 60 * 60 * 24 * 365.25)));
  };

  const displayStats = stats.length > 0 ? stats : [
    { label: "Years Experience", value: calculateExperienceYears() || 8, suffix: "+" },
    { label: "Companies", value: new Set(experience?.map(exp => exp.company.toLowerCase().trim())).size || 0 },
    { label: "Projects", value: projects?.length || 0, suffix: "+" },
    { label: "Tech Stack", value: skills?.length || 0 },
  ];

  return (
    <div className="space-y-16 py-4 relative">
      {isAdmin && (
        <Link
          to="/admin?tab=profile"
          className="absolute top-0 right-0 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg text-blue-600 hover:scale-110 transition-all z-50"
          title="Edit Profile"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </Link>
      )}

      {/* Main Hero Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 p-8 md:p-12 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3rem] border border-white/40 dark:border-slate-700/40 shadow-2xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for new projects
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none"
              >
                {profile?.full_name?.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                  {profile?.full_name?.split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-300"
              >
                {profile?.title}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl text-justify"
            >
              {profile?.short_description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <Link to="/works">
              <Button className="px-10 py-5 text-lg rounded-[2rem] shadow-xl shadow-blue-500/20">
                Explore Works
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" className="px-10 py-5 text-lg rounded-[2rem]">
                Get in touch
              </Button>
            </Link>
            {profile?.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="px-10 py-5 text-lg rounded-[2rem] flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </Button>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Profile Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 aspect-square lg:aspect-auto h-full min-h-[400px] rounded-[3rem] overflow-hidden border-4 border-white/40 dark:border-slate-700/40 shadow-2xl group relative"
        >
          <img
            src={profile?.image_url || "https://ui-avatars.com/api/?name=" + (profile?.full_name || "CB")}
            alt={profile?.full_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 items-center">
             <div className="flex gap-4 justify-center flex-wrap">
                {profile?.linkedin && (
                  <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                )}
                {profile?.github_url && (
                  <a href={profile.github_url.startsWith('http') ? profile.github_url : `https://${profile.github_url}`} target="_blank" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                )}
                {profile?.facebook && (
                  <a href={profile.facebook.startsWith('http') ? profile.facebook : `https://${profile.facebook}`} target="_blank" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                )}
                {profile?.freelance_url && (
                  <a href={profile.freelance_url.startsWith('http') ? profile.freelance_url : `https://${profile.freelance_url}`} target="_blank" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </a>
                )}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section - 2026 Style Animated Counters */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {displayStats.map((stat, index) => (
          <div
            key={stat.label}
            className="p-8 bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-[2.5rem] border border-white/20 dark:border-slate-700/20 shadow-xl group hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-2xl ${getStatColor(index)}`}>
                  {getStatIcon(stat.label)}
               </div>
            </div>
            <p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
              <AnimatedNumber value={stat.value} suffix={stat.suffix || ""} />
            </p>
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Experience Timeline Mini-Cards */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Experience Journey</h3>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experience.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={item.id}
              className="p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all group"
            >
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.duration}</span>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

