// import "./Login.css";

// function Login() {
//   return (
//     <div className="login-container">
//       <label>Login</label>
//       <div>
//         <label>
//           UserName:
//           <input type="text" title="username" />
//         </label>
//       </div>
//       <div>
//         <label>
//           Password:
//           <input type="password" title="password" />
//         </label>
//       </div>
//       <div>
//         <button type="submit">Login</button>
//       </div>
//     </div>
//   );
// }

// export default Login;
import "./Login.css";

function Login() {
  let employeeId = "";
  let password = "";

  const handleLogin = async () => {
    if (!employeeId || !password) {
      alert("Please enter Employee ID and Password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Login successful! Employee Name: ${data.name}`);
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <label>Login</label>
      <div>
        <label>
          Employee ID:
          <input
            type="text"
            onChange={(e) => (employeeId = e.target.value)}  // Updates employeeId directly
            placeholder="Enter Employee ID"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => (password = e.target.value)}  // Updates password directly
            placeholder="Enter Password"
          />
        </label>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
