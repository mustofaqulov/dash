import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClients } from "../../../services/APIClients";

export function HomePageMan() {
  const [groupData, setGroupData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    apiClients
      .getFetch("group", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((data) => {
        if (data.status == 401 && data.ok == false) {
          localStorage.clear();
          navigate("/auth-login");
        }
        setGroupData(data.results.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Guruhlar</h1>
      <div className="grid grid-cols-2 gap-8">
        {groupData?.map((group) => {
          const { id, title } = group;
          return (
            <Link
              to={`/manager/attendances/${id}`}
              key={id}
              className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg cursor-pointer
              hover:scale-[1.007] transition"
            >
              <h4 className="text-white text-2xl font-medium capitalize max-[640px]:text-[18px]">
                {title}
              </h4>
              <div className="flex items-center gap-x-2"></div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
