import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from "./BASE_URL";

export const login = async (loginObject: any) => {
  const response = await axios
    .post(`${BASE_URL}/users/login`, loginObject)
    .then(async (res) => {
      const token = res.data.user.token;
      Cookies.set("token", token);
      return res;
    });
  return response;
};
