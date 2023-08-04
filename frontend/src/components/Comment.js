import animalService from '../services/animals'

const Comment = ({ 
    comment,
    animal,
    animals,
    setAnimals,
    user
 }) => {

  const comments = animal.comments || []
  const commentId = comment._id

  const handleDeleteComment = event => {
    event.preventDefault()
    const updatedAnimal = {
      ...animal,
      comments: comments.filter(deletedComment => deletedComment._id !== commentId),
    }
    deleteComment(updatedAnimal)
  }

  const deleteComment = (animalObject) => {
    const id = animal.id
    animalService
      .update(id, animalObject)
      .then(returnedAnimal => {
          setAnimals(animals.map(animal => animal.id !== id ? animal : returnedAnimal))
      })
      .catch(error => {
          console.error('Error deleting comment:', error)
        })
  }
  
  return (
    <div className='comment'>
        <p>
          {comment.content} - {comment.username}
          {(user.type === "admin" || comment.username === user.username) &&
          <button onClick={handleDeleteComment}>delete</button> 
          }
        </p>
    </div>
  )
}

export default Comment
