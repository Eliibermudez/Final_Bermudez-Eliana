import { apiRequest } from "./api";

export const getMissions = async (token) => {
  return apiRequest("/missions", {
    token,
  });
};

export const getMissionById = async (id, token) => {
  return apiRequest(`/missions/${id}`, {
    token,
  });
};

export const createMission = async (mission, token) => {
  return apiRequest("/missions", {
    method: "POST",
    token,
    body: mission,
  });
};

export const updateMission = async (id, mission, token) => {
  return apiRequest(`/missions/${id}`, {
    method: "PUT",
    token,
    body: mission,
  });
};

export const deleteMission = async (id, token) => {
  return apiRequest(`/missions/${id}`, {
    method: "DELETE",
    token,
  });
};