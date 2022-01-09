import './Login.css';
import { useState } from "react";
import {Modal} from 'react-bootstrap';


const axios = require('axios');


function Login(props) {
  const [login, setlogin] = useState({username:"",password:""});
  const [signup, setsignup] = useState({email:"",password:"",pincode:""});
  const [signupFlag, setsignupFlag] = useState(false)
  const [loginFailed, setloginFailed] = useState(false)
  const [showlogin, setshowlogin] = useState(true)
  const triggerLogin=(event)=>{
    event.preventDefault()
    console.log(login)
    axios.post('http://localhost:3035/api/v1/user/signin',login)
        .then(function (response) {
            window.localStorage.setItem("Token",response.data.token)
            window.localStorage.setItem("User",JSON.stringify(response.data.user))
            console.log(response.data.token)
            setshowlogin(false)
        })
        .catch(function (error) {
          setloginFailed(true)
          console.log("login failed")
        })
  }
  const triggerSignup=(event)=>{
    event.preventDefault()
    axios.post('http://localhost:3035/api/v1/user/register',signup)
        .then(function (response) {
            setsignupFlag(true)
        })
        .catch(function (error) {
          console.log("login failed")
        })
  }
  return (
    <Modal
    {...props}
    show={props.show && showlogin}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Body>
            <div>
                <div className="login-container" >
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active custom-tab" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Login</button>
                        </li>
                        
                        <li className="nav-item" role="presentation">
                            <button className="nav-link custom-tab" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="false">Sign Up</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <form>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label m-2">Email</label>
                                <div className="col-sm-10 m-2">
                                <input type="email" onChange={(event)=>{setlogin({...login,username:event.target.value})}} className="form-control" id="inputEmail3"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label m-2">Password</label>
                                <div className="col-sm-10 m-2">
                                <input type="password" onChange={(event)=>{setlogin({...login,password:event.target.value})}} className="form-control" id="inputPassword3"/>
                                </div>
                            </div>
                            <button onClick={(event)=>{triggerLogin(event)}} className="btn btn-primary">Login</button>
                            {loginFailed && <div class="alert alert-danger m-3" role="alert">
                                Wrong credentials Invalid username or password
                            </div>}
                            </form>
                        </div>
                        <div className="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                            <form>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label m-2">Email</label>
                                <div className="col-sm-10 m-2">
                                <input type="email" onChange={(event)=>{setsignup({...signup,email:event.target.value})}} className="form-control" id="inputEmail3"/>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPincode3" className="col-sm-2 col-form-label m-2">Pincode</label>
                                <div className="col-sm-10 m-2">
                                <input type="number" onChange={(event)=>{setsignup({...signup,pincode:event.target.value})}} className="form-control" id="inputPincode3"/>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label m-2">Password</label>
                                <div className="col-sm-10 m-2">
                                <input onChange={(event)=>{setsignup({...signup,password:event.target.value})}} type="password" className="form-control" id="inputPassword3"/>
                                </div>
                            </div>
                            <button onClick={(event)=>{triggerSignup(event)}} className="btn btn-primary">Signup</button>
                            </form>
                            { signupFlag && <div class="alert alert-primary alert-dismissable">
                            <strong>Sign Up succesfully</strong>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
      </Modal.Body>
        
      </Modal>
    
  );
}

export default Login;
