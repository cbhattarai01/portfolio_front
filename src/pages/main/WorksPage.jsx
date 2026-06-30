import SectionHeading from "../../components/ui/SectionHeading";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "../../components/ui/ProjectModal";

export default function WorksPage() {
  const { projects, skillGroups, isAdmin } = usePortfolioData();
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const skillLevelMap = {
    Beginner: 30,
    Intermediate: 60,
    Advanced: 85,
    Expert: 95,
  };

  const categories = useMemo(() => {
    return ["All", ...new Set(projects.map(p => p.tech_stack?.split(",")[0] || "Web"))];
  }, [projects]);

  const filteredProjects = projects.filter(project =>
    filter === "All" || project.tech_stack?.includes(filter)
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <SectionHeading
          label="Portfolio"
          title="My Creative Works"
        />

        {isAdmin && (
          <Link to="/admin?tab=project" className="mb-4 p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-blue-600 hover:text-blue-700 transition-all flex items-center gap-2 text-sm font-bold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            Edit Projects
          </Link>
        )}

        <div className="flex flex-wrap gap-4 pb-4">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`text-sm font-bold transition-colors ${
                 filter === cat ? "text-blue-600" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      <motion.div layout className="grid md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
            >
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
                 <img
                   src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                   alt={project.title}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
              </div>

              <div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.tech_stack}</span>
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 transition-colors">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Working Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full space-y-4 pt-10 border-t border-slate-100 dark:border-slate-800"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Working Skills</h3>
          </div>
          {isAdmin && (
            <Link to="/admin?tab=skill" className="p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-blue-600 hover:text-blue-700 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </Link>
          )}
        </div>

        <div className="md:columns-2 gap-x-12 text-left">
          {Object.entries(skillGroups).filter(([_, group]) => group.length > 0).map(([category, group]) => (
            <div key={category} className="break-inside-avoid mb-6 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{category}</h4>
              <div className="space-y-3">
                {group.map((skill) => {
                  const percent = skill.percentage || skillLevelMap[skill.level] || 50;
                  return (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{skill.name}</span>
                        <span className="text-slate-400 font-bold">{percent}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>



      </motion.div>
    </div>
  );
}

