import axiosInstance from "../apiConfig/axios";

export const getCars = (params?: { search?: string; sortBy?: string }) => {
  return axiosInstance.get("/car-models", {
    params,
  });
};

export const getCarById = (id: string) => axiosInstance.get(`car-models/${id}`);

export const addNewCar = (body: any) => {
  return axiosInstance.post(`car-models`, body);
};

export const deleteCar = (id: number) =>
  axiosInstance.delete(`/car-models/${id}`);

export const updateCar = (id: number, body: any) =>
  axiosInstance.put(`/car-models/${id}`, body);
