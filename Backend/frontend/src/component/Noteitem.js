import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext'

export default function Noteitem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    const handleClick = () => {
        deleteNote(note._id)
        showAlert("Deleted Note Successfully", "success")
    }
    const dt=new Date(note.date)

    return <div className="col-md-4 my-3" style={{ "boxShadow": "0 4px 8px 0 black, 0 6px 20px 0 rgb(61, 35, 35)", "borderRadius": "20px" }}>
        <div className="card ">
            <div className="card-body ">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <div className='d-flex'>

                    <div style={{ "font-size": '1.5rem' }}>
                        <i className="fas fa-trash mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete This Note" onClick={handleClick}></i>
                    </div>
                    <div style={{ "font-size": '1.5rem' }}>
                        <i className="far fa-edit mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit This Note" onClick={() => { updateNote(note) }}></i>
                    </div>

                    {note.tag ? <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary" >
                        {note.tag}
                    </span> : ""

                    }

                </div>
                    <div className='card-footer text-muted my-2'>
                        {/* let dt=new Date(note.date)
                        dt.toString() */}
                        {dt.toString().slice(0,33)}
                        {/* {note.date.toLocalString()} */}
                    </div>
            </div>
        </div>
    </div>
}
