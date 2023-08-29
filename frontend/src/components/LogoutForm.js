import '../index.css'
import { ReactComponent as LogoutIcon } from '../icons/logout.svg'

const LogoutForm = ({
    handleLogout,
    user,

}) => {
    return (
    <div>
    <form onSubmit={handleLogout}>
    <div className="logout">
        {user.type==="admin" && <div>{user.name} (ADMIN)</div> }
        {user.type==="client" && <div>{user.name}</div>}
        <button type="submit">logout<LogoutIcon/></button>
    </div>
    </form>  
    </div> 
    )
}
export default LogoutForm
