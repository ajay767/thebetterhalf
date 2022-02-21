import api from "@constant/api";
import { getAuthHeader } from "@constant/headers";
import { yupToFormErrors } from "formik";
import { BsHeartFill } from "react-icons/bs";
import { GiLoveHowl } from "react-icons/gi";
import { MdAddAlarm } from "react-icons/md";

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

export const getFriendProfile = async (id) => {
  const res = await api.get(`/auth/user/${id}`, getAuthHeader());
  return res;
};
