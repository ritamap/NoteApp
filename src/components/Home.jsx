import React from 'react'
import Note from './Note'



const Home = ({showAlert}) => {
 
  return (
    <div>
      
      <Note showAlert={showAlert}/>
    </div>
  )
}

export default Home
