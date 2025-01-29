import "./Login.css";

function Login() {
  return (
    <>
      <div>TimeSheet</div>
      <div>
        <label>
          Login:
          <input type="text" title="login" />
        </label>
      </div>
      <div>
        <div>
          <label>
            UserName:
            <input type="text" title="username" />
          </label>
        </div>
      </div>
      <div>
        <div>
          <label>
            Password:
            <input type="text" title="password" />
          </label>
        </div>
      </div>
      <div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </div>
    </>
  );
}
export default Login;
