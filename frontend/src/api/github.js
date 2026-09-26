import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ---------------- API Clients ----------------

const githubApi = axios.create({
  baseURL: `${API_URL}/github`,
});

const favoritesApi = axios.create({
  baseURL: `${API_URL}/favorites`,
});

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
});

// =======================================================
// Attach JWT Token
// =======================================================

const attachToken = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

githubApi.interceptors.request.use(attachToken);
favoritesApi.interceptors.request.use(attachToken);
authApi.interceptors.request.use(attachToken);

// =======================================================
// GitHub APIs
// =======================================================

export const getTrendingRepositories = async () => {
  const response = await githubApi.get("/trending");
  return response.data;
};

export const searchRepositories = async (query) => {
  const response = await githubApi.get("/repositories", {
    params: { query },
  });
  return response.data;
};

export const searchDevelopers = async (query) => {
  const response = await githubApi.get("/developers", {
    params: { query },
  });
  return response.data;
};

export const getDeveloperProfile = async (username) => {
  const response = await githubApi.get(`/developers/${username}`);
  return response.data;
};

// =======================================================
// Favorite Repositories
// =======================================================

export const getFavoriteRepositories = async () => {
  const response = await favoritesApi.get("/repositories");
  return response.data;
};

export const addFavoriteRepository = async (repo) => {
  const response = await favoritesApi.post("/repositories", repo);
  return response.data;
};

export const deleteFavoriteRepository = async (repoId) => {
  const response = await favoritesApi.delete(`/repositories/${repoId}`);
  return response.data;
};

// =======================================================
// Favorite Developers
// =======================================================

export const getFavoriteDevelopers = async () => {
  const response = await favoritesApi.get("/developers");
  return response.data;
};

export const addFavoriteDeveloper = async (developer) => {
  const response = await favoritesApi.post("/developers", developer);
  return response.data;
};

export const deleteFavoriteDeveloper = async (developerId) => {
  const response = await favoritesApi.delete(`/developers/${developerId}`);
  return response.data;
};

// =======================================================
// Authentication
// =======================================================

export const login = async (username, password) => {
  const form = new URLSearchParams();

  form.append("username", username);
  form.append("password", password);

  const response = await authApi.post("/login", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const register = async (username, email, password) => {
  const response = await authApi.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
};
