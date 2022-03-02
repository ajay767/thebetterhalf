import api from '@constant/api';
import { getAuthHeader } from '@constant/headers';

export const createPost = async (data) => {
  const res = await api.post('/post/create', data, getAuthHeader());
  return res;
};

export const getMyPost = async () => {
  const res = await api.get('/post/getAllPosts/0', getAuthHeader());
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
export const getLikes = async (id) => {
  const res = await api.get(`/post/getPost/${id}`);
  return res;
};

export const createLike = async (data) => {
  const res = await api.post(`/like/create`, data, getAuthHeader());
  return res;
};
export const deleteLike = async (data) => {
  const res = await api.post(`/like/delete`, data, getAuthHeader());
  return res;
};

export const newsFeed = async (page = 1) => {
  const res = await api.get(`/post/newsFeed?page=${page}`);
  return res;
};
