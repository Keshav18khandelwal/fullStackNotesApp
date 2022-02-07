import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext'
import {
  Link, Navigate
} from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const context = useContext(NoteContext);
  const { uname, setuname } = context
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    Navigate("/login")
    props.showAlert("Successfully LoggedOut", "success")
    setuname({ name: "", email: "",date:"" })
  }
  const location = useLocation();

const dt=new Date(uname.date)
  return <div>


    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid mx-2">
      {
          uname.name ?
            <div className="dropdown dropend mx-2">
              <button className="btn btn-secondary " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <strong>{uname.name.charAt(0).toUpperCase()}</strong>
              </button>
              <ul className="dropdown-menu mt-5" aria-labelledby="dropdownMenuButton1" >
                <span style={{ "font-size": "2rem" }}>
                  <i className="fas fa-user mx-2 my-2"></i>
                </span>
                <div className='my-2'>
                  {uname.name}
                </div>
                <div className='my-2'>
                  {uname.email}
                </div>
                <div className='my-2'>
                  Account Created At...
                  <hr/>
                  <div >
                  {dt.toString().slice(0,33)}
                  </div>
                </div>
              </ul>
            </div> : ""
        }
        <Link className="navbar-brand" to="/">Notes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>


          {(!localStorage.getItem('token')) ?
            <form className="d-flex">
              <Link className="btn btn-primary btn-sm mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary btn-sm mx-2" to="/signup" role="button">SignUp</Link></form> : <button type="button" className="btn btn-primary btn-sm my-1" id='logout' onClick={handleLogout}>Logout</button>}


        </div>
       
      </div>
    </nav>
  </div>
}


// style={{ "width": "300px", "height": "200px", "text-align": "center", "jusify-content": "center", "color": "rgb(12, 0, 11)", "backgroundColor": "rgb(73, 171, 184)", "fontWeight": "bolder", "box-shadow": "0 4px 8px 0 black, 0 6px 20px 0 rgb(61, 35, 35)", "border-radius": "20px"}}