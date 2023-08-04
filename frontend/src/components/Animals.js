import { useState } from 'react'
import '../index.css'
import Animal from './Animal'
import { ReactComponent as HeartIcon } from '../icons/heart.svg';

const Animals = ({ 
      animals,
      deleteAnimal,
      toggleFavourite,
      user,
      setAnimals
    }) => {

    //sorting animals from youngest to oldest
    /*const sortedAnimals = animals.slice().sort((a, b) => {
      const dateA = new Date(a.date_of_birth.split('.').reverse().join('-'));
      const dateB = new Date(b.date_of_birth.split('.').reverse().join('-'));

      return dateA - dateB;
    })
    */

    const [showAll, setShowAll] = useState(true)
    const [showType, setShowType] = useState('all');
    let animalsToShow = [...animals];
   
    if (!showAll) {
        animalsToShow = animalsToShow.filter(animal => animal.favourite);
    }
    if (showType !== 'all') {
        animalsToShow = animalsToShow.filter(animal => animal.type === showType);
    }

    return (
      <div className='animals'>
        <div>
          <button onClick={() => setShowType('all')}>All</button>
          <button onClick={() => setShowType('dog')}>Dogs</button>
          <button onClick={() => setShowType('cat')}>Cats</button>
          <button onClick={() => setShowAll(!showAll)} className={`favourite ${!showAll ? 'active' : ''}`}>
            <HeartIcon />
          </button>
        </div>
        {animalsToShow.map(animal => 
        <Animal 
          key={animal.id} 
          animal = {animal}
          animals={animals}
          user = {user}
          setAnimals={setAnimals}
          deleteAnimal={() => deleteAnimal(animal.id)}
          toggleFavourite={() => toggleFavourite(animal.id)}  />
        )}
      </div>
    )
  }
  
  export default Animals