import axiosInstance from "../apiConfig/axios";

export const getSalesman = () => {
  return axiosInstance.get(`salesman/get`);
};

export const addNewSales = (body: any) => {
  return axiosInstance.post(`sales/create`, body);
};
