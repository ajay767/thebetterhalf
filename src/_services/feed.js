import api from "@constant/api";
import { getAuthHeader } from "@constant/headers";

export const createPost = async (data) => {
  const res = await api.post("/post/create", data, getAuthHeader());
  return res;
};

export const getMyPost = async () => {
  const res = await api.get("/post/getAllPosts/0", getAuthHeader());
  return res;
};

export const getUserPost = async (id) => {
  const res = await api.get(`/post/getAllPosts/${id}`, getAuthHeader());
  return res;
};

export const writeComment = async (data) => {
  const res = await api.post(`/comment/create`, data, getAuthHeader());
  return res;
};

export const getComments = async (id) => {
  const res = await api.get(`/comment/getcomments/${id}`, getAuthHeader());
  return res;
};
