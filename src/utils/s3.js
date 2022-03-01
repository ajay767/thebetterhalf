import { general } from "@services";
import api from "@constant/api";

export const uploadImageFile = async (file, setProgress) => {
  const res = await general.getSignedUrl({
    contentType: file.type,
  });
  const url = res.data.url;

  await api.put(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (data) => {
      let uptill = Math.round((100 * data.loaded) / data.total);
      setProgress(Math.max(0, --uptill));
    },
  });

  const imageUrl = url.split("?")[0];

  return imageUrl;
};

export default { uploadImageFile };
