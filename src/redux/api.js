import httpInstance from "./config/axiosConfig";
import axios from "axios";

export const loginApi = async (formValue, headers) => {
  return await httpInstance.post(`/user/login`, formValue, { headers });
};
// get sideBarAllmodules api
export const getSideBarAllModules = async (token) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Access-Token": token,
  };
  console.log("tokenpops", token);
  return await httpInstance.get(`http://20.219.104.23:4040/api/v1/pemissions/getRoles`, { headers });
};
