import axios from "axios";
import BASE_URL from "./BASE_URL";
import Cookies from "js-cookie";

export const createChannel =  async (channelObject: any) => {
    const response = await axios
      .post(`${BASE_URL}/channel`, channelObject)
      .then(async (res) => {
        const token = res.data.user.token;
        Cookies.set("token", token);
        return res;
      });
    return response;
  };