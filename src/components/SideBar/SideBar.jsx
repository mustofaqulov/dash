// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { sideBarLinkData } from "../../utils";
import { SideBarLink } from "../SideBarLink/SideBarLink";
import { MdOutlineDashboard } from "react-icons/md";
export function SideBar() {
  let clazz =
    "flex items-center p-2 my-6 transition-colors hover:text-white hover:bg-gray-600 duration-200   rounded-lg text-gray-400 w-[max-content]";

  let activeClazz =
    "flex items-center p-2 my-6 transition-colors hover:text-white hover:bg-gray-600 duration-200  rounded-lg bg-gray-100 bg-gray-600 text-gray-100 w-[max-content]";

  const changeActiveClazz = ({ isActive }) => {
    return isActive ? activeClazz : clazz;
  };
  return (
    <>
      <div className="fixed w-max h-[100%] overflow-y-auto scroll-none">
        <div className="flex flex-col ">
          <div className="w-max">
            <Link
              to="/dashboard"
              className="flex items-center justify-start mx-6 mt-10"
            >
              <MdOutlineDashboard className="text-white text-3xl" />
              <span className="text-white ml-4 text-2xl font-bold max-[1280px]:hidden">
                Dashboard
              </span>
            </Link>
            <nav className="mt-10 px-6">
              {sideBarLinkData.map((data) => {
                const { id, link, title, icon } = data;
                return (
                  <SideBarLink
                    key={id}
                    link={link}
                    title={title}
                    icon={icon}
                    changeActiveClazz={changeActiveClazz}
                  />
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
