import "./Header.css";
function Header() {
  return (
    <>
      <div>
        <ol className="navbar flex mp0">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Fill TimeSheet</a>
          </li>
          <li>
            <a href="#">Generate Report</a>
          </li>
          <li>
            <a href="#">File Exception</a>
          </li>
        </ol>
      </div>
    </>
  );
}

export default Header;
