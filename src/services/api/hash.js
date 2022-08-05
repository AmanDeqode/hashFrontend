import axiosInstance from "./axios-instance";

export const getHash = (inputHex, ipAddress) => {
  return axiosInstance
    .post("/hash/upload", { inputHex, ipAddress })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
