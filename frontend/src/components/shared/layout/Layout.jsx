import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <section id="layout" className="min-h-[100dvh] flex gap-4">
      <Sidebar pathname={pathname} />
      <section className="w-full flex flex-1 flex-col gap-8">
        <Header pathname={pathname} />
        <section className="px-6">{<Outlet />}</section>
      </section>
    </section>
  );
};

export default Layout;
