import SectionHeading from "../../components/ui/SectionHeading";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function AboutPage() {
  const { profile, services, testimonials, isAdmin } = usePortfolioData();

  return (

    <div className="space-y-12 relative">
      {isAdmin && (
        <Link
          to="/admin?tab=profile"
          className="absolute top-0 right-0 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg text-blue-600 hover:scale-110 transition-all z-20"
          title="Edit About Info"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </Link>
      )}
      <SectionHeading
        label="About Me"
        title="Professional Background"
        description={profile?.long_description || "A versatile Computer Science Educator, Web & Software Developer, and IT Professional..."}
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">What I do!</h3>
            {isAdmin && (
              <Link to="/admin?tab=service" className="text-blue-600 hover:text-blue-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </Link>
            )}
          </div>
          <div className="grid gap-4">
             {services.map((service, index) => (
               <div key={service.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div className="flex gap-4">
                     <div className={index % 2 === 0 ? "text-blue-600" : "text-violet-600"}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon_svg || "M13 10V3L4 14h7v7l9-11h-7z"} />
                        </svg>
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{service.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{service.description}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>


        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Info</h3>
              {isAdmin && (
                <Link to="/admin?tab=profile" className="text-blue-600 hover:text-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </Link>
              )}
           </div>
           <div className="grid gap-4">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                 <span className="text-slate-400 text-sm font-semibold">Email</span>
                 <span className="text-slate-900 dark:text-white text-sm font-bold">{profile?.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                 <span className="text-slate-400 text-sm font-semibold">Phone</span>
                 <span className="text-slate-900 dark:text-white text-sm font-bold">{profile?.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                 <span className="text-slate-400 text-sm font-semibold">Location</span>
                 <span className="text-slate-900 dark:text-white text-sm font-bold">{profile?.address}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                 <span className="text-slate-400 text-sm font-semibold">Birthday</span>
                 <span className="text-slate-900 dark:text-white text-sm font-bold">{profile?.date_of_birth}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                 <span className="text-slate-400 text-sm font-semibold">Nationality</span>
                 <span className="text-slate-900 dark:text-white text-sm font-bold">{profile?.nationality}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                 <span className="text-slate-400 text-sm font-semibold">Availability</span>
                 <span className="text-green-500 text-sm font-bold">{profile?.availability || "Open for Freelance"}</span>
              </div>
           </div>
           {profile?.resume_url && (
             <div className="pt-4">
                <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Resume
                  </Button>
                </a>
             </div>
           )}
        </div>

      </div>

      {testimonials.length > 0 && (
        <div className="space-y-8 pt-12">
           <div className="flex items-center justify-center gap-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Testimonials</h3>
              {isAdmin && (
                <Link to="/admin?tab=testimonial" className="text-blue-600 hover:text-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </Link>
              )}
           </div>
           <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((item) => (
                <div key={item.id} className="p-8 bg-white dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                   <p className="text-slate-600 dark:text-slate-400 italic mb-6">"{item.message}"</p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100">
                         <img src={item.image_url || `https://ui-avatars.com/api/?name=${item.name}`} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.role}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}

