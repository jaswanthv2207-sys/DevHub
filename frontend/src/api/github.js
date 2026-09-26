import axios from "axios";

// ---------------- API Clients ----------------

const githubApi = axios.create({
  baseURL: "http://127.0.0.1:8000/github",
});

const favoritesApi = axios.create({
  baseURL: "http://127.0.0.1:8000/favorites",
});

const authApi = axios.create({
  baseURL: "http://127.0.0.1:8000/auth",
});

// ---------------- Attach JWT ----------------

favoritesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------------- GitHub ----------------

export const getTrendingRepositories = async () => {
  const response = await githubApi.get("/trending");
  return response.data;
};

export const searchRepositories = async (query) => {
  const response = await githubApi.get(`/repositories?query=${query}`);
  return response.data;
};

export const searchDevelopers = async (query) => {
  const response = await githubApi.get(`/developers?query=${query}`);
  return response.data;
};

export const getDeveloperProfile = async (username) => {
  const response = await githubApi.get(`/developers/${username}`);
  return response.data;
};

// ---------------- Repository Favorites ----------------

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

// ---------------- Developer Favorites ----------------

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

// ---------------- Authentication ----------------

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

const attachToken = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

githubApi.interceptors.request.use(attachToken);
favoritesApi.interceptors.request.use(attachToken);
