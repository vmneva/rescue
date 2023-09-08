import '../index.css'
import { useState } from 'react'
import contactImg from '../pictures/operator.png'

const ContactForm = ( {setInfoMessage} ) => {

    const [showForm, setShowForm] = useState(false)

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
        {showForm &&
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
          }
      </div>
    )
}


export default ContactForm