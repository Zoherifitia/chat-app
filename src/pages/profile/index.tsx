import BASE_URL from "@/api/BASE_URL";
import { putUser } from "@/api/user";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const getServerSideProps = async (context: any) => {
  const token = context.req.cookies.token;
  let userLoged: any = null;
  await axios
    .get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      userLoged = res.data;
    });

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: token,
      userLoged: userLoged,
    },
  };
};

const Profile = ({ token, userLoged }: { token: string; userLoged: any }) => {
  const {register,handleSubmit} = useForm();
  const user = userLoged.user;  

  const updateSubmit = async (logObject : any) => {
    await putUser(token,logObject);
  }
  return (
    <>
    <div>
      <p>id : {user.id}</p>
      <p>name : {user.name}</p>
      <p>email : {user.email}</p>
      
    </div>
    <div>
      <h4>Edit profile</h4>
      <form onSubmit={handleSubmit(updateSubmit)}>
        <label htmlFor="">Name</label><input type="text" {...register("name")} />
        <label htmlFor="">Email</label><input type="email" disabled value={user.email}/>
        <label htmlFor="">Current password</label><input type="password" {...register("currentPassword")} />
        <label htmlFor="">New password</label><input type="password" {...register("newPassword")} />
        <label htmlFor="">Confirm password</label><input type="password" {...register("confirmPassword")} />
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Profile;
