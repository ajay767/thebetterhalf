import api from "@constant/api";
import { getAuthHeader } from "@constant/headers";

export const signup = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res;
};

export const updateProfile = async (data) => {
  const res = await api.put("/auth/profile", data, getAuthHeader());
  return res;
};

export const updateProfilePicture = async (data) => {
  const res = await api.put("/auth/upload-profile", data, getAuthHeader());
  return res;
};

export const updatePassword = async (data) => {
  const res = await api.put("/auth/update-password", data, getAuthHeader());
  return res;
};

export const getProfile = async (data) => {
  const res = await api.get("/auth/profile", getAuthHeader());
  return res;
};

export const oneTapLogin = async (data) => {
  const res = await api.post("/auth/one-tap-login", data);
  return res;
};
