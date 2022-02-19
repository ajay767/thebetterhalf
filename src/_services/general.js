import api from "@constant/api";

export const getSignedUrl = async ({ contentType }) => {
  const res = await api.get(`/aws/get-signed-url?contentType=${contentType}`);
  return res;
};
