import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import book2 from './images/book2.jpg'
export default function Login(props) {
//for background image 
    const background={

        backgroundImage: `url(${book2})`,
        backgroundRepeat: 'no-repeat',
        // backgroundAttachment:'fixed',
        width :"100vw",
        height:"100%",
        backgroundSize:'cover',
        justifyContent:'center',
        alignItem:'center',
        backgroundPosition:'center',
      
      }


    const context = useContext(NoteContext);
    const { Uname } = context
    let history = useNavigate();
    const [credential, setcredential] = useState({ email: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),
        })


        const json = await response.json();
        if (json.success) {

            localStorage.setItem('token', json.authtoken)
            history("/");
            props.showAlert("Login Successfully", "success")
            Uname();

        } else {
            props.showAlert("Invalid Credentials", "warning")
        }

    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    return <div style={{"height":"92vh"}} >
        
        <div style={background}>
        <div className=' justify-content-center d-flex '>
            <h5 >Please Login For Using Notes</h5>
        </div>
        <form onSubmit={handleSubmit} className='container'>
            <div className="mb-3">

                {/* <label htmlFor="email" className="form-label">Email address</label> */}
                <div className='d-flex'>
                    <span style={{ "font-size": "2rem" }}>
                    <i className="fas fa-envelope mx-2 my-2"></i>
                    </span>
                    <input type="email" className="form-control" id="email" placeholder='Email Address' name="email" onChange={onChange} value={credential.email} aria-describedby="emailHelp" />
                </div>
            </div>
            <div className="mb-3">
                {/* <label htmlFor="password" className="form-label">Password</label> */}
                <div className='d-flex'>
                <span style={{ "font-size": "2rem" }}>
                    <i className="fas fa-key mx-2 my-2"></i>
                    </span>
                
                <input type="password" className="form-control" placeholder='Password' onChange={onChange} name="password" value={credential.password} id="password" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary tag-btn">Submit</button>
        </form>
    </div>
    </div>
}
