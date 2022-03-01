import { uploadImageFile } from "./s3";
import toast from "react-hot-toast";

const catchError = (err) => {
  if (err.response.data) {
    toast.error(err.response.data.message || "Something went wrong!");
  } else toast.error("Something went wrong!");
};

export { catchError, uploadImageFile };
