import { useState, useEffect } from "react";
import {
  Input,
  Pagination,
  StudentTables,
  PromoComponent,
  Modal,
} from "../../../components";
// import userTableData from "../../data/user-data-tables.json";
import { userTableHeadData, studentInpData } from "../../../utils";
import { HiSearch, HiPlus } from "react-icons/hi";
import { apiClients } from "../../../services/APIClients";
import { useForm } from "react-hook-form";

export function StudentPage() {
  const [searchStudent, setSearchStudent] = useState("");
  const [filterStudentData, setFilterStudentData] = useState(null);
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [organData, setOrganData] = useState();
  const [groupData, setGroupData] = useState(null);
  const [apiData, setApiData] = useState(null);

  const [refreshCount, setRefreshCount] = useState(0);

  const onSubmit = (studentData) => {
    apiClients
      .postFetch("studentApi/", studentData, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((data) => {
        if (data) {
          setRefreshCount(refreshCount + 1);
        }
      });
  };

  useEffect(() => {
    apiClients
      .getFetch("studentApi", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((data) => {
        setApiData(data.reverse());
        setFilterStudentData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    apiClients
      .getFetch("organization", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((data) => {
        setOrganData(data.results.reverse());
      })
      .catch((err) => console.log(err));

    apiClients
      .getFetch("group", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((data) => {
        setGroupData(data.results.reverse());
      })
      .catch((err) => console.log(err));
  }, [refreshCount]);
  useEffect(() => {
    setFilterStudentData(
      apiData?.filter((data) => {
        if (
          data.full_name.toLowerCase().includes(searchStudent.toLowerCase())
        ) {
          return data;
        } else {
          return null;
        }
      })
    );
  }, [searchStudent]);

  const previousPage = () => {
    if (endSlice <= 10) {
      setStartSlice(0);
      setEndSlice(10);
      setPageCount(1);
    } else {
      setStartSlice(startSlice - 10);
      setEndSlice(endSlice - 10);
      setPageCount(pageCount - 1);
    }
  };
  const nextPage = () => {
    if (endSlice >= filterStudentData?.length) {
      setStartSlice(filterStudentData?.length - 10);
      setEndSlice(filterStudentData?.length);
      setPageCount(Math.ceil(filterStudentData?.length / 10));
    } else {
      setStartSlice(startSlice + 10);
      setEndSlice(endSlice + 10);
      setPageCount(pageCount + 1);
    }
  };

  const gotoPrevPage = () => {
    setStartSlice(0);
    setEndSlice(10);
    setPageCount(1);
  };
  const gotoNextPage = () => {
    setStartSlice(filterStudentData?.length - 10);
    setEndSlice(filterStudentData?.length);
    setPageCount(Math.ceil(filterStudentData?.length / 10));
  };
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <h1 className="text-4xl text-white font-bold">
          Bizda o&apos;qiyotgan o&apos;quvchilar
        </h1>
        <PromoComponent
          title="Studentlar"
          buttonTitle="o'quvchi"
          onClick={() => setIsOpen(true)}
        />
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow bg-gray-800 flex flex-col gap-y-2 items-center">
          <div className="flex justify-between w-full">
            <div className=" w-[440px] flex items-center pl-4  gap-x-2">
              <HiSearch className="text-slate-500 text-2xl mt-3" />
              <Input
                type="search"
                classNames="bg-transparent outline-none focus:outline-none w-full text-white pt-2 pb-2"
                placeholder="Search by..."
                onChange={(e) => setSearchStudent(e.target.value)}
              />
            </div>
          </div>
          <StudentTables
            studentTableHead={userTableHeadData}
            studentTableData={filterStudentData}
            startSlice={startSlice}
            endSlice={endSlice}
          />
          <Pagination
            gotoNextPage={gotoNextPage}
            gotoPrevPage={gotoPrevPage}
            nextPage={nextPage}
            previousPage={previousPage}
            pageCount={pageCount}
            pageOptions={filterStudentData}
            pageOptionCount={10}
          />
        </div>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Modal
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
            register={register}
            onSubmit={onSubmit}
            promoHeaderTitle="O'quvchi qo'shish"
            inputData={studentInpData}
            buttonTitle="Qo'shish"
            buttonIcon={<HiPlus />}
            organData={organData}
            groupData={groupData}
          />
        </div>
      ) : (
        []
      )}
    </>
  );
}
