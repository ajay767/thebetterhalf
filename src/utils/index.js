import { uploadImageFile } from "./s3";
import toast from "react-hot-toast";

const catchError = (err) => {
  if (err.response.data) {
    toast.error(err.response.data.message || "Something went wrong!");
  } else toast.error("Something went wrong!");
};

const getImageFromFile = (file) => {
  if (typeof file == "object" && file) {
    const url = URL.createObjectURL(file);
    return url;
  } else return file;
};

export { catchError, uploadImageFile, getImageFromFile };
