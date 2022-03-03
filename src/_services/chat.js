import api from "@constant/api";
import { getAuthHeader } from "@constant/headers";

export const getChats = async (id) => {
  const res = await api.post("/chat/get", { reciever: id }, getAuthHeader());
  return res;
};

export const getOverview = async () => {
  const res = await api.get("/chat/overview", getAuthHeader());
  return res;
};
