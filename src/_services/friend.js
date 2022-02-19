import api from "@constant/api";
import { getAuthHeader } from "@constant/headers";

export const sendRequest = async (data) => {
  const res = await api.post("/friend", data, getAuthHeader());
  return res;
};

export const getFriends = async () => {
  const res = await api.get("/friend/get-all-friend", getAuthHeader());
  return res;
};

export const getFriendRequest = async () => {
  const res = await api.get("/friend/get-pending-friend", getAuthHeader());
  return res;
};

export const acceptRequest = async (id) => {
  const res = await api.get(`/friend/accept/${id}`, getAuthHeader());
  return res;
};

export const deleteRequest = async (id) => {
  const res = await api.delete(`/friend/delete/${id}`, getAuthHeader());
  return res;
};
