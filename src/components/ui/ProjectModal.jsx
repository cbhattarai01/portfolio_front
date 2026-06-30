import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <div className="grid md:grid-cols-2">
            <div className="aspect-square md:aspect-auto bg-slate-100">
               <img
                 src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                 className="w-full h-full object-cover"
                 alt={project.title}
               />
            </div>


            <div className="p-10 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{project.tech_stack}</span>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">{project.title}</h3>
              </div>

              <div className="flex-1">
                <p className="text-slate-600 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="space-y-4">
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Key Features</h4>
                   <ul className="text-sm text-slate-600 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Dynamic content delivery via REST API
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Responsive and accessible UI components
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Performance optimized for quick loading
                      </li>
                   </ul>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-6 py-4 rounded-2xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    Live Demo
                  </a>
                )}
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-900 text-white font-bold text-center hover:bg-slate-800 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
