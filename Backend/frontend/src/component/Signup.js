import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import book2 from './images/book2.jpg';

export default function Signup(props) {


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
    const [credential, setcredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credential.password === credential.cpassword) {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
            })

            const json = await response.json();

            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                history("/");
                Uname();
                props.showAlert("Created Accounted Successfully", "success")
            }
            else {
                props.showAlert(json.error, "danger")
            }

        } else {
            props.showAlert("Try Without Valid Credentials", "warning")
        }

    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }


    return <div style={{"height":"92vh",}} >
        <div style={background}>


       
        <div className='justify-content-center d-flex '>
            <h5 >Create A New Account</h5>
        </div>
        <form onSubmit={handleSubmit} className='container'>
            <div className="mb-3">
                {/* <label htmlFor="name" className="form-label">Name</label> */}
                <div className='d-flex'>
                    <span style={{ "font-size": "2rem" }}>
                        <i className="fas fa-user mx-2 my-2"></i>
                    </span>
                    <input type="text" className="form-control" placeholder='UserName' id="name" name="name" onChange={onChange} value={credential.name} aria-describedby="emailHelp" minLength={3} required />
                </div>
            </div>
            <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">Email address</label> */}
                <div className='d-flex'>
                <span style={{ "font-size": "2rem" }}>
                    <i className="fas fa-envelope mx-2 my-2"></i>
                    </span>
                
                <input type="email" className="form-control" id="email" placeholder='Email Address' name="email" onChange={onChange} value={credential.email} aria-describedby="emailHelp" required />
                </div>
            </div>
            <div className="mb-3">
                {/* <label htmlFor="password" className="form-label">Password</label> */}
                <div className='d-flex'>
                <span style={{ "font-size": "2rem" }}>
                    <i className="fas fa-key mx-2 my-2"></i>
                    </span>
                
                <input type="password" className="form-control" placeholder='Password' onChange={onChange} name="password" value={credential.password} id="password" required minLength={5} />
                </div>
            </div>
            <div className="mb-3">
                {/* <label htmlFor="cpassword" className="form-label">Confirm Password</label> */}
                <div className='d-flex'>
                <span style={{ "font-size": "2rem" }}>
                    <i className="fas fa-key mx-2 my-2"></i>
                    </span>
               
                <input type="password" className="form-control" placeholder='Confirm Password' onChange={onChange} name="cpassword" value={credential.cpassword} id="cpassword" required minLength={5} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary tag-btn my-10">Submit</button>
        </form>
    </div>
    </div>
}
