import '../index.css'
import { ReactComponent as FacebookIcon } from '../icons/facebook.svg'
import { ReactComponent as InstagramIcon } from '../icons/instagram.svg'

const Footer = ({ name }) => {

return (
    <footer>
    <div className="container">
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
    </div>
    </footer>
)
}

export default Footer