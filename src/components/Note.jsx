import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext';
import Addnote from './Addnote';
import Noteitems from './Noteitems';
import { useNavigate } from 'react-router-dom'



const Note = ({ showAlert }) => {
    const contextAPI = useContext(noteContext)
    const { notes, getNotes, editNote } = contextAPI;
    const navigate=useNavigate()


    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            
            getNotes()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const HandleClick = (e) => {
        //prevent from reload

        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        showAlert("Success", "Note updation have been successful", "success");

    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }
    return (<>

        <Addnote showAlert={showAlert} />

        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                        <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="desc" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag " className="form-label">Tag</label>
                                <input type="text" className="form-control" id="tag" value={note.etag} name="etag" onChange={onChange} minLength={5} required />
                            </div>


                        </form>
                    </div>
                    <div className="modal-footer">
                        <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={HandleClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row my-3'>
            <h1>Your Notes</h1>
            <div className='container mx-1'>
                {notes.length === 0 && "Write down your note"}

            </div>


            {notes?.map((note) => {
                return <Noteitems key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>;
            })}
        </div>
    </>
    )
}

export default Note
