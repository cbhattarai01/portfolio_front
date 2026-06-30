import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import { useState } from "react";
import api from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const { isAdmin } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.sendContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-12 relative">
      {isAdmin && (
        <Link
          to="/admin?tab=message"
          className="absolute top-0 right-0 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg text-blue-600 hover:scale-110 transition-all z-20 flex items-center gap-2 text-sm font-bold"
          title="View Messages"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          View Messages
        </Link>
      )}
      <SectionHeading
        label="Contact"
        title="Get In Touch"
      />

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 dark:border-slate-800">
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          I'm always open to discussing <span className="text-slate-900 dark:text-white font-bold">new projects</span>, creative ideas or opportunities to be part of your visions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none transition-colors text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none transition-colors text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
            <textarea
              rows="4"
              required
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none transition-colors text-slate-900 dark:text-white font-bold resize-none"
            />
          </div>

          <div className="pt-6">
            <Button type="submit" className="px-10 py-4">Send Message</Button>
          </div>

          {status === "success" && <p className="text-green-500 font-bold mt-4">Message sent successfully!</p>}
          {status === "error" && <p className="text-red-500 font-bold mt-4">Failed to send message. Please try again.</p>}
        </form>
      </div>
    </div>
  );
}
