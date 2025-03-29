import { Month } from "../Summary/summary";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useState } from "react";

function Report() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  let months: MonthDetails[] = [];

  const tableHeadings: string[] = [
    "EmployeeId",
    "EmployeeName",
    "Total Working days",
    "Days worked in office",
    "Days worked from home",
    "Days on leave",
    "Status unknown days",
    "Leaves remaining",
    "WFH remaining",
  ];

  const tableValues: AttendanceReport[] = [
    {
      employeeId: "10000",
      employeeName: "Ravi Kumar",
      totalWorkingDays: 20,
      daysWorkedInOffice: 10,
      daysWorkedFromHome: 5,
      daysOnLeave: 5,
      leavesRemaining: 2,
      statusUnknownDays: 8,
      WFHRemaining: 2,
    },
  ];

  for (let i = 0; i < 4; i++) {
    months.push({
      startingDate: new Date(currentYear, currentMonth - i, 1),
      month: (currentMonth - i + 12) % 12,
    });
  }
  let [currentPage, updateCurrentPage] = useState(1);
  let [totalPages, updateTotalPages] = useState(1);

  return (
    <>
      <div>
        <div>Reports</div>
      </div>
      <div>
        <label>
          Month :
          <select>
            {months.map((ele, id) => {
              return (
                <option key={id} value={ele.startingDate.toISOString()}>
                  {Month[ele.month]}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <table>
        <tr>
          {tableHeadings.map((heading, id) => {
            return <th key={id}>{heading}</th>;
          })}
        </tr>
        {tableValues.map((tableValue, id) => {
          return (
            <tr key={id}>
              <td>{tableValue.employeeId}</td>
              <td>{tableValue.employeeName}</td>
              <td>{tableValue.totalWorkingDays}</td>
              <td>{tableValue.daysWorkedInOffice}</td>
              <td>{tableValue.daysWorkedFromHome}</td>
              <td>{tableValue.daysOnLeave}</td>
              <td>{tableValue.statusUnknownDays}</td>
              <td>{tableValue.leavesRemaining}</td>
              <td>{tableValue.WFHRemaining}</td>
            </tr>
          );
        })}
        <tr>
          <td>
            <ArrowCircleLeftIcon />
          </td>
          <td>
            Page {currentPage} of {totalPages}
          </td>
          <td>
            <ArrowCircleRightIcon />
          </td>
        </tr>
      </table>
    </>
  );
}
export default Report;

export interface MonthDetails {
  startingDate: Date;
  month: Month;
}

export interface AttendanceReport {
  employeeId: string;
  employeeName: string;
  totalWorkingDays: number;
  daysWorkedInOffice: number;
  daysWorkedFromHome: number;
  daysOnLeave: number;
  statusUnknownDays: number;
  leavesRemaining: number;
  WFHRemaining: number;
}
