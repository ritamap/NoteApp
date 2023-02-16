import React from 'react'
import { Link,useLocation, useNavigate } from "react-router-dom";




const Navbar = () => {
  const location=useLocation()
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate("/login")
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
      <div className="  container-fluid d-flex justify-content-between">
        <h1 className="navbar-brand" to="/">iNotebook</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" style={{
          flexGrow:0
        }} id="navbarSupportedContent">
          <form className="d-flex">
            {!localStorage.getItem("authToken") ?
              <>
                <Link className={`btn btn-primary  mx-1 ${location.pathname==='/login'?"d-none":""}`} to="/login" role="button">Login</Link>
                <Link className={`btn btn-primary  mx-1 ${location.pathname==='/signup'?"d-none":""}`} to="/signup" role="button">Sign up</Link>
              </>
              : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </form>
        </div>
      </div>
    </nav>


  )
}

export default Navbar
// {`nav-link ${location.pathname=== "/about"?"active":""}`}