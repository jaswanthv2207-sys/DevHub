import axios from "axios";

const API = "http://127.0.0.1:8000";

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API}/auth/register`, {
    username,
    email,
    password,
  });

  return response.data;
};

export const loginUser = async (username, password) => {
  const form = new URLSearchParams();

  form.append("username", username);
  form.append("password", password);

  const response = await axios.post(`${API}/auth/login`, form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};
