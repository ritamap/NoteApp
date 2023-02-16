import './App.css';
import React ,{useState}from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import NavBar from "./components/Navbar"
import Home from './components/Home';
import NoteState from './context/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const [alert, setAlert] = useState(null)
  const [alertTimer, setAlertTimer] = useState(null)

  const showAlert = (header, messege, type) => {
    clearTimeout(alertTimer)
    setAlert(
      {
        heading: header,
        msg: messege,
        type: type
      }
      )
      let timer= setTimeout(() => {
        setAlert(null)
      }, 3000)
      setAlertTimer(timer)
  }
  return (<>
  <NoteState >

    <Router>
      <NavBar alert={showAlert}/>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />}/>
        <Route exact path="/Login" element={<Login showAlert={showAlert} />}/>
        <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>}/>

      </Routes>
      </div>

    </Router>

  </NoteState>

  </>
  )
}

export default App;
