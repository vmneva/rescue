import '../index.css'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { ReactComponent as HeartIcon } from '../icons/heart.svg'
import { ReactComponent as MaleIcon } from '../icons/male.svg'
import { ReactComponent as FemaleIcon } from '../icons/female.svg'

const Animal = ({
      animal, 
      animals,
      deleteAnimal,
      toggleFavourite,
      setAnimals,
      user
    }) => {

    const isFavourite = animal.favourite
    const comments = animal.comments || []

    return (
        <div className='dog'>
        <img src={animal.image} alt={`${animal.name}`}/>
        <h3>
            {animal.name + " "}
            {animal.sex==="male" && <MaleIcon/> }
            {animal.sex==="female" && <FemaleIcon/> }
            {" | "}{animal.date_of_birth}
            <button aria-label='favourite' onClick={toggleFavourite} className={`favourite ${isFavourite ? 'active' : ''}`}>
                <HeartIcon />
            </button>
        </h3>
        <ul>
            <li>{animal.breed}</li>
            <li>location: {animal.location}</li>
            <li>origin: {animal.origin}</li>
        </ul>
        {user.type==="admin" &&
            <button onClick={deleteAnimal}>delete</button> 
        } 
        <div>
        <CommentForm
          animal={animal}
          user={user}
          animals={animals}
          setAnimals={setAnimals}
        />
        <h3>Comments:</h3>
        {comments.map(comment => !comment===undefined ? 
        <p>No comments yet!</p> :
        <Comment
            key={comment.id}
            comment={comment} 
            animal={animal}
            animals={animals}
            setAnimals={setAnimals}
            user={user}
        />
        )}
        </div>
        </div>
    )
}


export default Animal
