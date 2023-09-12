const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="errornotification">
        {message}
      </div>
    )
  }
  export default ErrorNotification