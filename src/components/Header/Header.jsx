import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/AuthService";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
export function Header({ headerLink }) {
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const [roleName, setRoleName] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("role") == "admin") {
      setRoleName("Admin");
    } else if (localStorage.getItem("role") == "modirator") {
      setRoleName("Modirator");
    } else if (localStorage.getItem("role") == "kadr") {
      setRoleName("Kadr");
    }
  }, []);
  const handleProfileModal = () => {
    setIsOpenProfileModal(!isOpenProfileModal);
  };

  return (
    <div className="w-[100%]">
      <div className="flex items-center justify-between bg-gray-800 w-[100%] p-4">
        <div className="px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link
              to={headerLink}
              className="mb-2 text-xl font-extrabold text-white md:mb-0 text-center capitalize"
            >
              raqamlashtirish <br /> markazi{" "}
              <span className="text-gray-400">MCHJ</span>
            </Link>
          </div>
        </div>

        <div className=" relative">
          <div className="flex gap-4">
            <div className="text-white text-2xl font-bold">{roleName}</div>
            <div className="gap-4 flex flex-col justify-center items-center relative">
              <button className="text-slate-400" onClick={handleProfileModal}>
                <FaRegCircleUser className="text-3xl" />
              </button>
              {isOpenProfileModal ? (
                <div className="absolute w-[220px] bg-gray-800 top-[40px] right-0 z-[150] border rounded-lg border-slate-600">
                  <ul className="flex flex-col gap-y-2 py-4 text-gray-400">
                    <li className="hover:text-blue-600 transition px-4 cursor-pointer">
                      <Link
                        to="/auth-login"
                        onClick={authService.logout}
                        className="flex items-center gap-x-2 text-lg font-medium capitalize"
                      >
                        <HiOutlineLogout />
                        sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                []
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  headerLink: PropTypes.node,
};
