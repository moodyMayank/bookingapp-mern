import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (ev) => {
    ev.preventDefault(); // It will now not reload the page
    try {
      await axios.post("/register", {
        username,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (err) {
      alert("Registration failed. Please try again later");
    }
  };

  return (
    <div className="mt-4 flex flex-col h-[80vh] items-center justify-center">
      <div className="mb-10">
        <h1 className="text-4xl text-center font-bold mb-1">
          Register with Airbnb
        </h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="First Name"
            value={username}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary mt-2 text-lg">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account ?
            <Link to={"/login"} className="underline ml-2 text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
