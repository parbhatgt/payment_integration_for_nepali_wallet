import api from "./axiosInstance";

export const esewapayment = async (data) => {
  try {
    const response = await api.post("/payment/esewa", data);
    return response;
  } catch (error) {
    throw error;
  }
};


export const khaltipayment = async (data) => {
  try {
    const response = await api.post("/payment/khalti", data);
    return response;
  } catch (error) {
    throw error;
  }
};