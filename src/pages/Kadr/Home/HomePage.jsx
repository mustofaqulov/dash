import { apiClients } from "../../../services/APIClients";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function HomePage() {
  const { getFetch } = apiClients;
  const navigate = useNavigate();

  useEffect(() => {
    getFetch("course", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data.status == 401 && data.ok == false) {
        localStorage.clear();
        navigate("/auth-login");
      }
    });
  }, []);

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Homepage</h1>
    </>
  );
}
