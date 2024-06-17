import { LuLayers, LuUsers } from "react-icons/lu";
import { MdOutlineCategory, MdWorkOutline } from "react-icons/md";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { TbDisabled } from "react-icons/tb";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "dashboard",
    path: "/dashboard",
    icon: <LuLayers title="dashboard" fontSize={24} />,
  },
  {
    key: "products",
    label: "products",
    path: "/dashboard/products",
    icon: <HiOutlineSquares2X2 title="products" fontSize={24} />,
  },
  {
    key: "categories",
    label: "categories",
    path: "/dashboard/categories",
    icon: <MdOutlineCategory title="categories" fontSize={24} />,
  },
  {
    key: "users",
    label: "users",
    path: "/dashboard/users",
    icon: <LuUsers title="users" fontSize={24} />,
  },
  {
    key: "jobs",
    label: "jobs",
    path: "/dashboard/jobs",
    icon: <MdWorkOutline title="jobs" fontSize={24} />,
  },
  {
    key: "disabilities",
    label: "disabilities",
    path: "/dashboard/disabilities",
    icon: <TbDisabled title="disabilities" fontSize={24} />,
  },
];

import {
  IoBagHandle,
  IoCart,
  IoPeopleSharp,
  IoPieChartSharp,
} from "react-icons/io5";

export const STATES = [
  {
    icon: <IoBagHandle fontSize={26} color="white" />,
    title: "total sales",
    number: 0,
  },
  {
    icon: <IoCart fontSize={26} color="white" />,
    title: "total expenses",
    number: 0,
  },
  {
    icon: <IoPeopleSharp fontSize={26} color="white" />,
    title: "total customers",
    number: 0,
  },
  {
    icon: <IoPieChartSharp fontSize={26} color="white" />,
    title: "total orders",
    number: 0,
  },
];
