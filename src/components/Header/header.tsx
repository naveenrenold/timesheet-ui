import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("employee");
    onLogout();
    navigate("/");
  };

  return (
    <div className="header">
      <ol className="navbar flex mp0">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/fill-attendance">Fill Attendance</a>
        </li>
        <li>
          <a href="#">Generate Report</a>
        </li>
        <li>
          <a href="#">File Exception</a>
        </li>
        <li className="logout-button" onClick={handleLogout}>
          <a href="#">Logout</a>
        </li>
      </ol>
    </div>
  );
}

export default Header;
