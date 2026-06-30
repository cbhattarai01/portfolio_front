import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

const emptyExperience = { title: "", company: "", duration: "", description: "", organization_logo_url: "" };
const emptySkill = { category: "", name: "", level: "", percentage: "", logo_url: "" };
const emptyProject = { title: "", description: "", tech_stack: "", github_link: "", live_link: "", image: "", screenshots: "", video_url: "" };
const emptyTestimonial = { name: "", role: "", message: "", image_url: "" };
const emptyService = { title: "", description: "", icon_svg: "" };
const emptyEducation = { level: "", degree: "", institution: "", board: "", location: "", result: "", year: "", details: "", institute_logo_url: "" };
const emptyTraining = { title: "", institute: "", location: "", duration: "", details: "", institute_logo_url: "" };
const emptyLanguage = { name: "", reading: "", speaking: "", writing: "", listening: "", logo_url: "" };
const emptyReference = { name: "", title: "", organization: "", phone: "", location: "", person_image_url: "" };
const emptyStat = { label: "", value: "", suffix: "", description: "" };

const Input = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none text-slate-900"
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <textarea
      {...props}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none text-slate-900 resize-none"
    />
  </div>
);

const FileUpload = ({ label, value, onUpload, setStatusMessage, accept = "image/*" }) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { url } = await api.uploadFile(file);
      onUpload(url);
      setStatusMessage("File uploaded successfully");
    } catch (error) {
      setStatusMessage("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label
          htmlFor={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-50 transition-all flex items-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {value ? "Change File" : "Choose File"}
            </>
          )}
        </label>
        {value && !uploading && (
          <span className="text-xs text-green-600 font-medium truncate max-w-[150px]">
            Uploaded!
          </span>
        )}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const { setIsAdmin } = usePortfolio();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [educations, setEducations] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [references, setReferences] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState([]);

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
  const [statusMessage, setStatusMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    title: "",
    address: "",
    phone: "",
    email: "",
    alternate_email: "",
    linkedin: "",
    facebook: "",
    github_url: "",
    freelance_url: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    religion: "",
    nationality: "",
    availability: "",
    short_description: "",
    long_description: "",
    resume_url: "",
    image_url: ""
  });

  const [newExperience, setNewExperience] = useState(emptyExperience);
  const [newSkill, setNewSkill] = useState(emptySkill);
  const [newProject, setNewProject] = useState(emptyProject);
  const [newTestimonial, setNewTestimonial] = useState(emptyTestimonial);
  const [newService, setNewService] = useState(emptyService);
  const [newEducation, setNewEducation] = useState(emptyEducation);
  const [newTraining, setNewTraining] = useState(emptyTraining);
  const [newLanguage, setNewLanguage] = useState(emptyLanguage);
  const [newReference, setNewReference] = useState(emptyReference);
  const [newStat, setNewStat] = useState(emptyStat);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    cancelEdit();
  }, [activeTab]);

  const loadData = async () => {
    try {
      const [
        profileData, experienceData, skillData, projectData, servicesData,
        testimonialsData, educationData, trainingData, languageData,
        referenceData, messagesData, statsData
      ] = await Promise.all([
        api.getProfile(),
        api.getExperience(),
        api.getSkills(),
        api.getProjects(),
        api.getServices(),
        api.getTestimonials(),
        api.getEducation(),
        api.getTrainings(),
        api.getLanguages(),
        api.getReferences(),
        api.getMessages(),
        api.getStats(),
      ]);

      setProfile(profileData || null);
      setExperience(experienceData || []);
      setSkills(skillData || []);
      setProjects(projectData || []);
      setServices(servicesData || []);
      setTestimonials(testimonialsData || []);
      setEducations(educationData || []);
      setTrainings(trainingData || []);
      setLanguages(languageData || []);
      setReferences(referenceData || []);
      setMessages(messagesData || []);
      setStats(statsData || []);

      if (profileData) {
        setProfileForm({
          full_name: profileData.full_name || "",
          title: profileData.title || "",
          address: profileData.address || "",
          phone: profileData.phone || "",
          email: profileData.email || "",
          alternate_email: profileData.alternate_email || "",
          linkedin: profileData.linkedin || "",
          facebook: profileData.facebook || "",
          github_url: profileData.github_url || "",
          freelance_url: profileData.freelance_url || "",
          date_of_birth: profileData.date_of_birth || "",
          gender: profileData.gender || "",
          marital_status: profileData.marital_status || "",
          religion: profileData.religion || "",
          nationality: profileData.nationality || "",
          availability: profileData.availability || "",
          short_description: profileData.short_description || "",
          long_description: profileData.long_description || "",
          resume_url: profileData.resume_url || "",
          image_url: profileData.image_url || ""
        });
      }
    } catch (error) {
      setStatusMessage(`Error loading data: ${error.message}`);
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAdmin(false);
    navigate("/");
  };

  const handleEdit = (type, item) => {
    setEditingId(item.id);
    switch (type) {
      case "experience": setNewExperience(item); break;
      case "skill": setNewSkill(item); break;
      case "project": setNewProject(item); break;
      case "testimonial": setNewTestimonial(item); break;
      case "service": setNewService(item); break;
      case "education": setNewEducation(item); break;
      case "training": setNewTraining(item); break;
      case "language": setNewLanguage(item); break;
      case "reference": setNewReference(item); break;
      case "stat": setNewStat(item); break;
      default: break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewExperience(emptyExperience);
    setNewSkill(emptySkill);
    setNewProject(emptyProject);
    setNewTestimonial(emptyTestimonial);
    setNewService(emptyService);
    setNewEducation(emptyEducation);
    setNewTraining(emptyTraining);
    setNewLanguage(emptyLanguage);
    setNewReference(emptyReference);
    setNewStat(emptyStat);
  };

  const saveProfile = async () => {
    try {
      await api.saveProfile(profileForm);
      setStatusMessage("Profile updated successfully!");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const handleSaveItem = async (type) => {
    try {
      let item;
      if (editingId) {
        switch (type) {
          case "experience":
            item = await api.updateExperience(editingId, newExperience);
            setExperience(experience.map(i => i.id === editingId ? item : i));
            setNewExperience(emptyExperience);
            break;
          case "skill":
            item = await api.updateSkill(editingId, newSkill);
            setSkills(skills.map(i => i.id === editingId ? item : i));
            setNewSkill(emptySkill);
            break;
          case "project":
            item = await api.updateProject(editingId, newProject);
            setProjects(projects.map(i => i.id === editingId ? item : i));
            setNewProject(emptyProject);
            break;
          case "testimonial":
            item = await api.updateTestimonial(editingId, newTestimonial);
            setTestimonials(testimonials.map(i => i.id === editingId ? item : i));
            setNewTestimonial(emptyTestimonial);
            break;
          case "service":
            item = await api.updateService(editingId, newService);
            setServices(services.map(i => i.id === editingId ? item : i));
            setNewService(emptyService);
            break;
          case "education":
            item = await api.updateEducation(editingId, newEducation);
            setEducations(educations.map(i => i.id === editingId ? item : i));
            setNewEducation(emptyEducation);
            break;
          case "training":
            item = await api.updateTraining(editingId, newTraining);
            setTrainings(trainings.map(i => i.id === editingId ? item : i));
            setNewTraining(emptyTraining);
            break;
          case "language":
            item = await api.updateLanguage(editingId, newLanguage);
            setLanguages(languages.map(i => i.id === editingId ? item : i));
            setNewLanguage(emptyLanguage);
            break;
          case "reference":
            item = await api.updateReference(editingId, newReference);
            setReferences(references.map(i => i.id === editingId ? item : i));
            setNewReference(emptyReference);
            break;
          case "stat":
            item = await api.updateStat(editingId, newStat);
            setStats(stats.map(i => i.id === editingId ? item : i));
            setNewStat(emptyStat);
            break;
          default:
            break;
        }
        setEditingId(null);
        setStatusMessage("Item updated successfully!");
      } else {
        switch (type) {
          case "experience":
            item = await api.addExperience(newExperience);
            setExperience([...experience, item]);
            setNewExperience(emptyExperience);
            break;
          case "skill":
            item = await api.addSkill(newSkill);
            setSkills([...skills, item]);
            setNewSkill(emptySkill);
            break;
          case "project":
            item = await api.addProject(newProject);
            setProjects([...projects, item]);
            setNewProject(emptyProject);
            break;
          case "testimonial":
            item = await api.addTestimonial(newTestimonial);
            setTestimonials([...testimonials, item]);
            setNewTestimonial(emptyTestimonial);
            break;
          case "service":
            item = await api.addService(newService);
            setServices([...services, item]);
            setNewService(emptyService);
            break;
          case "education":
            item = await api.addEducation(newEducation);
            setEducations([...educations, item]);
            setNewEducation(emptyEducation);
            break;
          case "training":
            item = await api.addTraining(newTraining);
            setTrainings([...trainings, item]);
            setNewTraining(emptyTraining);
            break;
          case "language":
            item = await api.addLanguage(newLanguage);
            setLanguages([...languages, item]);
            setNewLanguage(emptyLanguage);
            break;
          case "reference":
            item = await api.addReference(newReference);
            setReferences([...references, item]);
            setNewReference(emptyReference);
            break;
          case "stat":
            item = await api.addStat(newStat);
            setStats([...stats, item]);
            setNewStat(emptyStat);
            break;
          default:
            break;
        }
        setStatusMessage("Item added successfully!");
      }
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      switch (type) {
        case "experience":
          await api.deleteExperience(id);
          setExperience(experience.filter((item) => item.id !== id));
          break;
        case "skill":
          await api.deleteSkill(id);
          setSkills(skills.filter((item) => item.id !== id));
          break;
        case "project":
          await api.deleteProject(id);
          setProjects(projects.filter((item) => item.id !== id));
          break;
        case "testimonial":
          await api.deleteTestimonial(id);
          setTestimonials(testimonials.filter((item) => item.id !== id));
          break;
        case "service":
          await api.deleteService(id);
          setServices(services.filter((item) => item.id !== id));
          break;
        case "education":
          await api.deleteEducation(id);
          setEducations(educations.filter((item) => item.id !== id));
          break;
        case "training":
          await api.deleteTraining(id);
          setTrainings(trainings.filter((item) => item.id !== id));
          break;
        case "language":
          await api.deleteLanguage(id);
          setLanguages(languages.filter((item) => item.id !== id));
          break;
        case "reference":
          await api.deleteReference(id);
          setReferences(references.filter((item) => item.id !== id));
          break;
        case "stat":
          await api.deleteStat(id);
          setStats(stats.filter((item) => item.id !== id));
          break;
        case "message":
          await api.deleteMessage(id);
          setMessages(messages.filter((item) => item.id !== id));
          break;
        default:
          break;
      }
      setStatusMessage("Item deleted.");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: "education", label: "Education", icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
    { id: "experience", label: "Experience", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "skill", label: "Skills", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { id: "project", label: "Projects", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { id: "service", label: "What I do", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "training", label: "Trainings", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { id: "language", label: "Languages", icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-1.383 4.512-4.874 8.328-8.751 10" },
    { id: "reference", label: "References", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { id: "stat", label: "Stats", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" },
    { id: "testimonial", label: "Testimonials", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
    { id: "message", label: "Messages", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Console</h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Portfolio Manager</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-12 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 hover:text-blue-600 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 capitalize">{activeTab} Management</h2>
                <p className="text-slate-500 mt-1">Update your {activeTab} information in real-time.</p>
              </div>
            </div>
            <div className="flex gap-3">
               <a href="/" target="_blank" className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                 View Site
               </a>
               {activeTab === "profile" && (
                 <Button onClick={saveProfile}>Save Changes</Button>
               )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {statusMessage && (
                <div className="mb-8 p-4 rounded-2xl bg-green-50 text-green-600 text-sm font-semibold border border-green-100 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  {statusMessage}
                </div>
              )}

              {activeTab === "profile" && (
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="grid md:grid-cols-2 gap-8">
                    <Input label="Full Name" value={profileForm.full_name} onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})} />
                    <Input label="Professional Title" value={profileForm.title} onChange={(e) => setProfileForm({...profileForm, title: e.target.value})} />
                    <Input label="Email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} />
                    <Input label="Alternate Email" value={profileForm.alternate_email} onChange={(e) => setProfileForm({...profileForm, alternate_email: e.target.value})} />
                    <Input label="Phone" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} />
                    <Input label="Address" value={profileForm.address} onChange={(e) => setProfileForm({...profileForm, address: e.target.value})} />
                    <Input label="LinkedIn" value={profileForm.linkedin} onChange={(e) => setProfileForm({...profileForm, linkedin: e.target.value})} />
                    <Input label="Facebook" value={profileForm.facebook} onChange={(e) => setProfileForm({...profileForm, facebook: e.target.value})} />
                    <Input label="GitHub URL" value={profileForm.github_url} onChange={(e) => setProfileForm({...profileForm, github_url: e.target.value})} />
                    <Input label="Freelance URL" value={profileForm.freelance_url} onChange={(e) => setProfileForm({...profileForm, freelance_url: e.target.value})} />
                    <Input label="Date of Birth" value={profileForm.date_of_birth} onChange={(e) => setProfileForm({...profileForm, date_of_birth: e.target.value})} />
                    <Input label="Gender" value={profileForm.gender} onChange={(e) => setProfileForm({...profileForm, gender: e.target.value})} />
                    <Input label="Marital Status" value={profileForm.marital_status} onChange={(e) => setProfileForm({...profileForm, marital_status: e.target.value})} />
                    <Input label="Religion" value={profileForm.religion} onChange={(e) => setProfileForm({...profileForm, religion: e.target.value})} />
                    <Input label="Nationality" value={profileForm.nationality} onChange={(e) => setProfileForm({...profileForm, nationality: e.target.value})} />
                    <Input label="Availability" value={profileForm.availability} onChange={(e) => setProfileForm({...profileForm, availability: e.target.value})} />
                    <FileUpload label="Resume URL (PDF)" value={profileForm.resume_url} accept=".pdf" setStatusMessage={setStatusMessage} onUpload={(url) => setProfileForm({...profileForm, resume_url: url})} />
                    <FileUpload label="Profile Image URL" value={profileForm.image_url} setStatusMessage={setStatusMessage} onUpload={(url) => setProfileForm({...profileForm, image_url: url})} />
                    <div className="md:col-span-2">
                       <TextArea label="Short Introduction (Home Page)" rows="3" value={profileForm.short_description} onChange={(e) => setProfileForm({...profileForm, short_description: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                       <TextArea label="Full Background (About Page)" rows="6" value={profileForm.long_description} onChange={(e) => setProfileForm({...profileForm, long_description: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add Education</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Level" value={newEducation.level} onChange={(e) => setNewEducation({...newEducation, level: e.target.value})} />
                      <Input label="Degree" value={newEducation.degree} onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})} />
                      <Input label="Institution" value={newEducation.institution} onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})} />
                      <Input label="Board" value={newEducation.board} onChange={(e) => setNewEducation({...newEducation, board: e.target.value})} />
                      <Input label="Location" value={newEducation.location} onChange={(e) => setNewEducation({...newEducation, location: e.target.value})} />
                      <Input label="Result" value={newEducation.result} onChange={(e) => setNewEducation({...newEducation, result: e.target.value})} />
                      <Input label="Year" value={newEducation.year} onChange={(e) => setNewEducation({...newEducation, year: e.target.value})} />
                      <FileUpload label="Logo URL" value={newEducation.institute_logo_url} setStatusMessage={setStatusMessage} onUpload={(url) => setNewEducation({...newEducation, institute_logo_url: url})} />
                      <div className="md:col-span-2">
                        <TextArea label="Details" rows="4" value={newEducation.details} onChange={(e) => setNewEducation({...newEducation, details: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("education")}>{editingId ? "Update" : "Add"} Education</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {educations.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{item.degree}</h4>
                          <p className="text-blue-600 font-semibold text-sm mb-2">{item.institution} • {item.year}</p>
                          <p className="text-slate-600 text-sm">{item.level} - {item.result}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("education", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("education", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add New Experience</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Title" value={newExperience.title} onChange={(e) => setNewExperience({...newExperience, title: e.target.value})} />
                      <Input label="Company" value={newExperience.company} onChange={(e) => setNewExperience({...newExperience, company: e.target.value})} />
                      <Input label="Duration" value={newExperience.duration} onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})} />
                      <FileUpload label="Org Logo" value={newExperience.organization_logo_url} setStatusMessage={setStatusMessage} onUpload={(url) => setNewExperience({...newExperience, organization_logo_url: url})} />
                      <div className="md:col-span-2">
                        <TextArea label="Description" rows="4" value={newExperience.description} onChange={(e) => setNewExperience({...newExperience, description: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("experience")}>{editingId ? "Update" : "Add"} Experience Entry</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {experience.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start group">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                          <p className="text-blue-600 font-semibold text-sm mb-2">{item.company} • {item.duration}</p>
                          <p className="text-slate-600 text-sm max-w-2xl">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("experience", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("experience", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "skill" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add New Skill</h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <Input label="Skill Name" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} />
                      <Input label="Category" value={newSkill.category} onChange={(e) => setNewSkill({...newSkill, category: e.target.value})} />
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Level</label>
                        <select
                           value={newSkill.level}
                           onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                           className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none text-slate-900 appearance-none"
                        >
                          <option value="">Select Level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                      <Input label="Percentage (%)" type="number" value={newSkill.percentage} onChange={(e) => setNewSkill({...newSkill, percentage: e.target.value})} />
                      <FileUpload label="Skill Logo" value={newSkill.logo_url} setStatusMessage={setStatusMessage} onUpload={(url) => setNewSkill({...newSkill, logo_url: url})} />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("skill")}>{editingId ? "Update" : "Add"} Skill</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((item) => (
                      <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center group">
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mt-1">{item.category}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase">{item.level}</span>
                            <span className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-[10px] font-bold uppercase">{item.percentage}%</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("skill", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("skill", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "project" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Featured Project</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Project Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} />
                      <Input label="Tech Stack (comma separated)" value={newProject.tech_stack} onChange={(e) => setNewProject({...newProject, tech_stack: e.target.value})} />
                      <Input label="GitHub Link" value={newProject.github_link} onChange={(e) => setNewProject({...newProject, github_link: e.target.value})} />
                      <Input label="Live Demo Link" value={newProject.live_link} onChange={(e) => setNewProject({...newProject, live_link: e.target.value})} />
                      <FileUpload label="Project Image URL" value={newProject.image} setStatusMessage={setStatusMessage} onUpload={(url) => setNewProject({...newProject, image: url})} />
                      <Input label="Video URL" value={newProject.video_url} onChange={(e) => setNewProject({...newProject, video_url: e.target.value})} />
                      <div className="md:col-span-2">
                        <TextArea label="Description" rows="4" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("project")}>{editingId ? "Update" : "Publish"} Project</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1 mb-4">{item.tech_stack}</p>
                          <p className="text-slate-600 text-sm line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("project", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("project", item.id)} className="ml-4 p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "service" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add Service (What I do)</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Title" value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})} />
                      <Input label="Icon SVG Path" value={newService.icon_svg} onChange={(e) => setNewService({...newService, icon_svg: e.target.value})} />
                      <div className="md:col-span-2">
                        <TextArea label="Description" rows="4" value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("service")}>{editingId ? "Update" : "Add"} Service</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {services.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                          <p className="text-slate-600 text-sm mt-2">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("service", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("service", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "training" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add Training</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Title" value={newTraining.title} onChange={(e) => setNewTraining({...newTraining, title: e.target.value})} />
                      <Input label="Institute" value={newTraining.institute} onChange={(e) => setNewTraining({...newTraining, institute: e.target.value})} />
                      <Input label="Location" value={newTraining.location} onChange={(e) => setNewTraining({...newTraining, location: e.target.value})} />
                      <Input label="Duration" value={newTraining.duration} onChange={(e) => setNewTraining({...newTraining, duration: e.target.value})} />
                      <FileUpload label="Logo URL" value={newTraining.institute_logo_url} setStatusMessage={setStatusMessage} onUpload={(url) => setNewTraining({...newTraining, institute_logo_url: url})} />
                      <div className="md:col-span-2">
                        <TextArea label="Details" rows="4" value={newTraining.details} onChange={(e) => setNewTraining({...newTraining, details: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("training")}>{editingId ? "Update" : "Add"} Training</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {trainings.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                          <p className="text-blue-600 font-semibold text-sm mb-2">{item.institute} • {item.duration}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("training", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("training", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "language" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add Language</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Language Name" value={newLanguage.name} onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})} />
                      <Input label="Reading Level" value={newLanguage.reading} onChange={(e) => setNewLanguage({...newLanguage, reading: e.target.value})} />
                      <Input label="Speaking Level" value={newLanguage.speaking} onChange={(e) => setNewLanguage({...newLanguage, speaking: e.target.value})} />
                      <Input label="Writing Level" value={newLanguage.writing} onChange={(e) => setNewLanguage({...newLanguage, writing: e.target.value})} />
                      <Input label="Listening Level" value={newLanguage.listening} onChange={(e) => setNewLanguage({...newLanguage, listening: e.target.value})} />
                      <FileUpload label="Logo URL" value={newLanguage.logo_url} setStatusMessage={setStatusMessage} onUpload={(url) => setNewLanguage({...newLanguage, logo_url: url})} />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("language")}>{editingId ? "Update" : "Add"} Language</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {languages.map((item) => (
                      <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-slate-400 text-xs">R: {item.reading} | S: {item.speaking} | W: {item.writing} | L: {item.listening}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("language", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("language", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reference" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add Reference</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Name" value={newReference.name} onChange={(e) => setNewReference({...newReference, name: e.target.value})} />
                      <Input label="Title" value={newReference.title} onChange={(e) => setNewReference({...newReference, title: e.target.value})} />
                      <Input label="Organization" value={newReference.organization} onChange={(e) => setNewReference({...newReference, organization: e.target.value})} />
                      <Input label="Phone" value={newReference.phone} onChange={(e) => setNewReference({...newReference, phone: e.target.value})} />
                      <Input label="Location" value={newReference.location} onChange={(e) => setNewReference({...newReference, location: e.target.value})} />
                      <FileUpload label="Image URL" value={newReference.person_image_url} setStatusMessage={setStatusMessage} onUpload={(url) => setNewReference({...newReference, person_image_url: url})} />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("reference")}>{editingId ? "Update" : "Add"} Reference</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {references.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{item.name}</h4>
                          <p className="text-blue-600 font-semibold text-sm">{item.title} • {item.organization}</p>
                          <p className="text-slate-500 text-sm">{item.phone} | {item.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("reference", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("reference", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "stat" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Manage Stats</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Label (e.g. Years Experience)" value={newStat.label} onChange={(e) => setNewStat({...newStat, label: e.target.value})} />
                      <Input label="Value (Number)" type="number" value={newStat.value} onChange={(e) => setNewStat({...newStat, value: e.target.value})} />
                      <Input label="Suffix (e.g. +)" value={newStat.suffix} onChange={(e) => setNewStat({...newStat, suffix: e.target.value})} />
                      <div className="md:col-span-2">
                        <TextArea label="Description (Optional)" rows="2" value={newStat.description} onChange={(e) => setNewStat({...newStat, description: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("stat")}>{editingId ? "Update" : "Add"} Stat</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-full group transition-all hover:shadow-md">
                        <div>
                          <p className="text-3xl font-black text-slate-900 mb-1">{item.value}{item.suffix}</p>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</h4>
                          {item.description && <p className="text-slate-500 text-xs mt-3 line-clamp-2 italic">{item.description}</p>}
                        </div>
                        <div className="flex gap-2 justify-end mt-6 pt-4 border-t border-slate-50">
                          <button onClick={() => handleEdit("stat", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("stat", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "testimonial" && (
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Add Testimonial</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Input label="Client Name" value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} />
                      <Input label="Client Role / Company" value={newTestimonial.role} onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})} />
                      <FileUpload label="Image URL" value={newTestimonial.image_url} setStatusMessage={setStatusMessage} onUpload={(url) => setNewTestimonial({...newTestimonial, image_url: url})} />
                      <div className="md:col-span-2">
                        <TextArea label="Message" rows="4" value={newTestimonial.message} onChange={(e) => setNewTestimonial({...newTestimonial, message: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleSaveItem("testimonial")}>{editingId ? "Update" : "Add"} Testimonial</Button>
                      {editingId && <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {testimonials.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start group">
                        <div className="flex gap-4">
                           <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0">
                              <img src={item.image_url || `https://ui-avatars.com/api/?name=${item.name}`} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <h4 className="text-lg font-bold text-slate-900">{item.name}</h4>
                              <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest">{item.role}</p>
                              <p className="text-slate-600 text-sm mt-3 italic">\"{item.message}\"</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit("testimonial", item)} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete("testimonial", item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "message" && (
                <div className="space-y-6">
                  {messages.length === 0 ? (
                    <div className="bg-white p-20 rounded-[2.5rem] text-center border border-slate-100 shadow-sm">
                       <p className="text-slate-400 font-bold">No messages yet.</p>
                    </div>
                  ) : (
                    messages.map((item) => (
                      <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-start group">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-slate-900">{item.name}</h4>
                            <span className="text-xs text-slate-400 font-semibold">{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-blue-600 font-semibold text-sm mb-4">{item.email}</p>
                          <div className="p-6 bg-slate-50 rounded-2xl text-slate-600 text-sm whitespace-pre-wrap">
                            {item.message}
                          </div>
                        </div>
                        <button onClick={() => handleDelete("message", item.id)} className="ml-4 p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
