import '../index.css'

const LogoutForm = ({
    handleLogout,
    user,

}) => {
    return (
    <div className="logout">
        <form onSubmit={handleLogout}>
            {user.type==="admin" && <div className='logoutUser'>{user.name} (ADMIN)</div> }
            {user.type==="client" && <div className='logoutUser'>{user.name}</div>}
            <button type="submit">kirjaudu ulos</button>
        </form>  
    </div> 
    )
}
export default LogoutForm
