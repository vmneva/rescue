const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {

  const togglePassword = () => {
    let input = document.getElementById("salasana");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  return (
      <div className='login'>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder='username'
            />
          </div>
          <div>
            <input
              id="salasana"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='password'
            />
            <input type="checkbox" onClick={togglePassword}/>Show Password
            <br></br>
            <br></br>
            <button type="submit">login</button>
          </div>
          </form>      
      </div>
    )
}
export default LoginForm