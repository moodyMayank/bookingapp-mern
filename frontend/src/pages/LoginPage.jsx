import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    console.log("Inside Login Submit");
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      setRedirect(true);
    } catch (err) {
      console.log(err);
      alert("Login failed", err);
    }
    console.log("Outside Login submit");
  };

  if (redirect) return <Navigate to={"/"} />;
  return (
    <div className="mt-4 flex flex-col h-[80vh] items-center justify-center">
      <div className="mb-10">
        <h1 className="text-4xl text-center font-bold mb-1">
          Welcome to Airbnb
        </h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary mt-2 text-lg">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline ml-2 text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
