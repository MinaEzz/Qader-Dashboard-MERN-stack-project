import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { DASHBOARD_SIDEBAR_LINKS } from "../../../../constants";
import { blueLogo } from "../../../../assets/images";
import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";

const Sidebar = ({ pathname }) => {
  const { logout } = useContext(AuthContext);
  return (
    <aside
      className="bg-white w-1/5 h-fit flex flex-col gap-8 items-center rounded-tr-3xl rounded-br-3xl sticky top-0"
      style={{
        boxShadow: "2px 0 8px -1px rgb(115,115,115)",
      }}
    >
      <Link to="/dashboard" className="w-[80px] h-[200px] py-10">
        <img src={blueLogo} alt="Qader Website" draggable={false} />
      </Link>
      {/* ./logo */}
      <ul className="w-full space-y-3 overflow-auto items-center">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => {
          return <SidebarLink link={link} pathname={pathname} key={link.key} />;
        })}
        <li className="w-full hover:bg-neutral-300 transition-all last:rounded-br-3xl">
          <button
            className="w-full flex items-center py-2 px-3 gap-2 hover:pl-4 transition-all text-lg capitalize font-medium text-black cursor-pointer"
            onClick={logout}
          >
            <LuLogOut title="logout" fontSize={24} />
            <span>logout</span>
          </button>
        </li>
      </ul>
      {/* ./navigation links */}
    </aside>
  );
};

export default Sidebar;
