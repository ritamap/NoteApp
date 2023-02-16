import React, {useContext, useState} from 'react'
import noteContext  from '../context/noteContext';


const Addnote = ({showAlert}) => {
    const context = useContext(noteContext)
    const {addNote } = context;
    const [note,setnote] = useState({title: "",description: "",tag: ""})
    
    const HandleClick = (e)=>{
        //prevent from reload
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title: "",description: "",tag: ""})
        showAlert("Success","Your  have create a note","success")
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name] : e.target.value});
    }
  return (
    <div>
      <div className='container my-3'>
      <h2>Add note</h2>
      <form >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name = "title" value = {note.title} aria-describedby="emailHelp" onChange={onChange}/>
         
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control" id="desc" name= "description" value = {note.description} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag " className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name= "tag" value = {note.tag} onChange={onChange}/>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={HandleClick}>Add note</button>
      </form>
      
    </div>
    </div>
  )
}

export default Addnote
