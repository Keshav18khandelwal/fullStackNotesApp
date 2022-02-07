import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  const { showAlert } = props
  const context = useContext(NoteContext);
  const { notes, getNote, editNote, Uname } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
      Uname();
      // eslint-disable-next-line
    }
    else {
      navigate('/login')
    }

  }, [])
  const ref = useRef(null)


  const updateNote = (note) => {
    ref.current.click();
    setnote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag })
  }

  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    e.preventDefault();
    // addNote(note);
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("Note Updated Successfully", "success")
  }

  return <>


    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Notes</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body " >
            <form >
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" name="etitle" id="etitle" style={{ "color": "black" }} aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={3} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" name="edescription" id="edescription" onChange={onChange} value={note.edescription} minLength={5} required style={{ "color": "black" }} />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" name="etag" id="etag" onChange={onChange} value={note.etag} style={{ "color": "black" }} />
              </div>

              {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
            </form>



          </div >
          <div className="modal-footer ">
            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
            <button type="button" style={{ "width": "100vw" }} className="btn btn-primary" disabled={note.etitle.length < 3 || note.edescription.length < 5} data-bs-dismiss="modal" onClick={handleClick}>Edit Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className='container'>

      <div className="row my-2 ">
    <div className='container d-flex justify-content-center' style={{"font-size":"2rem","color":"white"}}>
    {notes.length === 0 && "No Note To Display Pleaase Add A Note By Clicking Add Note Button"}
    </div>
       
        {notes.map((note) => {
          return (
            <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={showAlert} />
          )
        })}
      </div>
    </div>

  </>
}
