import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext'

export default function AddNote(props) {
    const context=useContext(NoteContext);
    const {addNote,showAlert}=context;

    const [note, setnote] = useState({title:"", description:"",tag:""});
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note);
        setnote({title:"", description:"",tag:""})
        props.showAlert("Note Added Successfully","success")
    }
    return<>
         <div className='justify-content-center d-flex' style={{"color":"white"}}>
      <h2 className='my-8'>Notes App</h2>
      </div>
            <div className='container justify-content-center align-item-center d-flex' style={{"height":"70vh"}}>
                <form className='container'>
                    <div className="mb-3">
                        {/* <label htmlFor="title" className="form-label">Title</label> */}
                        <input type="text" className="form-control" placeholder='Title' name="title" id="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required value={note.title}/>
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="description" className="form-label">Description</label> */}
                        <input type="text" className="form-control" name="description" placeholder='Description' id="description" onChange={onChange} minLength={5} required value={note.description}/>
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="tag" className="form-label">Tag</label> */}
                        <input type="text" className="form-control" name="tag" id="tag" placeholder='Tag' onChange={onChange} value={note.tag}/>
                    </div>
                    
                    <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                
            </div>
        </> 
}
