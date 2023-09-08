import { useState } from 'react'
import '../index.css'
import Animal from './Animal'
import Popup from 'reactjs-popup'
import { ReactComponent as MaleIcon } from '../icons/male.svg'
import { ReactComponent as FemaleIcon } from '../icons/female.svg'
import { ReactComponent as HeartIcon } from '../icons/heart.svg'
import dogImg from '../pictures/dog.png'
import catImg from '../pictures/cat.png'
import pawImg from '../pictures/paw.png'

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

    return (
      <div>
        <div className='wrapper'>
          <div className="tabs_wrap">
          <Popup trigger=
            {<button className='editbutton'> Suodata profiileja </button>}
            modal closeOnDocumentClick>
            {close => (
              <div className='sortForm'>
                <div className='sortings'>
                  <button className="closeSorting" onClick={close}>Piilota suodatin</button>
                    <div className="sortingbuttons">
                      <button onClick={() => handleSexSortClick('male')} className={`male ${activeSexSort === "male" ? 'active' : ''}`} ><MaleIcon/></button>
                      <button onClick={() => handleSexSortClick('female')} className={`female ${activeSexSort === "female" ? 'active' : ''}`}><FemaleIcon/></button>
                      <br></br>
                      <button onClick={() => handleSortByClick('youngest')} className={`youngest ${sortBy==="youngest" ? 'active' : ''}`} >Nuorimmasta vanhimpaan</button>
                      <button onClick={() => handleSortByClick('oldest')} className={`oldest ${sortBy==="oldest" ? 'active' : ''}`} >Vanhimmasta nuorimpaan</button>
                      <br></br>
                      <select value={showLocation} onChange={handleLocationChange}>
                          <option value="all">Kaikki toimipisteet</option>
                          <option value="Helsinki">Helsinki</option>
                          <option value="Oulu">Oulu</option>
                      </select>
                    </div>
                  <button onClick={() => setShowAll(!showAll)} className={`favouritebutton ${!showAll ? 'active' : ''}`}>
                    <HeartIcon />
                  </button> 
                </div> 
            </div>
            )}
          </Popup>
            <ul>
              <li>
                <button onClick={() => setShowType('all')} className={`tablinks ${showType==="all" ? 'active' : ''}`}>
                  <img src={pawImg} max-width="100%" width="90px" alt="paw"/>Kaikki</button>
              </li>
              <li>
                <button onClick={() => setShowType('dog')} className={`tablinks ${showType==="dog" ? 'active' : ''}`}>
                  <img src={dogImg} max-width="100%" width="90px" alt="dog"/>Koirat</button>
              </li>
              <li>
                <button onClick={() => setShowType('cat')} className={`tablinks ${showType==="cat" ? 'active' : ''}`}>
                  <img src={catImg} max-width="100%" width="90px" alt="cat"/>Kissat</button>
              </li>
            </ul>
          </div>
        </div> 
        <div className='animals'>
        {animalsToShow.map(animal => 
        <Animal 
          key={animal.id} 
          animal = {animal}
          animals={animals}
          user = {user}
          setAnimals={setAnimals}
          deleteAnimal={() => deleteAnimal(animal.id)} />
        )}
        </div>
      </div>
    )
  }
  
  export default Animals