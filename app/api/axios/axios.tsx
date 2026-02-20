import axios from "axios";
import {Cookies} from "react-cookie";

let baseURL = `http://localhost:4000/`;

let axiosInstance = axios.create({
  baseURL,
});
let cookies=new Cookies();
axiosInstance.interceptors.request.use(
  function (config) {
    const token = cookies.get("token");
    console.log(token, "token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
