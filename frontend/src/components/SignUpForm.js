import { useState } from 'react' 
import userService from '../services/users'
import { ReactComponent as InvisibleIcon } from '../icons/invisible.svg'
import { ReactComponent as VisibleIcon } from '../icons/visible.svg'

const SignUpForm = ({
    users,
    setUsers,
    setInfoMessage,
    setErrorMessage
    }) => {
      
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleNameAdd = (event) => {
        setName(event.target.value)
    }
    const handleUsernameAdd = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordAdd = (event) => {
        setPassword(event.target.value)
    }

    const addUser = async (event) => {
      event.preventDefault()
      const type = "client"
      const animals = []
      //is there a digit in password
      const hasNumber = /\d/.test(password)
      if (!hasNumber) {
        setErrorMessage('Salasanan sisällettävä ainakin yksi numero.')
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000)
      return
      }

      try {
        const newUser = await userService.create({
          name, username, password, type, animals
        })
        setInfoMessage('Uusi käyttäjä luotu. Kirjaudu sisään!')
        setTimeout(() => {
        setInfoMessage(null)
        }, 3000)
        setUsers(users.concat(newUser))
        }
        catch (exception) {
          setErrorMessage('Käyttäjänimi varattu!')
          setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        }
        setName('')
        setUsername('')
        setPassword('')
    }

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
      <div className='signupForm'>
        <h2>Uusi täällä? Rekisteröidy!</h2>
        <form >
          <div>
            <input
              type="text"
              value={name}
              onChange={handleNameAdd}
              placeholder='nimi'
            />
          </div>
          <div>
            <input
              type="text"
              value={username}
              onChange={handleUsernameAdd}
              placeholder='käyttäjänimi'
            />
          </div>
          <div>
            <input
            id="salasana"
              type="password"
              value={password}
              onChange={handlePasswordAdd}
              placeholder='salasana'
            />
            <br></br>
            <button onClick={addUser} className='signup'>rekisteröidy</button> 
          </div>
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
export default SignUpForm