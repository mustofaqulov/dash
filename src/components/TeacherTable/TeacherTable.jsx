import PropTypes from "prop-types";
export function TeacherTable({
  teacherTableHeadData,
  filterTeacherData,
  startSlice,
  endSlice,
}) {
  return (
    <table className="w-full text-center text-white">
      <thead>
        <tr>
          {teacherTableHeadData.map((header) => {
            const { Header, accessor } = header;
            return (
              <th
                key={accessor}
                scope="col"
                className="border border-slate-500 pt-4 pb-4 capitalize bg-"
              >
                {Header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {filterTeacherData.slice(startSlice, endSlice).map((body) => {
          const { id, full_name, phone } = body;
          return (
            <tr key={id}>
              <td className="border border-slate-500 pt-4 pb-4 w-[5%]">{id}</td>
              <td className="border border-slate-500 pt-4 pb-4 w-[35%]">
                {full_name}
              </td>
              <td className="border border-slate-500 pt-4 pb-4 w-[50%]">{phone}</td>
              <td className="border border-slate-500 pt-4 pb-4 w-[10%]">
                <input type="checkbox" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TeacherTable.propTypes = {
  teacherTableHeadData: PropTypes.array,
  filterTeacherData: PropTypes.array,
  startSlice: PropTypes.number,
  endSlice: PropTypes.number,
};
