import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5002/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



//This will intercept every error so there is no need to add onError to everything.
api.interceptors.response.use(
  (res) => res, //pass through response  thats successfull
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message || error.message || "Something went wrong";

      if (axios.isAxiosError(error)) {
        toast.error(message);
        console.error("Backend error:", message);
      } else {
        toast.error("Unexpected error occurred");
        console.error(error);
      }
    }
  }
);
