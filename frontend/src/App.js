import { useState, useEffect, useRef } from 'react'
import './index.css'
import Popup from 'reactjs-popup'

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
import helpImg from './pictures/help.png'
import adminHelpImg from './pictures/admin_help.png'
import clientHelpImg from './pictures/client_help.png'

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
      setErrorMessage('Salasana tai käyttäjänimi väärin!')
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
    if (window.confirm(`Poista "${deletedAnimal.name}"?`)) {
      animalService
        .poista(deletedAnimal.id)
        .then(setAnimals(animals.filter((deletedAnimal) => deletedAnimal.id !== id)))  
    }
  }

  return (
    <div>
      {!user &&
      <div className='loginpage'>
        <header className='header'>
        <div className='contactform'>
            <ContactForm/>
          </div>
          <div className="loginAndsignup">
            <div className="lItem">
              <h1>Eläinsuojelukeskus Tassula</h1>
              <img src={petImg} max-width="100%" width="300px" alt="login"/>
              <Notification message={infoMessage} />
              <ErrorNotification message={errorMessage} />
              <div className='forms'>
                  <LoginForm
                  username = {username} password = {password} users={users}
                  handleLogin = {handleLogin}
                  handleUsernameChange={({ target }) => setUsername(target.value)}
                  handlePasswordChange={({ target }) => setPassword(target.value)}/>
                  <SignUpForm
                  users = {users} setUsers = {setUsers}
                  setErrorMessage = {setErrorMessage} setInfoMessage = {setInfoMessage}/>
              </div>
            </div>
          </div>
        </header>
        <Footer name = "Eläinsuojelukeskus Tassula"/>
        </div>
      }
      {user &&
      <div className="mainpage">
        <div className="headerAndLogout">
        <Popup trigger=
                {
                <button className='helpbutton'> <img src={helpImg} alt="login"/></button>
                }
                modal closeOnDocumentClick>
                {close => (
                  <div className='helpWindow'>
                    <div className='helpContent'>
                      <button className="close" onClick={close}>Sulje</button>
                      Toimintojen selitykset
                      {user.type === "admin" && <img src={adminHelpImg} width="100%" alt="help"/>}
                      {user.type !== "admin" && <img src={clientHelpImg} width="100%" alt="help"/>}
                    </div>
                  </div>
                )}
            </Popup>
          <h2>
            <img src={petImg} alt="login"/>
            Eläinsuojelukeskus Tassula
          </h2>
          {user.type==="admin" && 
              <Togglable buttonLabel="Lisää eläinkortti" closeLabel="sulje" ref={animalFormRef}>
                <AnimalForm 
                  animals={animals} 
                  setAnimals={setAnimals}
                />
              </Togglable>
          }
          <LogoutForm 
            user = {user}
            handleLogout = {handleLogout}
          />
        </div>
        <div className='mainpageContent'>
          <Animals
            animals={animals} 
            deleteAnimal={deleteAnimal}
            setAnimals={setAnimals}
            user={user}
            users={users}
            setUsers={setUsers}
          />
        </div>
        <Footer name = "Eläinsuojelukeskus Tassula"/>
      </div>
      }
    </div>
  )
}
export default App

