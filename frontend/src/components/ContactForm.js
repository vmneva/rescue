import '../index.css'
import { useState } from 'react'
import Notification from './Notification'
import contactImg from '../pictures/operator.png'

const ContactForm = () => {

    const [showForm, setShowForm] = useState(false)
    const [infoMessage, setInfoMessage] = useState(null)

    const handleClick = () => {
      setShowForm(!showForm)
    }

    const addMessage = (event) => {
        event.preventDefault()
        const email = document.querySelector('#email').value
        const infoMessage = `Kiitos! Olemme mahdollisimman pian yhteydessä sähköpostiisi ${email}!`
        setInfoMessage(infoMessage)
        setTimeout(() => {
          setInfoMessage(null)
        }, 3000)
        setShowForm(false)
    }

    return (
      <div className='contactinfo'>
        {showForm && (<button className="closecontact" onClick={handleClick}>Sulje</button>) }
        {!showForm && (<button className="contactbutton" onClick={handleClick}>Ota yhteyttä?</button>) }        
        <img src={contactImg} alt="contact"/>
        {showForm ? (
        <form onSubmit={addMessage}>
          <label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Nimesi.."/>
            </label>
          <label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Sähköpostisi.."/>
          </label>
          <label>
            <textarea 
              type="text"
              id="subject" 
              name="subject" 
              placeholder="Kirjoita meille.." >
            </textarea>
          </label>
          <br></br>
          <button type="submit">Lähetä</button>
          </form>
        ) : (
          <div>
            <Notification className="contactnotification" message={infoMessage} />
          </div>
        )}
      </div>
    )
}


export default ContactForm