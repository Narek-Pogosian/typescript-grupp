import Header from "./Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="container pt-20 pb-10">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
