import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import BASE_URL from "@/api/BASE_URL";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const loginSchema = yup.object({
    email:yup
    .string().email("veuillez entrer votre email").required("veillez entrer votre email"),
    password:yup
    .string().required("veuillez entre votre mot de passe")
}).required();

export default function Login(){
    const route = useRouter();
    const {register , formState: {errors} , handleSubmit}= useForm({
        resolver: yupResolver(loginSchema)
    })

    const handleLoginSubmit = async (e: any) => {
        await axios.post(`${BASE_URL}/users/login`, e).then(async (res) => {
            const token= res.data.user.token;
            Cookies.set("token",token)
            await route.push("/profile")
        }).catch((res) => {
            console.log(res);
        })
    }

    return(
        <>
        <div>
            <form onSubmit={handleSubmit(handleLoginSubmit)}>
                <label htmlFor="">Email</label>
                <input type="text" 
                    {...register("email")}/>
                <label htmlFor="">Password</label>
                <input type="text" 
                    {...register("password")}/>
                <button type="submit">submit</button>
            </form>
        </div>
        </>
    )
}