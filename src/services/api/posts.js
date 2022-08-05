import axiosInstance from "./axios-instance";

export const getPosts = () => {
  return axiosInstance
    .get("/posts")
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
