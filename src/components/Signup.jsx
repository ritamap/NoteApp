import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredential] = useState({ name: "", email: "", password: "",cPassword:"" })
  const navigate = useNavigate()
  const PasswordRef = useRef(null)
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.BASE_URL}/api/auth/createUser`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',


      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })

    });
    const data = await response.json();
    // console.log(data);
    if (data.success) {
      localStorage.setItem("authToken", data.authToken)
      navigate('/')
      props.showAlert("Success","Account Created Successfully", "success")

    }
    else {
      props.showAlert("Error","Invalid credentials", "danger")
    }

  }
  const onChange = (e) => {
    console.log(credentials)
    console.log(credentials.cPassword !== credentials.password ||
      credentials.password.length===0 || credentials.cPassword.length===0)
    setCredential((prev) => { return { ...prev, [e.target.name]: e.target.value } });
  }
  return (
    <>
    <h2>Sign up to <span style={{color: "#3498DB"}}>iNotebook</span></h2>

      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" name="name" id="name" aria-describedby="emailHelp" onChange={onChange

          } />
        </div>
        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="Email1" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="Password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">Confirm Password</label>
          <input ref={PasswordRef} type="password" className="form-control" name="cPassword" id="cPassword" onChange={onChange} />
        </div>
        <button disabled={credentials.cPassword !== credentials.password ||
          credentials.password.length===0 || credentials.cPassword.length===0} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Signup
