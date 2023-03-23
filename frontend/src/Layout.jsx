import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="py-2 px-6 flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
