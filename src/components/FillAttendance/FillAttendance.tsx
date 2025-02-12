// 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FillAttendance.css";

function FillAttendance() {
  const navigate = useNavigate();
  let employeeId = "";
  let attendanceDate = "";
  let statusId = "";
  let leaveType = "";

  useEffect(() => {
    // Retrieve employeeId from sessionStorage
    const storedEmployee = sessionStorage.getItem("employee");
    if (storedEmployee) {
      const employeeData = JSON.parse(storedEmployee);
      employeeId = employeeData.employeeId;
    }
  }, []);

  const handleSubmit = async () => {
    if (!employeeId || !attendanceDate || !statusId) {
      alert("Please fill all fields.");
      return;
    }

    const requestData = {
      employeeId,
      attendanceDate,
      statusId,
      leaveType, // Include leaveType if Leave is selected
    };

    try {
      const response = await fetch("http://localhost:5000/api/attendance/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Attendance submitted successfully!");
        navigate("/home");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to submit attendance.");
      }
    } catch (err) {
      alert("Something went wrong. Try again later.");
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    statusId = e.target.value;
    // Show or hide the leave options based on selected status
    const leaveOptions = document.getElementById("leaveOptions");
    if (leaveOptions) {
      if (statusId === "3") {
        leaveOptions.style.display = "block";
      } else {
        leaveOptions.style.display = "none";
      }
    }
  };

  const handleLeaveTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    leaveType = e.target.value;
  };

  return (
    <div className="fill-attendance-container">
      <h2>Fill Attendance</h2>
      <div className="attendance-form">
        <div className="form-group">
          <label htmlFor="attendanceDate">Date</label>
          <input
            type="date"
            id="attendanceDate"
            onChange={(e) => (attendanceDate = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Attendance Status</label>
          <select id="status" onChange={handleStatusChange}>
            <option value="1">Present</option>
            <option value="2">WFH</option>
            <option value="3">Leave</option>
          </select>
        </div>

        {/* Conditional Leave Type Dropdown */}
        <div className="form-group" id="leaveOptions" style={{ display: "none" }}>
          <label htmlFor="status">Leave Type</label><br></br>
          <select id="status" onChange={handleLeaveTypeChange}>
            <option value="3">Earned</option>
            <option value="4">Sick</option>
            <option value="5">Annual</option>
            <option value="6">Maternity</option>
            <option value="7">Parental</option>
          </select>
        </div>

        <div className="form-group">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default FillAttendance;
