import '../index.css'

const LogoutForm = ({
    handleLogout,
    user,

}) => {
    return (
    <div className="logout">
        <form onSubmit={handleLogout}>
            <div className='logoutUser'>{user.name}</div>
            <button type="submit">kirjaudu ulos</button>
        </form>  
    </div> 
    )
}
export default LogoutForm
