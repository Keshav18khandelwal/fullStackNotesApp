import { useState } from 'react';
import NoteContext from './NoteContext';



const NoteState = (props) => {
// const host='http://localhost:5000'
  // const host=process.env.PORT
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)
/////////////////////
const [uname, setuname] = useState({name:"",email:"",date:""});


const Uname= async ()=>{
    
  const response = await fetch(`/api/auth/getuser`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
      },

  })

  const json = await response.json();
  if (json.user.name!="") {
      // setuname(json.user.name.charAt(0).toUpperCase())
      setuname({name:json.user.name,email:json.user.email,date:json.user.date})
  }
}




//////////////////////////////

  //adding a note
  const addNote = async ({ title, description, tag }) => {

    const response=await fetch(`/api/notes/addnotes`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    })

    const json=await response.json();
    setNotes(notes.concat(json))
  }


  //deleting a note
  const deleteNote = async(id) => {

    const response=await fetch(`/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),
      },
     
    })

    const json=await response.json();
   

    const newnotes = notes.filter((note) => { return note._id !== id })
    setNotes(newnotes)
  }

  //editing a note
  const editNote = async (id, title, description, tag) => {
    const response=await fetch(`/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    })
    const newNote=JSON.parse(JSON.stringify(notes))
    // const json=response.json();
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote)
  }

  //getting all notes
  const getNote = async () => {

    const response=await fetch(`/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),
      },
     
    })

    const json=await response.json();
    setNotes(json);
  }


  

  return (<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNote,uname,Uname,setuname}}>
    {props.children}
  </NoteContext.Provider>)
}

export default NoteState;
