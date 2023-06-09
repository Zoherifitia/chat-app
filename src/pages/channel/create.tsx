import BASE_URL from "@/api/BASE_URL";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { createChannel } from "@/api/channel";
import { useRouter } from "next/router";

export const getServerSideProps = async (context: any) => {
  const token = context.req.cookies.token;
  let userLoged: any = null;
  await axios
    .get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      userLoged = res.data;
    });

  return {
    props: {
      token: token,
      userLoged: userLoged,
    },
  };
};

const createChannelSchema = yup.object({
    name:yup.string().required("ce nom doit etre rempli"),
    type: yup.string().required("choisissez la visibilite du channel")
}).required();

const Profile = ({ token, userLoged }: { token: string; userLoged: any }) => {
    const {register,watch,formState: { errors },handleSubmit,} = useForm();
    const channelType = watch("type");
    const user = userLoged.users; 

    const route = useRouter();
    const handleChannelSubmit = async (channelObject: any) => {
        await createChannel(channelObject)
          .then((res) => {
            const channelCreated =
            route.push(`/profile/${channelObject.id}`);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    

  return (
    <>
        <div>
            <form name="createChannelForm" onSubmit={handleSubmit(handleChannelSubmit)}>
                <label htmlFor="">Channel name </label>
                <input type="text" {...register("name")} />
                <label htmlFor="">Type</label>
                <select {...register("type")}>
                    <option value="private">private</option>
                    <option value="public">public</option>
                </select>

                {channelType === "public" ? null:(<>
                <label htmlFor="">Users</label>
                        {user.map((val:any) => 
                            <div key={val.id}>
                                <input type="checkbox" {...register(`users.${val.id}`)}value={val.name}/>
                                <label htmlFor={val.id}>{val.name}</label>
                            </div>
                        )}
                </>)}
                <button type="submit">Submit</button>
            </form>
        </div>
    </>
  );
};

export default Profile;
