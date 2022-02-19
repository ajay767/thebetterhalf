import toast from "react-hot-toast";

export const catchError = (err) => {
  if (err.response.data) {
    toast.error(err.response.data.message || "Something went wrong!");
  } else toast.error("Something went wrong!");
};
