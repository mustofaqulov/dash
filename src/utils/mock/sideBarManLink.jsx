import { MdHome, MdRoomService } from "react-icons/md";
import { VscTable } from "react-icons/vsc";

export const sideBarManLinkData = [
  {
    id: 1,
    title: "Home",
    link: "/manager",
    icon: <MdHome fontSize="25px" />,
  },
  {
    id: 2,
    title: "Students",
    link: "/manager/students",
    icon: <VscTable fontSize="23px" />,
  },
  {
    id: 3,
    title: "Teachers",
    link: "/manager/teachers",
    icon: <VscTable fontSize="23px" />,
  },
  {
    id: 4,
    title: "Room",
    link: "/manager/rooms",
    icon: <MdRoomService />,
  },
];
