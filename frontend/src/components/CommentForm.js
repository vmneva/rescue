import '../index.css'
import { useState } from 'react'
import animalService from '../services/animals'

const CommentForm = ({ 
      animal,
      animals,
      setAnimals,
      user
    }) => {

  const [newComment, setNewComment] = useState('')
  const comments = animal.comments || []

  const handleInputChange = (event) => {
      setNewComment(event.target.value)
  }
  const handleCommentSubmit = (event) => {
      event.preventDefault()
      const commentObject = {
        content: newComment,
        username: user.username
      }

      const likedUsers = animal.users.map(user => user.id)

      addComment({...animal, users: likedUsers, comments: [...comments, commentObject]})
      setNewComment('')
  }
  
  const addComment = (animalObject) => {
    const id = animal.id
    animalService
      .update(id, animalObject)
      .then(returnedAnimal => {
        setAnimals(animals.map(animal => animal.id !== id ? animal : returnedAnimal))
      })
      .catch(error => {
        console.error('Virhe kommentin lisäyksessä:', error)
      })
  }

  return (
    <div className="commentForm">
      <textarea
        value={newComment}
        onChange={handleInputChange}
        placeholder="Kommentoi..."
      />
      {newComment !== "" &&
        <button className="commentsubmit" onClick={handleCommentSubmit}>Julkaise</button>
      }
    </div>
  )
}

export default CommentForm
