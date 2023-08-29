import { useState, useEffect, useRef } from 'react'
import './index.css'

import Animals from './components/Animals'
import AnimalForm from './components/AnimalForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

import animalService from './services/animals'
import loginService from './services/login'
import SignUpForm from './components/SignUpForm'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import petImg from './pictures/pet-care.png'

const App = () => {
  const [animals, setAnimals] = useState([])
  const [users, setUsers] = useState([])
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    animalService
      .getAll()
      .then(initialAnimals => {
        setAnimals(initialAnimals)
      })
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedRescueAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      animalService.setToken(user.token)
    }
  }, [])

  const animalFormRef = useRef()
  const signupFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password,})
      window.localStorage.setItem(
        'loggedRescueAppUser', JSON.stringify(user)
      )
      animalService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUsername('')
    setPassword('')
  }

  const deleteAnimal = id => {
    const deletedAnimal = animals.find(a => a.id === id)
    if (window.confirm(`Delete "${deletedAnimal.name}"?`)) {
      animalService
        .poista(deletedAnimal.id)
        .then(setAnimals(animals.filter((deletedAnimal) => deletedAnimal.id !== id)))  
        .then(setInfoMessage(`${deletedAnimal.name} deleted`))
        .then(setTimeout(() => {
            setInfoMessage(null)
            }, 3000)
        )
    }
  }
  return (
    <div>
      {!user &&
      <div>
        <Notification message={infoMessage} />
        <ErrorNotification message={errorMessage} />
        <header className='header'>
          <div className="loginpage">
            <div className="lItem">
              <div className="loginImage">
                <h1>Eläinsuojelukeskus Tassula</h1>
                <img src={petImg} width="300" style={{position: 'relative'}} alt="login"/>
              </div>
              <div>
                <LoginForm
                username = {username} password = {password} users={users}
                handleLogin = {handleLogin}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
              />
              </div>
              <div>
                <SignUpForm 
                users = {users} setUsers = {setUsers}
                setErrorMessage = {setErrorMessage} setInfoMessage = {setInfoMessage}
              />
              </div>
            </div>
          </div>
       </header>
       <div>
       <ContactForm
          setInfoMessage={setInfoMessage}
          infoMessage={infoMessage}
        />
        </div>
      </div>
      }
      {user &&
      <div className="mainpage">
      <LogoutForm 
        user = {user}
        handleLogout = {handleLogout}
        />
      {user.type==="admin" && 
      <div>
        <Togglable buttonLabel="Lisää eläinkortti" closeLabel="sulje" ref={animalFormRef}>
          <AnimalForm 
            animals={animals} 
            setAnimals={setAnimals}
          />
        </Togglable>
        <br></br>
      </div>
      }
      <Animals
        animals={animals} 
        deleteAnimal={deleteAnimal}
        setAnimals={setAnimals}
        user={user}
        users={users}
        setUsers={setUsers}
      />
      </div>
      }
      <Footer name = "Eläinsuojelukeskus Tassula"/>
  </div>
  )
}
export default App
