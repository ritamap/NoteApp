import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const [notes, setNotes] = useState([])

  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/notes/addnote`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authToken')

      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    //concat return an array where as push updates an array
    setNotes((notes)=>[...notes,note])
  }

  //Delete a note
  const deleteNote = async (id) => {
  //API call
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
   
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('authToken')
      
        },
     
  });
    //Logic for deletion
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
     await fetch(`${import.meta.env.VITE_BASE_URL}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authToken')

      },

      body: JSON.stringify({ title, description, tag })

    });

    // logic to edit in client
    let newNotes = [...notes]
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }
  //get all notes
  const getNotes = async ()=>{
    //API call
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/notes/fetchallnotes`, {
      method: 'GET',
     
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authToken')
        
          },
       
    });
    const json = await response.json();
    setNotes(json)
  
    }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </noteContext.Provider>
  )

}

export default NoteState;