import PropTypes from "prop-types";
// import { apiClients } from "../../../services/APIClients";
export function StudentTable({
  studentTableHead,
  studentTableData,
  startSlice,
  endSlice,
}) {
  return (
    <table className="w-full text-center text-white">
      <thead>
        <tr>
          {studentTableHead.map((header) => {
            const { Header, accessor } = header;
            return (
              <th
                key={accessor}
                scope="col"
                className="border-y border-slate-500 pt-4 pb-4 pl-2 capitalize"
              >
                {Header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {studentTableData?.slice(startSlice, endSlice).map((body) => {
          const { id, full_name, group, organization, phone } = body;

          return (
            <tr key={id}>
              <td className="border-y border-slate-500 pt-4 pb-4">{id}</td>
              <td className="border-y border-slate-500 pt-4 pb-4">
                {full_name}
              </td>
              <td className="border-y border-slate-500 pt-4 pb-4">
                {organization}
              </td>
              <td className="border-y border-slate-500 pt-4 pb-4">{group}</td>
              <td className="border-y border-slate-500 pt-4 pb-4">{phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

StudentTable.propTypes = {
  studentTableHead: PropTypes.array,
  studentTableData: PropTypes.array,
  startSlice: PropTypes.number,
  endSlice: PropTypes.number,
};
