const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {

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
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='password'
            />
            <br></br>
            <br></br>
            <button type="submit">login</button>
          </div>
          </form>      
      </div>
    )
}
export default LoginForm