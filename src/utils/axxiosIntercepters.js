import axios from "axios";
import config from "../Config";
const axiosFetch = axios.create({
  baseURL: config.REACT_APP_baseURL + "v1",
});

export const initIntercepter = (frompage, token) => {
  axiosFetch.interceptors.request.use(
    (request) => {
      request.headers.common["Accept"] = "application/json";
      request.headers.common["x-api-key"] = config.REACT_APP_X_API_KEY;
      request.headers.common["Authorization"] = `Bearer ${token}`;

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default axiosFetch;
