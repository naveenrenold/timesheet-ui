import { Month } from "../Summary/Summary.tsx";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useEffect, useState } from "react";
import httpClient from "../../helperServices/httpClient";
import { Employee } from "../../model/employee";
import "./Report.css";

function Report() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  let months: MonthDetails[] = [];

  for (let i = 0; i < 4; i++) {
    months.push({
      startingDate: new Date(currentYear, currentMonth - i, 1, 5, 30),
      month: (currentMonth - i + 12) % 12,
    });
  }

  let [selectedMonthStartingDate, updateSelectedMonthStartingDate] = useState(
    months[0].startingDate.toISOString()
  );
  let [currentPage] = useState(1);
  let [totalPages] = useState(1);
  const [attendanceReportData, updateAttendanceReportData] = useState<
    AttendanceReport[]
  >([]);
  useEffect(() => {
    // function def
    const getAttendanceReport = (
      employeeId: string,
      fromDate: Date,
      toDate: Date
    ) => {
      let url = new URLSearchParams(
        `employeeId=${employeeId}&fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`
      );
      httpClient
        .get(httpClient.getAttendanceReport + url, true)
        .then((response) => {
          if (!response) {
            return;
          }
          let attendanceReport = response as AttendanceReport[];
          attendanceReport.forEach((val) => {
            val.statusUnknownDays =
              val.totalWorkingDays -
              val.noOfDaysPresent -
              val.noOfDaysWFH -
              val.noOfDaysLeave;
          });
          updateAttendanceReportData(attendanceReport);
        });
    };
    //Logic start
    const employee: Employee = JSON.parse(
      sessionStorage.getItem("employee") ?? ""
    );
    const fromDate = new Date(selectedMonthStartingDate);
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

    getAttendanceReport(employee.employeeId, fromDate, toDate);
  }, [selectedMonthStartingDate]);

  const tableHeadings: string[] = [
    "Employee Id",
    "Employee Name",
    "Working days",
    "WFO",
    "WFH",
    "Leave",
    "Status unknown",
    "Leaves remaining",
    "WFH remaining",
  ];

  // const tableValues: AttendanceReport[] = [
  //   {
  //     employeeId: "10000",
  //     employeeName: "Ravi Kumar",
  //     totalWorkingDays: 20,
  //     daysWorkedInOffice: 10,
  //     daysWorkedFromHome: 5,
  //     daysOnLeave: 5,
  //     leavesRemaining: 2,
  //     statusUnknownDays: 8,
  //     WFHRemaining: 2,
  //   },
  // ];

  return (
    <>
      <div className="flex center font-24 margin-top-5 bold">
        <div className="">Reports</div>
      </div>
      <div className="flex center margin-top-5">
        <label>
          Month :
          <select
            className="margin-left-5 text-align-center bgcolor-lightblue color-darkblue"
            onChange={(e) => {
              updateSelectedMonthStartingDate(e.target.value);
            }}
          >
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
      <div className="flex center">
        <table className="margin-top-15 table text-align-center">
          <tbody>
            <tr>
              {tableHeadings.map((heading, id) => {
                return (
                  <th className="th" key={id}>
                    {heading}
                  </th>
                );
              })}
            </tr>
            {attendanceReportData.map((tableValue, id) => {
              return (
                <tr key={id}>
                  <td className="td-report">{tableValue.employeeId}</td>
                  <td className="td-report">{tableValue.employeeName}</td>
                  <td className="td-report">{tableValue.totalWorkingDays}</td>
                  <td className="td-report">{tableValue.noOfDaysPresent}</td>
                  <td className="td-report">{tableValue.noOfDaysWFH}</td>
                  <td className="td-report">{tableValue.noOfDaysLeave}</td>
                  <td className="td-report">{tableValue.statusUnknownDays}</td>
                  <td className="td-report">{tableValue.remainingLeaves}</td>
                  <td className="td-report">{tableValue.remainingWFH}</td>
                </tr>
              );
            })}
            <tr className="margin-top-15 height-50">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <ArrowCircleLeftIcon />
              </td>
              <td>
                Page {currentPage} of {totalPages}
              </td>
              <td>
                <ArrowCircleRightIcon />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
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
  noOfDaysPresent: number;
  noOfDaysWFH: number;
  noOfDaysLeave: number;
  statusUnknownDays: number;
  remainingLeaves: number;
  remainingWFH: number;
}
