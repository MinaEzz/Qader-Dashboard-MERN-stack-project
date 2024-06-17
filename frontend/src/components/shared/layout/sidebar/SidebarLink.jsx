import { Link } from "react-router-dom";

const SidebarLink = ({ link, pathname }) => {
  return (
    <li className="w-full hover:bg-neutral-300 transition-all last:rounded-br-3xl">
      <Link
        to={link.path}
        className={
          pathname === link.path
            ? `flex items-center py-2 px-3 gap-2 hover:pl-4 transition-all text-lg capitalize bg-neutral-300 text-primary-600 font-extrabold pl-4 `
            : ` flex items-center py-2 px-3 gap-2 hover:pl-4 transition-all text-lg capitalize font-medium text-black`
        }
      >
        {link.icon}
        <span> {link.label} </span>
      </Link>
    </li>
  );
};

export default SidebarLink;
