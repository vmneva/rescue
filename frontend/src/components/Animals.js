import { useState } from 'react'
import '../index.css'
import Animal from './Animal'
import { ReactComponent as HeartIcon } from '../icons/heart.svg'
import { ReactComponent as MaleIcon } from '../icons/male.svg'
import { ReactComponent as FemaleIcon } from '../icons/female.svg'

const Animals = ({ 
      animals,
      deleteAnimal,
      toggleFavourite,
      user,
      setAnimals
    }) => {    

    const [showAll, setShowAll] = useState(true)
    const [showType, setShowType] = useState('all')
    const [showLocation, setShowLocation] = useState('all')
    const [showSex, setShowSex] = useState('all')
    const [sortBy, setSortBy] = useState('date')
    let animalsToShow = [...animals]
   
    if (!showAll) {
        animalsToShow = animalsToShow.filter(animal => animal.favourite)
    }
    if (showType !== 'all') {
        animalsToShow = animalsToShow.filter(animal => animal.type === showType)
    }
    if (showLocation !== 'all') {
      animalsToShow = animalsToShow.filter(animal => animal.location === showLocation)
    }
    if (showSex !== 'all') {
      animalsToShow = animalsToShow.filter(animal => animal.sex === showSex)
    }

    const handleLocationChange = (event) => {
      setShowLocation(event.target.value)
    }

    const handleSortByClick = (sortCriteria) => {
      setSortBy(sortCriteria)
    }

    const handleReset = () => {
      setShowAll(true)
      setShowType('all')
      setShowLocation('all')
      setSortBy('date')
      setShowSex('all')
    }

    const sortingFunctions = {
      youngest: (a, b) => {
        const dateA = new Date(a.date_of_birth.split('.').reverse().join('-'))
        const dateB = new Date(b.date_of_birth.split('.').reverse().join('-'))
        return dateB - dateA
      },
      oldest: (a, b) => {
        const dateA = new Date(a.date_of_birth.split('.').reverse().join('-'))
        const dateB = new Date(b.date_of_birth.split('.').reverse().join('-'))
        return dateA - dateB
      },
      name: (a, b) => a.name.localeCompare(b.name),
    }

    animalsToShow.sort(sortingFunctions[sortBy])

    return (
      <div className='animals'>
        <div>
          <button onClick={() => (setShowType("all") && setShowSex("all"))}>All</button>
          <button onClick={() => setShowType('dog')}>Dogs</button>
          <button onClick={() => setShowType('cat')}>Cats</button>
          <br></br>
          <button onClick={() => setShowSex('male')} className={`male ${showSex==="male" ? 'active' : ''}`} ><MaleIcon/></button>
          <button onClick={() => setShowSex('female')} className={`female ${showSex==="female" ? 'active' : ''}`}><FemaleIcon/></button>
          <br></br>
          <button onClick={() => handleSortByClick('youngest')}>From youngest</button>
          <button onClick={() => handleSortByClick('oldest')}>From oldest</button>

        <select value={showLocation} onChange={handleLocationChange}>
            <option value="all">Koko Suomi</option>
            <option value="Helsinki">Helsinki</option>
            <option value="Oulu">Oulu</option>
        </select>
          <button onClick={() => setShowAll(!showAll)} className={`favouritebutton ${!showAll ? 'active' : ''}`}>
            <HeartIcon />
          </button>
          <button onClick={handleReset}>Clear sorting</button>
        </div>
        <br />
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