
import './App.css';
import Home from './component/Home';
import About from './component/About'
import Navbar from './component/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';
import book1 from './component/images/book1.jpg'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  //Alert 
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  // const background={

  //   backgroundImage: `url(${book1})`,
  //   backgroundRepeat: 'no-repeat',
  //   // backgroundAttachment:'fixed',
  //   width :"100vw",
  //   height:"100%",
  //   backgroundSize:'cover',
  //   justifyContent:'center',
  //   alignItem:'center',
  //   backgroundPosition:'center',
  
  // }

  return (
    <div >
     
     <NoteState>
     <Router className='App'>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert}/>
     
        <Routes className='container'>
       
          <Route exact path='/' element={ <Home showAlert={showAlert}/>}/>
          <Route exact path='/about' element={<About showAlert={showAlert}/>}/>
          <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
          <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}/>
        </Routes>
      </Router>
     </NoteState>
    
    </div>
   
  )
}

export default App;
