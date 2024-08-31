import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiClients } from "../../../services/APIClients";
import { Button } from "../../../components";
import { MdDelete } from "react-icons/md";
export function NewsSinglePage() {
  const { getFetch, deleteFetch } = apiClients;
  const { newsId } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [newsPhotoData, setNewsPhotoData] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const deleteNews = (id) => {
    deleteFetch(`news`, id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data.status === 204) {
        setRefreshCount(refreshCount + id);
      }
    });
  };
  useEffect(() => {
    getFetch(`news/${newsId}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setNewsData(data);
    });
  }, [refreshCount]);
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Yangilik</h1>
      <div>
        <h3 className="text-2xl text-white font-bold mb-8">
          {newsData?.title}
        </h3>
        <p className="text-xl text-slate-300 mb-8">{newsData?.descriptions}</p>
        {/* <img src={newsPhotoData?.image} alt="" /> */}
      </div>
      <div>
        <Button
          icon={<MdDelete />}
          title="o'chirish"
          onClick={() => deleteNews(newsId)}
          classNames={
            "bg-red-600 hover:bg-white hover:text-red-600 text-white transition flex items-center justify-center gap-x-2 py-2 px-4 rounded-lg capitalize"
          }
        />
      </div>
    </>
  );
}
