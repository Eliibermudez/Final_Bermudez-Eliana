import { apiRequest } from "./api";

export const getMonsters = async (token) => {
  return apiRequest("/monsters", {
    token,
  });
};

export const getMonsterById = async (id, token) => {
  return apiRequest(`/monsters/${id}`, {
    token,
  });
};

export const createMonster = async (monster, token) => {
  return apiRequest("/monsters", {
    method: "POST",
    token,
    body: monster,
  });
};

export const updateMonster = async (id, monster, token) => {
  return apiRequest(`/monsters/${id}`, {
    method: "PUT",
    token,
    body: monster,
  });
};

export const deleteMonster = async (id, token) => {
  return apiRequest(`/monsters/${id}`, {
    method: "DELETE",
    token,
  });
};