import api from "../api/github";

export const getTrending = () => api.get("/github/trending");

export const searchRepositories = (query) =>
  api.get(`/github/repositories?query=${query}`);

export const repositoryDetails = (owner, repo) =>
  api.get(`/github/repositories/${owner}/${repo}`);

export const searchDevelopers = (query) =>
  api.get(`/github/developers?query=${query}`);

export const developerProfile = (username) =>
  api.get(`/github/developers/${username}`);

export const developerRepositories = (username) =>
  api.get(`/github/developers/${username}/repositories`);

export const followers = (username) =>
  api.get(`/github/developers/${username}/followers`);

export const following = (username) =>
  api.get(`/github/developers/${username}/following`);

export const languages = () => api.get("/github/languages");
