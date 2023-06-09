import BASE_URL from "@/api/BASE_URL";
import { signUp } from "@/api/register";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

export default function Sign_up(){
    const route = useRouter();
    const {register ,formState: {errors} , handleSubmit} = useForm()

    const handleSignupSubmit = async (registerObject: any) => {
        signUp(registerObject).then((res) => {
            route.push("/profile")
        }).catch((err) => {
            console.log(err);
        })
    }
    return(
        <>
        <div>
            <form onSubmit={handleSubmit(handleSignupSubmit)}>
                <label htmlFor="">Name</label>
                <input type="text" 
                        {...register("name")}/>
                <label htmlFor="">Email</label>
                <input type="text" 
                        {...register("email")}/>
                <label htmlFor="">Password</label>
                <input type="text" 
                        {...register("password")}/>
                <label htmlFor="">Confirm password</label>
                <input type="text" 
                        {...register("confirmPassword")}/>
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}