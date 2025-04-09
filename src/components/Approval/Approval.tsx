import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useEffect, useState } from "react";
import httpClient from "../../helperServices/httpClient";
import { Employee } from "../../model/employee";

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
      <div className="flex margin-left-5 font-24">
        <div>Pending Approvals</div>
      </div>
      <table className="table">
        <tr className="tr">
          {tableHeaders.map((header, id) => (
            <th className="th" key={id}>
              {header}
            </th>
          ))}
        </tr>
        {tableData ? (
          tableData.map((approval) => (
            <tr className="tr" key={approval.exceptionId}>
              <td className="td">{approval.exceptionId}</td>
              <td className="td">{approval.employeeId}</td>
              <td className="td">{approval.employeeName}</td>
              <td className="td">{approval.exceptionDate}</td>
              <td className="td">{approval.reason}</td>
              <td className="td">
                <CheckCircleTwoToneIcon
                  onClick={() => {
                    approveException(approval.exceptionId, true);
                  }}
                ></CheckCircleTwoToneIcon>
                <CancelTwoToneIcon
                  className="margin-left-5"
                  onClick={() => {
                    approveException(approval.exceptionId, false);
                  }}
                ></CancelTwoToneIcon>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td rowSpan={6}>No Exception :)</td>
          </tr>
        )}
      </table>
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
