import { useState } from 'react'
import '../index.css'
import Animal from './Animal'
import { ReactComponent as MaleIcon } from '../icons/male.svg'
import { ReactComponent as FemaleIcon } from '../icons/female.svg'
import { ReactComponent as HeartIcon } from '../icons/heart.svg'

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
    const [activeSexSort, setActiveSexSort] = useState(null)
    const [sortBy, setSortBy] = useState('date')
    const [activeSortBy, setActiveSortBy] = useState(null)
  
    let animalsToShow = [...animals]
   
    if (!showAll) {
        animalsToShow = animalsToShow.filter(animal => animal.users.some(u => u.id === user.id))
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

    const handleSexSortClick = (sex) => {
      if (activeSexSort === sex) {
        setActiveSexSort(null)
        setShowSex('all')
      } else {
        setActiveSexSort(sex)
        setShowSex(sex)
      }
    }

    const handleLocationChange = (event) => {
      setShowLocation(event.target.value)
    }

    const handleSortByClick = (sortCriteria) => {
      if (activeSortBy === sortCriteria) {
        setActiveSortBy(null)
        setSortBy('date')
      } else {
        setActiveSortBy(sortCriteria)
        setSortBy(sortCriteria)
      }
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
      }
    }

    animalsToShow.sort(sortingFunctions[sortBy])

    /*
    <button onClick={() => setShowType('all')} className={`all ${showType==="all" ? 'active' : ''}`} >All</button>
    <button onClick={() => setShowType('dog')} className={`dog ${showType==="dog" ? 'active' : ''}`} >Dogs</button>
    <button onClick={() => setShowType('cat')} className={`cat ${showType==="cat" ? 'active' : ''}`} >Cats</button>
    */

    return (
      <div>
        <div className="tab">
          <button onClick={() => setShowType('all')} className="tablinks">Kaikki karvakamut</button>
          <button onClick={() => setShowType('dog')} className="tablinks">Koirat</button>
          <button onClick={() => setShowType('cat')} className="tablinks">Kissat</button>
        </div>
        <div className='sortForm'>
          <div className="sortings">
            <button onClick={() => handleSexSortClick('male')} className={`male ${activeSexSort === "male" ? 'active' : ''}`} ><MaleIcon/></button>
            <button onClick={() => handleSexSortClick('female')} className={`female ${activeSexSort === "female" ? 'active' : ''}`}><FemaleIcon/></button>
              <br></br>
              <button onClick={() => handleSortByClick('youngest')} className={`youngest ${sortBy==="youngest" ? 'active' : ''}`} >Nuorimmasta vanhimpaan</button>
              <button onClick={() => handleSortByClick('oldest')} className={`oldest ${sortBy==="oldest" ? 'active' : ''}`} >Vanhimmasta nuorimpaan</button>
              <br></br>
              <select value={showLocation} onChange={handleLocationChange}>
                  <option value="all">Koko Suomi</option>
                  <option value="Helsinki">Helsinki</option>
                  <option value="Oulu">Oulu</option>
              </select>
          </div>
          <button onClick={() => setShowAll(!showAll)} className={`favouritebutton ${!showAll ? 'active' : ''}`}>
            <HeartIcon />
          </button>
        </div>

        <div className='animals'>
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
      </div>
    )
  }
  
  export default Animals