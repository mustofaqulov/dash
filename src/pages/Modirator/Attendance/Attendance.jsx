import { useState, useEffect } from "react";
import { apiClients } from "../../../services/APIClients";
import { useParams } from "react-router-dom";
import { AttendanceStudentTr, Button } from "../../../components";
import moment from "moment";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
export function Attendance() {
  const { getFetch, postFetch, putFetch } = apiClients;

  const [studentData, setStudentData] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  const [level, setLevel] = useState(null);
  const [groupStartDate, setGroupStartDate] = useState(null);
  const [groupEndDate, setGroupEndDate] = useState(null);
  const [datesData, setDatesData] = useState(null);
  const [startSliceNum, setStartSliceNum] = useState(0);
  const [endSliceNum, setEndSliceNum] = useState(6);
  const [attendanceData, setAttendanceData] = useState(null);
  const [studentsId, setStudentId] = useState(null);

  const { groupId } = useParams();

  useEffect(() => {
    getFetch(`groupStudentApi/${groupId}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setStudentData(data.student);
        setAttendanceData(
          data.attendance.filter((attendance) => {
            if (
              new Date(attendance.created).toLocaleDateString() ==
              new Date().toLocaleDateString()
            ) {
              return attendance;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    getFetch(`group/${groupId}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setGroupName(data.title);
        setGroupStartDate(data.start_date);
        setGroupEndDate(data.end_date);
        getFetch(`course/${data.course}`, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }).then((data) => {
          setCourseName(data.title);
        });
        getFetch(`teacher/${data.teacher[0]}`, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }).then((data) => {
          setTeacherName(data.full_name);
        });
      })
      .catch((err) => {
        return err;
      });
    getFetch("attendanceLevel", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setLevel(data.results);
    });
  }, []);

  useEffect(() => {
    let current = moment(groupStartDate);
    const end = moment(groupEndDate);
    const datesArray = [];
    while (current <= end) {
      datesArray.push(current.format("llll"));
      current = current.add(1, "days");
    }
    setDatesData(datesArray.filter((item) => item.slice(0, 3) != "Sun"));
  }, [groupStartDate, groupEndDate]);
  const onSubmitLevel = (levelId, studentId) => {
    // console.log(attendanceData);
    if (levelId != 3 && attendanceData.length == 0) {
      postFetch(
        "attendance/",
        {
          level: levelId,
          student: studentId,
          group: groupId,
        },
        {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      ).then((data) => {
        console.log(data);
      });
    } else if (levelId != 3) {
      putFetch(
        `attendance`,
        attendanceData.find((attendance) => attendance.id).id,
        {
          student: studentId,
          group: groupId,
          level: levelId,
        },
        {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      ).then((data) => {
        console.log(data);
      });
    }
  };

  const nextWeek = () => {
    if (endSliceNum < datesData?.length) {
      setStartSliceNum(startSliceNum + 6);
      setEndSliceNum(endSliceNum + 6);
    }
  };
  const prevWeek = () => {
    if (endSliceNum > 7) {
      setStartSliceNum(startSliceNum - 6);
      setEndSliceNum(endSliceNum - 6);
    }
  };
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">
        Yo&apos;qlama bo&apos;limi
      </h1>
      <div className="flex flex-col gap-y-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-y-2">
            <span className="text-slate-300 text-[20px]">Guruh</span>
            <h2 className="text-white text-[26px] font-bold">{groupName}</h2>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-slate-300 text-[20px]">O&apos;qituvchi</span>
            <h2 className="text-white text-[26px] font-bold">{teacherName}</h2>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-slate-300 text-[20px]">Fan nomi</span>
            <h2 className="text-white text-[26px] font-bold">{courseName}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex justify-between">
            <span className="text-slate-300 text-[20px]">
              Kunlik yo&apos;qlamasi
            </span>
            <div className="flex gap-x-2">
              <Button
                icon={<HiArrowNarrowLeft />}
                classNames="w-[30px] text-white border rounded-lg flex items-center justify-center"
                onClick={prevWeek}
              />
              <Button
                icon={<HiArrowNarrowRight />}
                classNames="w-[30px] text-white border rounded-lg flex items-center justify-center"
                onClick={nextWeek}
              />
            </div>
          </div>
          <div>
            <table className="w-full text-center text-black bg-white ">
              <thead>
                <tr className="border-slate-500 border-b-4">
                  <th className="p-2">O&apos;quvchi ism familiyasi</th>
                  {datesData
                    ?.slice(startSliceNum, endSliceNum)
                    .map((date, index) => {
                      return (
                        <th className="p-2" key={index}>
                          {date.slice(5, 17)}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody className="relative">
                {studentData?.map((studentData) => {
                  return (
                    <AttendanceStudentTr
                      key={studentData.id}
                      studentData={studentData}
                      level={level}
                      onSubmitLevel={onSubmitLevel}
                      dates={datesData}
                      startSliceNum={startSliceNum}
                      endSliceNum={endSliceNum}
                      setStudentId={setStudentId}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
