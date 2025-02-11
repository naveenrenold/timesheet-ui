import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FillAttendance.css";

function FillAttendance() {
  const navigate = useNavigate();
  let employeeId = "";
  let attendanceDate = "";
  let status = "1";

  useEffect(() => {
    // Retrieve employeeId from sessionStorage
    const storedEmployee = sessionStorage.getItem("employee");
    if (storedEmployee) {
      const employeeData = JSON.parse(storedEmployee);
      employeeId = employeeData.employeeId;
    }
  }, []);

  const handleSubmit = async () => {
    if (!employeeId || !attendanceDate || !status) {
      alert("Please fill all fields.");
      return;
    }

    const requestData = {
      employeeId,
      attendanceDate,
      status: parseInt(status),
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
          <select id="status" onChange={(e) => (status = e.target.value)}>
            <option value="1">Present</option>
            <option value="2">Leave</option>
            <option value="3">WFH</option>
            <option value="4">Holiday</option>
            <option value="5">Exceptional WFH</option>
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
