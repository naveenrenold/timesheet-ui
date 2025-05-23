import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useEffect, useState } from "react";
import httpClient from "../../helperServices/httpClient";
import { Employee } from "../../model/employee";
import "./Approval.css";

function Approval() {
  const tableHeaders = [
    "ExceptionId",
    "EmployeeId",
    "EmployeeName",
    "ExceptionDate",
    "Reason",
    "Approval/Reject",
  ];
  let [tableData, updateTableDate] = useState<Approvals[]>([]);

  useEffect(() => {
    const employee: Employee = JSON.parse(sessionStorage.getItem("employee")!);
    var queryParams = new URLSearchParams(`employeeId=${employee.employeeId}`);
    httpClient
      .get(httpClient.getException + queryParams, true)
      .then((response) => {
        updateTableDate(response as Approvals[]);
      })
      .catch((error) => {
        console.log(error);
        alert("Error fetching exception list");
      });
  }, []);

  const approveException = async (
    exceptionId: string,
    approvalStatus: boolean
  ) => {
    let requestBody = {
      exceptionId: exceptionId,
      approvalStatus: approvalStatus,
    };
    let response = await httpClient.post(
      httpClient.approveException,
      requestBody,
      true
    );
    if (response.message) {
      updateTableDate(
        tableData.filter((item) => item.exceptionId !== exceptionId)
      );
      alert(response.message);
    }
  };
  return (
    <>
      <div className="flex margin-left-5 font-24 margint-top-5">
        <div>Pending Approvals:</div>
      </div>
      <div className="flex center">
        <table className="table margin-top-15 width-100">
          <tr className="tr">
            {tableHeaders.map((header, id) => (
              <th className="th" key={id}>
                {header}
              </th>
            ))}
          </tr>
          {tableData.length > 0 ? (
            tableData.map((approval) => (
              <tr className="tr" key={approval.exceptionId}>
                <td className="td-report">{approval.exceptionId}</td>
                <td className="td-report">{approval.employeeId}</td>
                <td className="td-report">{approval.employeeName}</td>
                <td className="td-report">{approval.exceptionDate}</td>
                <td className="td-report">{approval.reason}</td>
                <td className="td-report">
                  <CheckCircleTwoToneIcon
                    className="color-green"
                    onClick={() => {
                      approveException(approval.exceptionId, true);
                    }}
                  ></CheckCircleTwoToneIcon>
                  <CancelTwoToneIcon
                    className="margin-left-5 color-red"
                    onClick={() => {
                      approveException(approval.exceptionId, false);
                    }}
                  ></CancelTwoToneIcon>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-align-center font-24">
              <td colSpan={6}>No Pending Exceptions :)</td>
            </tr>
          )}
        </table>
      </div>
    </>
  );
}
export default Approval;

export interface Approvals {
  exceptionId: string;
  employeeId: string;
  employeeName: string;
  exceptionDate: string;
  reason: string;
  status: string;
}
