import '../index.css'
import Comments from './Comments';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as MaleIcon } from '../icons/male.svg';
import { ReactComponent as FemaleIcon } from '../icons/female.svg';


const Animal = ({
      animal, 
      animals,
      deleteAnimal,
      toggleFavourite,
      user
    }) => {

    const isFavourite = animal.favourite; 
    const comments = animal.comments;

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
        <Comments 
            comments={comments} 
            user={user}
            animal={animal}
            animals={animals} />
        </div>
    )
}


export default Animal
