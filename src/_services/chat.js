import api from "@constant/api";
import { getAuthHeader } from "@constant/headers";

export const getChats = async (id) => {
  const res = await api.post("/chat/get", { reciever: id }, getAuthHeader());
  return res;
};
