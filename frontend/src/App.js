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

  const toggleFavourite = id => {
    const animal = animals.find(a => a.id === id)
    const changedAnimal = { ...animal, favourite: !animal.favourite }
    animalService
      .update(id, changedAnimal)
      .then(returnedAnimal => {
        setAnimals(animals.map(animal => animal.id !== id ? animal : returnedAnimal))
      })
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
        <ErrorNotification message={errorMessage} />
        <Notification message={infoMessage} />
        <SignUpForm 
          users = {users} setUsers = {setUsers}
          setErrorMessage = {setErrorMessage} setInfoMessage = {setInfoMessage}
        />
        <LoginForm 
          username = {username} password = {password} users={users}
          handleLogin = {handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
      }
      {user &&
      <div>
       {user.type==="admin" && <h1>Rescue ADMIN</h1> }
       {user.type==="client" && <h1>Rescue Center</h1> }
      <LogoutForm 
        user = {user}
        handleLogout = {handleLogout}
        />
      {user.type==="admin" && 
      <div>
        <Togglable buttonLabel="Add new animal" ref={animalFormRef}>
          <AnimalForm 
            animals={animals} 
            setAnimals={setAnimals}
          />
        </Togglable>
      </div>
      }
      <Animals
        animals={animals} 
        toggleFavourite={toggleFavourite} 
        deleteAnimal={deleteAnimal}
        setAnimals={setAnimals}
        user={user}
      />
      {user.type==="client" &&
        <ContactForm
          setInfoMessage={setInfoMessage}
          infoMessage={infoMessage}
        />
      }
      </div>
      }
      <div className='contactinformation'>
        <h3>RescueKeskus</h3>
        <li>y-tunnus: 123456-7</li>
        <li>asiakaspalvelu@rescuekeskus.com</li>
        <li>02 456 122</li>
      </div>
  </div>
  )
}

export default App
