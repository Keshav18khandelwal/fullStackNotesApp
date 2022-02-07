import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext'
import keshavphoto from './images/keshavphoto.jpeg';
import book3 from './images/book3.png'

export default function About() {

  
  return (<div id='about' >
    <h3 style={{ 'textAlign': "center" }} className='mt-2'>About Us </h3>
   
    <div style={{"display":"flex","justifyContent":"center"}}>
   
      <img src={`${keshavphoto}`} alt="Loading" style={{ "width": "15vw", "height": "20vh", "borderRadius": "50%", "boxShadow": "0 4px 8px 0 gray, 0 6px 20px 0 rgb(61, 35, 35)" }}></img>
    </div>
    <ul style={{ 'textAlign': "center" }} className='my-1'>
      <h3 className='mb-4 mt-4'>Keshav Khandelwal</h3>
      <hr />
      <h6>You can store your conficial Data</h6>
      <h6>You can edit or delete any note at any time</h6>
      <h6>Your Notes are secure in cloud </h6>
      <hr />
    </ul>
    <div style={{ "marginTop": "8vh", "marginRight": "0px", "marginLeft": "0px", "paddingBottom": "10vh", "backgroundColor": "black", "color": "white", "display": "flex", "justifyContent": "center" }}>
      <div>
        <div style={{ "fontSize": "2em", "color": "white", "paddingBottom": "2vh", "display": "flex", "justifyContent": "center" }} className="d-flex mx-3 my-3">

          <div className='mx-2'>
            <a href="https://www.instagram.com/khandelwal.2001/" target="_blank">
              <span style={{ "color": "white" }}>

                <i className="fab fa-instagram"></i>
              </span>
            </a>
          </div>
          <div className='mx-2'>
            <a href="https://www.facebook.com/keshav.khandelwal.54" target="_blank">
              <span style={{ "color": "white" }}>

                <i className="fab fa-facebook"></i>
              </span>
            </a>
          </div>
          <div className='mx-2'>
            <a href="https://www.linkedin.com/in/keshav-khandelwal-91542419b" target="_blank">
              <span style={{ "color": "white" }}>

                <i className="fab fa-linkedin"></i>
              </span>
            </a>
          </div>
        </div>
        <div >
          All Rights reserved &#169; 2022 Keshav Khandelwal
        </div>
      </div>
    </div>
  </div>)
}
