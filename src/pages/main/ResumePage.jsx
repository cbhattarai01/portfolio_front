import SectionHeading from "../../components/ui/SectionHeading";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function ResumePage() {
  const { profile, experience, educations, languages, trainings, references, skillGroups, isAdmin } = usePortfolioData();




  const skillLevelMap = {
    Beginner: 30,
    Intermediate: 60,
    Advanced: 85,
    Expert: 95,
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <SectionHeading
          label="Resume"
          title="Education & Experience"
        />
        {profile?.resume_url && (
          <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF Resume
            </Button>
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h3>
            </div>
            {isAdmin && (
              <Link to="/admin?tab=education" className="p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-green-600 hover:text-green-700 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </Link>
            )}
          </div>

          <div className="space-y-6 border-l-2 border-slate-100 dark:border-slate-800 ml-5 pl-8">
            {educations.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-green-600 border-4 border-white dark:border-slate-900 shadow-sm" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.year}</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{item.degree}</h4>
                <p className="text-sm text-green-600 font-semibold mb-3">{item.institution} ({item.level})</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify">{item.details}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-8">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2 2v11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h3>
            </div>
            {isAdmin && (
              <Link to="/admin?tab=experience" className="p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-blue-600 hover:text-blue-700 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </Link>
            )}
          </div>

          <div className="space-y-6 border-l-2 border-slate-100 dark:border-slate-800 ml-5 pl-8">
            {experience.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.duration}</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{item.title}</h4>
                <p className="text-sm text-blue-600 font-semibold mb-3">{item.company}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify">{item.description}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="space-y-12">
           {trainings.length > 0 && (
             <div className="pt-0 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Trainings</h3>
                  </div>
                  {isAdmin && (
                    <Link to="/admin?tab=training" className="p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-amber-600 hover:text-amber-700 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </Link>
                  )}
                </div>

                <div className="space-y-4">
                   {trainings.map(training => (
                     <div key={training.id} className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-slate-900 dark:text-white">{training.title}</h4>
                        <p className="text-sm text-amber-600 font-semibold">{training.institute}</p>
                        <p className="text-xs text-slate-400 mt-1">{training.duration} • {training.location}</p>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {languages.length > 0 && (
             <div className="pt-12 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-1.383 4.512-4.874 8.328-8.751 10" /></svg>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Languages</h3>
                  </div>
                  {isAdmin && (
                    <Link to="/admin?tab=language" className="p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-rose-600 hover:text-rose-700 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {languages.map(lang => (
                     <div key={lang.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                        <h4 className="font-bold text-slate-900 dark:text-white">{lang.name}</h4>
                        <div className="flex justify-center gap-1 mt-2">
                           {[...Array(5)].map((_, i) => (
                             <div key={i} className={`w-2 h-2 rounded-full ${i < parseInt(lang.speaking) ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {references.length > 0 && (
             <div className="pt-12 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">References</h3>
                  </div>
                  {isAdmin && (
                    <Link to="/admin?tab=reference" className="p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-indigo-600 hover:text-indigo-700 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </Link>
                  )}
                </div>
                <div className="grid gap-6">
                   {references.map(ref => (
                     <div key={ref.id} className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                           {ref.person_image_url && (
                             <img src={ref.person_image_url} alt={ref.name} className="w-12 h-12 rounded-full object-cover" />
                           )}
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">{ref.name}</h4>
                              <p className="text-sm text-indigo-600 font-semibold">{ref.title} @ {ref.organization}</p>
                              <p className="text-xs text-slate-400 mt-1">{ref.phone} • {ref.location}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>


      </div>
    </div>
  );
}
