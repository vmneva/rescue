import { ReactComponent as InvisibleIcon } from '../icons/invisible.svg'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {

  const togglePassword = () => {
    let input = document.getElementById("salasana1");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  return (
      <div className='loginForm'>
        <h2>Hauska nähdä sinua taas!</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder='käyttäjänimi'
            />
          </div>
          <div>
            <input
              id="salasana1"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='salasana'
            />
            <br></br>
          </div>
          <button type="submit" className="login">kirjaudu</button>
          </form>    
          <button onClick={togglePassword} className='invisible'>
              <InvisibleIcon />
            </button>
      </div>
    )
}
export default LoginForm