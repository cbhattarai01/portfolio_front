import { motion } from "framer-motion";

export default function Sidebar({ profile }) {
  return (
    <div className="w-full lg:w-80 space-y-8">
      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-center border border-slate-100 dark:border-slate-800 shadow-sm lg:sticky lg:top-44">
        <div className="relative inline-block mb-6">
          <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl mx-auto">
            <img
              src={profile?.image_url || "https://ui-avatars.com/api/?name=" + (profile?.full_name || "CB")}
              alt={profile?.full_name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{profile?.full_name || "Chetan Bhattarai"}</h2>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 inline-block px-4 py-1.5 rounded-full mb-6">
          {profile?.title || "Full Stack Developer"}
        </p>

        <div className="flex justify-center gap-3">
          <a href="#" className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="#" className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>

        <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4">
           <div className="flex items-center gap-4 text-left border-b border-slate-200 dark:border-slate-700 pb-4">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-blue-600 shadow-sm">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                 <p className="text-sm font-bold text-slate-900 dark:text-white">{profile?.phone || "+977 98XXXXXXX"}</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-left border-b border-slate-200 dark:border-slate-700 pb-4">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-blue-600 shadow-sm">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="overflow-hidden">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                 <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{profile?.email || "example@mail.com"}</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-left">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-blue-600 shadow-sm">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                 <p className="text-sm font-bold text-slate-900 dark:text-white">{profile?.address || "Nepal"}</p>
              </div>
           </div>
        </div>

        <a
          href={profile?.resume_url || "#"}
          className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-transform active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Download CV
        </a>
      </div>
    </div>
  );
}
