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
        const infoMessage = `Thank you! We will contact you as soon as possible to ${email} :)`
        setInfoMessage(infoMessage)
        setShowForm(false)
    }

    return (
        <div className='contactinfo'>
        {showForm ? (
        <form onSubmit={addMessage}>
          <h2>Want to contact us?</h2>
          <h3>Leave a message and we will be in touch!</h3>
          <label>
            Your Name
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Your name.."/>
            </label>
          <label>
            Email
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Your email.."/>
          </label>
          <label>
            Subject
            <textarea 
              id="subject" 
              name="subject" 
              placeholder="Write something.." >
            </textarea>
          </label>
          <button type="submit">Submit</button>
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