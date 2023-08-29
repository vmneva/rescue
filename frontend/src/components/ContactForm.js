import '../index.css'
import { useState } from 'react'
import Notification from './Notification'

const ContactForm = ({
    setInfoMessage, 
    infoMessage
    }) => {

    const [showForm, setShowForm] = useState(true)

    const addMessage = (event) => {
        event.preventDefault()
        const email = document.querySelector('#email').value
        const infoMessage = `Kiitos! Olemme mahdollisimman pian yhteydessä sähköpostiisi ${email} :)`
        setInfoMessage(infoMessage)
        setShowForm(false)
    }

    return (
        <div className='contactinfo'>
        {showForm ? (
        <form onSubmit={addMessage}>
          <h2>Haluatko ottaa meihin yhteyttä?</h2>
          <label>
            Nimesi
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Nimesi.."/>
            </label>
          <label>
            Sähköposti
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Sähköpostisi.."/>
          </label>
          <label>
            Terveiset
            <textarea 
              id="subject" 
              name="subject" 
              placeholder="Kirjoita meille.." >
            </textarea>
          </label>
          <button type="submit">Lähetä</button>
          </form>
        ) : (
          <div>
            <Notification message={infoMessage} />
          </div>
        )}
        </div>
    )
}


export default ContactForm