import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="mt-4 flex flex-col h-[80vh] items-center justify-center">
      <div className="mb-10">
        <h1 className="text-4xl text-center font-bold mb-1">
          Register with Airbnb
        </h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary mt-2 text-lg">Register</button>
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

export default RegisterPage;
