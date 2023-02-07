const Login = ({
  handleLogin,
  usernameChange,
  passwordChange,
  password,
  username,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={usernameChange}
            name="Username"
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={passwordChange}
            name="Password"
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
