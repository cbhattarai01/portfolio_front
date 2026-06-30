import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import api from "../services/api";

const PortfolioContext = createContext();

const animatedCounter = (target, setter) => {
  let current = 0;
  const duration = 800;
  const stepTime = Math.max(15, Math.round(duration / target));
  const interval = setInterval(() => {
    current += 1;
    setter(current);
    if (current >= target) {
      clearInterval(interval);
      setter(target);
    }
  }, stepTime);
  return () => clearInterval(interval);
};

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState([]);

  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [educations, setEducations] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [references, setReferences] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(api.isAuthenticated());

  useEffect(() => {
    const load = async () => {
      try {
        const [
          profileData,
          servicesData,
          projectsData,
          skillsData,
          experienceData,
          educationData,
          trainingData,
          languageData,
          referenceData,
          testimonialsData,
          statsData
        ] = await Promise.all([
          api.getProfile(),
          api.getServices(),
          api.getProjects(),
          api.getSkills(),
          api.getExperience(),
          api.getEducation(),
          api.getTrainings(),
          api.getLanguages(),
          api.getReferences(),
          api.getTestimonials(),
          api.getStats(),
        ]);

        setProfile(profileData || {});
        setServices(servicesData || []);
        setProjects(projectsData || []);
        setStats(statsData || []);

        setSkills(skillsData || []);
        setExperience(experienceData || []);
        setEducations(educationData || []);
        setTrainings(trainingData || []);
        setLanguages(languageData || []);
        setReferences(referenceData || []);
        setTestimonials(testimonialsData || []);
      } catch (err) {
        console.error("Failed to load portfolio data", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  const skillGroups = useMemo(() => {
    return skills.reduce((grouped, skill) => {
      const category = skill.category || "General";
      grouped[category] = grouped[category] || [];
      grouped[category].push(skill);
      return grouped;
    }, {});
  }, [skills]);

  const value = {
    profile,
    services,
    projects,
    skills,
    stats,

    experience,
    educations,
    trainings,
    languages,
    references,
    testimonials,
    loading,
    error,
    skillGroups,
    isAdmin,
    setIsAdmin
  };


  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
