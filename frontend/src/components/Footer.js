import '../index.css'
import { ReactComponent as FacebookIcon } from '../icons/facebook.svg'
import { ReactComponent as InstagramIcon } from '../icons/instagram.svg'

const Footer = ({ name }) => {

return (
    <footer className="container">
        <div>
            <h4> {name} </h4>
            <p>
                Läntinen Pitkäkatu 12 A<br></br>20101 TURKU
            </p>
            <p>
                02 456 122 (ma-su klo 7-17)<br></br>
                asiakaspalvelu@rescuekeskus.com
            </p>
        </div>
        <div className="social">
            <FacebookIcon className="facebook"/>
            <InstagramIcon className="instagram"/>
        </div>
        <div className="appreciations">
            <p><a href="https://www.flaticon.com/free-icons/rescue" title="rescue icons">Rescue icons created by noomtah - Flaticon</a></p>
            <p><a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by sonnycandra - Flaticon</a></p>
            <p><a href="https://www.flaticon.com/free-icons/cat" title="cat icons">Cat icons created by Freepik - Flaticon</a></p>
            <p><a href="https://www.flaticon.com/free-icons/beagle" title="beagle icons">Beagle icons created by Freepik - Flaticon</a></p>
            <p><a href="https://www.flaticon.com/free-icons/paw" title="paw icons">Paw icons created by PixelVerse - Flaticon</a></p>
        </div>
    </footer>
)
}

export default Footer