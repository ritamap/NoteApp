import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = ({showAlert}) => {
 const [credentials,setCredential] = useState({email:"",password:""})
 const navigate=useNavigate()

  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
      method: 'POST',
     
      headers: {
        'Content-Type': 'application/json',
        
        
          },
      body: JSON.stringify({ email: credentials.email,password: credentials.password })
      
    });
    const data = await response.json();
    // console.log(data);
    if(data.success){
      localStorage.setItem("authToken",data.authToken)
      showAlert("Success","Logged in Successfully","success")
      navigate('/')

    }
    else{
      showAlert("Unsuccessful","Invalid credentials","danger")

    }  
    
  }
  const onChange = (e)=>{
    setCredential((prev)=>{return {...prev,[e.target.name] : e.target.value}});
  }

  
  return (
    <>
    <h2>Log in to <span style={{color: "#3498DB"}}>iNotebook</span></h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value = {credentials.email}id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange = {onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name="password" className="form-control"onChange = {onChange} value={credentials.password} id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </>
  )
}

export default Login
