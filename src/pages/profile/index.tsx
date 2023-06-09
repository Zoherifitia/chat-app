import BASE_URL from "@/api/BASE_URL";
import axios from "axios";

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
  const user = userLoged.user;
  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>{user.token}</p>
    </>
  );
};

export default Profile;
