// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { sideBarManLinkData } from "../../utils";
import { SideBarLink } from "../SideBarLink/SideBarLink";
import { MdOutlineDashboard } from "react-icons/md";
export function SideBarMan() {
  let clazz =
    "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 rounded-lg dark:text-gray-400";

  let activeClazz =
    "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-gray-100";

  const changeActiveClazz = ({ isActive }) => {
    return isActive ? activeClazz : clazz;
  };
  return (
    <>
      <div className="fixed w-max h-[100%] overflow-y-auto scroll-none">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-max">
            <Link
              to="/manager"
              className="flex items-center justify-start mx-6 mt-10"
            >
              <MdOutlineDashboard className="text-white text-3xl" />
              <span className="text-white ml-4 text-2xl font-bold max-[1280px]:hidden">
                Dashboard
              </span>
            </Link>
            <nav className="mt-10 px-6">
              {sideBarManLinkData.map((data) => {
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
