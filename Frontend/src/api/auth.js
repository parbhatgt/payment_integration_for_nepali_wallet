import api from "./axiosInstance";

export const login = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};



export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response;
  } catch (error) {
    throw error;
  }
};


