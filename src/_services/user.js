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

export const getProfile = async (data) => {
  const res = await api.get("/auth/profile", getAuthHeader());
  return res;
};

export const oneTapLogin = async (data) => {
  const res = await api.post("/auth/one-tap-login", data);
  return res;
};
