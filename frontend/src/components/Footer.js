import '../index.css'
import { ReactComponent as FacebookIcon } from '../icons/facebook.svg'
import { ReactComponent as InstagramIcon } from '../icons/instagram.svg'

const Footer = ({ name }) => {

return (
    <footer className="container">
        <div>
            <h1> {name} </h1>
            <p className="address">
                Testikatu 12<br></br>12345 KAUPUNKI
            </p>
            <p className="contacts">
                02 123 456 (ma-su klo 7-17)<br></br>
                asiakaspalvelu@rescuekeskus.com
            </p>
        </div>
        <div className="social">
            <FacebookIcon className="facebook"/>
            <InstagramIcon className="instagram"/>
        </div>
    </footer>
)
}

export default Footer