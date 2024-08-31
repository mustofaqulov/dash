import { useEffect, useState } from "react";
import { SideBar, Header, SideBarKadr, SideBarMan } from "../components";
import { Outlet } from "react-router-dom";
export function Layout() {
  const [sideBar, setSideBar] = useState(null);
  const [headerLink, setHeaderLink] = useState("");
  useEffect(() => {
    if (localStorage.getItem("role") == "admin") {
      setSideBar(<SideBar />);
      setHeaderLink("/dashboard");
    } else if (localStorage.getItem("role") == "kadr") {
      setSideBar(<SideBarKadr />);
      setHeaderLink("/kadr");
    } else if (localStorage.getItem("role") == "modirator") {
      setSideBar(<SideBarMan />);
      setHeaderLink("/manager");
    }
  }, []);
  return (
    <div className="flex items-start fixed w-full">
      <div className="w-[20%] h-[100vh] bg-gray-800">{sideBar}</div>
      <div className="w-[100%] h-[100vh] flex flex-col justify-between overflow-x-hidden scroll-none">
        <Header headerLink={headerLink} />
        <section className="p-7 grow bg-gray-600 overflow-x-auto">
          <Outlet />
        </section>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
