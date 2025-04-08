import { TextField, Select, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "./WFHException.css";
import { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import httpClient from "../../helperServices/httpClient";

function WFHException() {
  const employeeData = sessionStorage.getItem("employee");
  const employeeDetails = employeeData ? JSON.parse(employeeData) : null;

  let [exceptionDate, updateExceptionDate] = useState(moment(new Date()));
  let [reason, updateReason] = useState("");
  let [approvalManagerId, updateApprovalManagerId] = useState("");

  const addException = async (
    exceptionDate: Moment,
    reason: string,
    approvalManagerId: string
  ) => {
    if (!validateException(exceptionDate, approvalManagerId)) {
      return;
    }
    let requestBody = {
      employeeId: employeeDetails["employeeId"].toString(),
      exceptionDate,
      reason,
      reportingToEmployeeId: approvalManagerId,
    };
    let response = await httpClient.post(httpClient.addException, requestBody);
    console.log(response);
  };
  const validateException = (
    exceptionDate: Moment,
    approvalManagerId: string
  ) => {
    if (!exceptionDate) {
      alert("Exception Date is required");
      return false;
    }
    if (!approvalManagerId) {
      alert("Approval Manager Id is required");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="wfh-exception-container">
        <div className="fileexp">File WFH Exception</div>

        <div className="common">
          <label> Exception Date :</label>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              defaultValue={exceptionDate}
              maxDate={moment(new Date())}
              onChange={(e) => {
                updateExceptionDate(e?.add(330, "minutes")!);
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="common">
          <label>Reason :</label>
          <TextField
            className="MuiTextField-root"
            onChange={(e) => {
              updateReason(e.target.value);
            }}
          />
        </div>

        <div className="common">
          <label>Approval Manager Id :</label>
          <TextField
            className="MuiTextField-root"
            onChange={(e) => {
              updateApprovalManagerId(e.target.value);
            }}
          />
        </div>

        <div className="common">
          <button
            className="button"
            onClick={(e) => {
              addException(exceptionDate, reason, approvalManagerId);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default WFHException;
