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
      addComment({...animal, comments: [...comments, commentObject]})
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
        console.error('Error saving comment:', error)
      })
  }

  return (
    <div>
      <textarea
        value={newComment}
        onChange={handleInputChange}
        placeholder="Write a comment..."
      />
      <button onClick={handleCommentSubmit}>Submit</button>
    </div>
  )
}

export default CommentForm
