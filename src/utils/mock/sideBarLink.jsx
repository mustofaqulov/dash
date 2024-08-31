import {
  MdHome,
  MdMiscellaneousServices,
  MdPeople,
  MdGroups,
  MdNewspaper,
} from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { VscTable } from "react-icons/vsc";
import { RiTeamLine } from "react-icons/ri";
import { GiPipeOrgan } from "react-icons/gi";
import { FcAbout } from "react-icons/fc";
import { FaRegistered } from "react-icons/fa";

export const sideBarLinkData = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
    icon: <MdHome fontSize="25px" />,
  },
  {
    id: 2,
    title: "Kurslar",
    link: "/dashboard/courses",
    icon: <SiCoursera fontSize="22px" />,
  },
  {
    id: 3,
    title: "Xizmatlar",
    link: "/dashboard/services",
    icon: <MdMiscellaneousServices fontSize="26px" />,
  },
  {
    id: 4,
    title: "O'quvchilar",
    link: "/dashboard/tables",
    icon: <VscTable fontSize="23px" />,
  },
  {
    id: 5,
    title: "Xodimlar",
    link: "/dashboard/team",
    icon: <RiTeamLine fontSize="25px" />,
  },
  {
    id: 6,
    title: "Guruhlar",
    link: "/dashboard/groups",
    icon: <MdGroups fontSize="25px" />,
  },
  {
    id: 7,
    title: "Kadr yaratish",
    link: "/dashboard/staff-create",
    icon: <MdPeople fontSize="25px" />,
  },
  {
    id: 8,
    title: "Tumanlar",
    link: "/dashboard/regions",
    icon: <GiPipeOrgan fontSize="25px" />,
  },
  {
    id: 9,
    title: "Tashkilotlar",
    link: "/dashboard/organizations",
    icon: <GiPipeOrgan fontSize="25px" />,
  },
  {
    id: 10,
    title: "Biz haqimizda",
    link: "/dashboard/about-us",
    icon: <FcAbout fontSize="25px" color="#FF8C00" />,
  },
  {
    id: 11,
    title: "Yangiliklar",
    link: "/dashboard/news",
    icon: <MdNewspaper fontSize="25px" />,
  },
  {
    id: 12,
    title: "Register",
    link: "/dashboard/register",
    icon: <FaRegistered fontSize="25px" />,
  },
];
