import axios from "axios";
import BASE_URL from "./BASE_URL";
import Cookies from "js-cookie";


export const putUser = async (token: string, user: object) => {
    const response = await axios
      .put(`${BASE_URL}/user`, user)
      .then(async (res) => {
        const token = res.data.user.token;
        Cookies.set("token", token);
        return res;
      });
    return response;
  };