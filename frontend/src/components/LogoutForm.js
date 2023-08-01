import '../index.css'

const LogoutForm = ({
    handleLogout,
    user,

}) => {
    return (
    <div className="logout">
    <form onSubmit={handleLogout}>
        <div>
        {user.name} logged in
        <button type="submit">logout</button>
        </div>
    </form>      
    <br></br>
    </div> 
    )
}
export default LogoutForm