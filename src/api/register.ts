import axios from "axios";
import BASE_URL from "./BASE_URL";
import { login } from "./auth";

export const signUp = async (registerObject: any) => {
    await axios.post(`${BASE_URL}/users`, registerObject).then(async (res) => {
        const logObject = {
            email: registerObject.email,
            password: registerObject.password
        }
        await login(logObject)
        return res;
    }).catch((res) => {
        console.log(res);
    })
}