import PropTypes from "prop-types";
import { apiClients } from "../../services/APIClients";
import { useState, useEffect } from "react";
export function AttendanceCard({ attendanceData }) {
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  useEffect(() => {
    apiClients
      .getFetch(`attendanceLevel/${attendanceData.level}`, {
        Authorization: `Bearer ${localStorage.getItem("accessTokenManager")}`,
      })
      .then((data) => {
        setAttendanceStatus(data.title);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
        <div>{new Date(attendanceData.created).toLocaleDateString()}</div>
        <div className="font-bold text-lg capitalize">{attendanceStatus}</div>
        <div>{new Date(attendanceData.created).toLocaleTimeString()}</div>
      </div>
    </>
  );
}

AttendanceCard.propTypes = {
  attendanceData: PropTypes.object,
};
