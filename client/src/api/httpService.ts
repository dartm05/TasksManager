import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5001/task-manager-48639/us-central1/api/", 
});

api.interceptors.request.use(
  (config) => {
    if(typeof (window as any).showLoading === "function") {
      (window as any).showLoading();
    }
    return config;
  },
  (error) => {
    if(typeof (window as any).hideLoading === "function") {
      (window as any).hideLoading();
    }
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    if(typeof (window as any).hideLoading === "function") {
      (window as any).hideLoading();
    }
    return response;
  },
  (error) => {
    if (typeof (window as any).hideLoading === "function") {
      (window as any).hideLoading();
    }
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
     
      if (typeof (window as any).showErrorModal === "function") {
        (window as any).showErrorModal(errorMessage);
      }

    return Promise.reject(error);
  }
);

export default api;
