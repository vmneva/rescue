import {   useState } from 'react'
import { ReactComponent as InvisibleIcon } from '../icons/invisible.svg'
import { ReactComponent as VisibleIcon } from '../icons/visible.svg'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {

  const [isVisible, setIsVisible] = useState(false)

  const togglePassword = () => {
    let input = document.getElementById("salasana")
    if (input.type === "password") {
      input.type = "text"
    } else {
      input.type = "password"
    }
    setIsVisible(!isVisible)
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
              id="salasana"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='salasana'
            />
            <br></br>
          </div>
          <button type="submit" className="login">kirjaudu</button>
          </form>   
          {!isVisible && 
            <button onClick={togglePassword} className='invisible'>
              <InvisibleIcon />
          </button>
          }
          {isVisible && 
          <button onClick={togglePassword} className='visible'>
              <VisibleIcon />
          </button>
          } 
      </div>
    )
}
export default LoginForm