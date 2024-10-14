import { apiAxiosInstance } from "./axiosIntenses";
export const signUp = async (data: any) => {
  try {
    const response = await apiAxiosInstance.post("/signup", data);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to signup");
  }
};

export const login = async (data: any) => {
  try {
    const response = await apiAxiosInstance.post("/signin", data);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to login");
  }
};

//setup
export const getOrganisationData = async () => {
  try {
    const response = await apiAxiosInstance.get("/setup");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to get org setup");
  }
};

export const updateOrganisationSetup = async (data: any) => {
  try {
    const response = await apiAxiosInstance.put("/setup", data);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to update org setup");
  }
};

//configuration
export const getOrganisationConfig = async () => {
  try {
    const response = await apiAxiosInstance.get("/config");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to get org config");
  }
};
export const updateOrganisationConfig = async (data: any) => {
  try {
    const response = await apiAxiosInstance.put("/config", data);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to update org config");
  }
};

//plugin installation
export const getOrganisationPlugin = async () => {
  try {
    const response = await apiAxiosInstance.get("/plugin");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to get org plugin");
  }
};
export const updateOrganisationPlugin = async (platform: string) => {
  try {
    const response = await apiAxiosInstance.put("/plugin", {
      platform: platform,
    });
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to update org plugin");
  }
};

//paymnet
export const getOrganisationPaymentPlan = async () => {
  try {
    const response = await apiAxiosInstance.get("/payment");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to get org payment plans");
  }
};
export const updateOrganisationPayment = async (data: any) => {
  try {
    const response = await apiAxiosInstance.put("/payment", data);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to update org payment");
  }
};

//categories
export const getOrganisationCategories = async () => {
  try {
    const response = await apiAxiosInstance.get("/category");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to get org categories");
  }
};
export const updateOrganisationcategories = async (data: any) => {
  try {
    const response = await apiAxiosInstance.put("/category", data);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Failed to update org categories");
  }
};
