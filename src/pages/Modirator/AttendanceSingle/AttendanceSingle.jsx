import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClients } from "../../../services/APIClients";
import { AttendanceCard, Button, Modal } from "../../../components";
import moment from "moment";
import { studentInpData } from "../../../utils";
import { HiPlus, HiTrash } from "react-icons/hi";
import { useForm } from "react-hook-form";
export function AttendanceSingle() {
  const { getFetch, putFetch, deleteFetch } = apiClients;
  const { studentId } = useParams();

  const [studentData, setStudentData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [regionName, setRegionName] = useState(null);
  const [organizationName, setOrganizationName] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [groupStartDate, setGroupStartDate] = useState(null);
  const [groupEndDate, setGroupEndDate] = useState(null);
  const [datesData, setDatesData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [organData, setOrganData] = useState();
  const [groupData, setGroupData] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const onSubmit = (data) => {
    putFetch("studentApiId", studentId, data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((student) => {
      if (student) {
        setRefreshCount(refreshCount + studentId);
      }
    });
    setIsOpen(false);
  };

  const deleteStudent = (id) => {
    deleteFetch("studentApiId", id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data.status === 204) {
        setRefreshCount(refreshCount + id);
      }
    });
  };
  useEffect(() => {
    getFetch(`studentApiId/${studentId}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((student) => {
      setStudentData(student);
    });
    getFetch("organization", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setOrganData(data.results.reverse());
      })
      .catch((err) => console.log(err));
    getFetch("group", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setGroupData(data.results.reverse());
      })
      .catch((err) => console.log(err));
  }, [refreshCount]);

  useEffect(() => {
    getFetch(`groupStudentApi/${studentData?.group[0]}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setAttendanceData(
        data.attendance
          .filter((attendance) => attendance.student == studentId)
          .reverse()
      );
    });

    getFetch(`group/${studentData?.group[0]}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setGroupStartDate(data.start_date);
      setGroupEndDate(data.end_date);
      setGroupName(data.title);
    });
    getFetch(`organization/${studentData?.organization}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setOrganizationName(data.title);
      getFetch(`region/${data.region}`, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }).then((data) => {
        setRegionName(data.title);
      });
    });
  }, [studentData]);

  useEffect(() => {
    let current = moment("2024-06-12");
    const end = moment(groupEndDate);
    const datesArray = [];

    while (current <= end) {
      datesArray.push(current.format("YYYY-MM-DD"));
      current = current.add(1, "days");
    }
    setDatesData(datesArray.filter((item) => item != "Sunday"));
  }, [groupStartDate, groupEndDate]);

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8 ">
        Talaba haqida ma&apos;lumotlar
      </h1>
      <div className="flex flex-col gap-y-[30px]">
        <div className="grid grid-cols-2 text-white gap-y-6 gap-x-4">
          <div className="flex flex-col ">
            <span className="text-slate-400">Ism familiyasi</span>
            <strong className="text-slate-300 text-[25px]">
              {studentData?.full_name}
            </strong>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400">Telefon raqami</span>
            <strong className="text-slate-300 text-[25px]">
              {studentData?.phone}
            </strong>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400">Ish joyi</span>
            <strong className="text-slate-300 text-[25px]">
              {regionName} {organizationName}
            </strong>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400">Guruhi</span>
            <strong className="text-slate-300 text-[25px]">{groupName}</strong>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-4 mt-[50px]">
        <Button
          onClick={() => setIsOpen(true)}
          title="Yangilash"
          icon={<HiPlus />}
          classNames="bg-green-500 hover:bg-green-600 text-white p-2 flex items-center justify-center gap-2"
        />
        <Button
          onClick={() => deleteStudent(studentId)}
          title="O'chirish"
          icon={<HiTrash />}
          classNames="bg-red-500 hover:bg-red-600 text-white p-2 flex items-center justify-center gap-2"
        />
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
            buttonTitle="Yangilash"
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
