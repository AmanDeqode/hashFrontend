import axios from "axios";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => error
);

export default axiosInstance;
