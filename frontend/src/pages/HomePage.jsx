import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);
  return <h1>{user?.username}</h1>;
};

export default HomePage;
