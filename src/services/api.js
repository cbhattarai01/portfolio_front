const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("auth_token");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && path !== "/api/auth/login") {
    localStorage.removeItem("auth_token");
    window.location.href = "/admin/login";
  }

  const text = await response.text();
  try {
    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(data.error || response.statusText || "API request failed");
    }
    return data;
  } catch (err) {
    if (!response.ok) {
      throw new Error(response.statusText || "API request failed");
    }
    console.error("Failed to parse JSON response:", text.substring(0, 100));
    throw new Error("Invalid response from server");
  }
}

export default {
  login: async (email, password) => {
    const data = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("auth_token", data.token);
    return data.user;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },

  getMessage: async () => {
    const data = await request("/api/message");
    return data.message;
  },

  getProfile: async () => {
    const data = await request("/api/profile");
    return data.profile;
  },

  saveProfile: async (payload) => {
    const data = await request("/api/profile", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.profile;
  },

  getProjects: async () => {
    const data = await request("/api/projects");
    return data.projects;
  },

  addProject: async (payload) => {
    const data = await request("/api/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.project;
  },

  deleteProject: async (id) => {
    await request(`/api/projects/${id}`, { method: "DELETE" });
  },

  updateProject: async (id, payload) => {
    const data = await request(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.project;
  },

  getSkills: async () => {
    const data = await request("/api/skills");
    return data.skills;
  },

  addSkill: async (payload) => {
    const data = await request("/api/skills", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.skill;
  },

  updateSkill: async (id, payload) => {
    const data = await request(`/api/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.skill;
  },

  deleteSkill: async (id) => {
    await request(`/api/skills/${id}`, { method: "DELETE" });
  },

  getServices: async () => {
    const data = await request("/api/services");
    return data.services;
  },

  addService: async (payload) => {
    const data = await request("/api/services", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.service;
  },

  updateService: async (id, payload) => {
    const data = await request(`/api/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.service;
  },

  deleteService: async (id) => {
    await request(`/api/services/${id}`, { method: "DELETE" });
  },

  getStats: async () => {
    const data = await request("/api/stats");
    return data.stats;
  },

  addStat: async (payload) => {
    const data = await request("/api/stats", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.stat;
  },

  updateStat: async (id, payload) => {
    const data = await request(`/api/stats/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.stat;
  },

  deleteStat: async (id) => {
    await request(`/api/stats/${id}`, { method: "DELETE" });
  },

  getEducation: async () => {
    const data = await request("/api/education");
    return data.education;
  },

  addEducation: async (payload) => {
    const data = await request("/api/education", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.education;
  },

  updateEducation: async (id, payload) => {
    const data = await request(`/api/education/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.education;
  },

  deleteEducation: async (id) => {
    await request(`/api/education/${id}`, { method: "DELETE" });
  },

  getExperience: async () => {
    const data = await request("/api/experience");
    return data.experiences;
  },

  addExperience: async (payload) => {
    const data = await request("/api/experience", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.experience;
  },

  updateExperience: async (id, payload) => {
    const data = await request(`/api/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.experience;
  },

  deleteExperience: async (id) => {
    await request(`/api/experience/${id}`, { method: "DELETE" });
  },

  getTrainings: async () => {
    const data = await request("/api/trainings");
    return data.trainings;
  },

  addTraining: async (payload) => {
    const data = await request("/api/trainings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.training;
  },

  updateTraining: async (id, payload) => {
    const data = await request(`/api/trainings/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.training;
  },

  deleteTraining: async (id) => {
    await request(`/api/trainings/${id}`, { method: "DELETE" });
  },

  getReferences: async () => {
    const data = await request("/api/references");
    return data.references;
  },

  addReference: async (payload) => {
    const data = await request("/api/references", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.reference;
  },

  updateReference: async (id, payload) => {
    const data = await request(`/api/references/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.reference;
  },

  deleteReference: async (id) => {
    await request(`/api/references/${id}`, { method: "DELETE" });
  },

  getLanguages: async () => {
    const data = await request("/api/languages");
    return data.languages;
  },

  addLanguage: async (payload) => {
    const data = await request("/api/languages", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.language;
  },

  updateLanguage: async (id, payload) => {
    const data = await request(`/api/languages/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.language;
  },

  deleteLanguage: async (id) => {
    await request(`/api/languages/${id}`, { method: "DELETE" });
  },

  getTestimonials: async () => {
    const data = await request("/api/testimonials");
    return data.testimonials;
  },

  addTestimonial: async (payload) => {
    const data = await request("/api/testimonials", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.testimonial;
  },

  updateTestimonial: async (id, payload) => {
    const data = await request(`/api/testimonials/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return data.testimonial;
  },

  deleteTestimonial: async (id) => {
    await request(`/api/testimonials/${id}`, { method: "DELETE" });
  },

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = getToken();
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || response.statusText || "Upload failed");
    }

    return response.json();
  },

  getMessages: async () => {
    const data = await request("/api/contact");
    return data.messages;
  },

  deleteMessage: async (id) => {
    await request(`/api/contact/${id}`, { method: "DELETE" });
  },

  sendContact: async (payload) => {
    await request("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  isAuthenticated: () => {
    return !!getToken();
  },
};
