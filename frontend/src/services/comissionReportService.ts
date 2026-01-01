import axiosInstance from "../apiConfig/axios";

export const getCommisionReport = () => {
  return axiosInstance.get(`commission/report`);
};
