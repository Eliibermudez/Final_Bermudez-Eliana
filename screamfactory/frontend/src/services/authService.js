import { apiRequest } from "./api";

export const loginUser = async (username, password) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: {
      username,
      password,
    },
  });
};

export const getProfile = async (token) => {
  return apiRequest("/auth/profile", {
    token,
  });
};