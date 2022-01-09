import './Redirector.css';
import Login from "../Login/Login";
import { useState } from 'react';
import { useNavigate  } from "react-router-dom";

/*
    component for redirecting to login if user is not authenticated
*/

function Redirector() {
    const navigate=useNavigate()
    const [showLogin, setshowLogin] = useState(true) // flag for login modal
    const loginSuccess=()=>{
        setshowLogin(false)  
        navigate("/");                               // if user is authenticated successfully redirecting to home page
    }
   
  return (
      <div>
          <h1>Login/SignUp</h1>
          <Login  show={showLogin} loginsuccess={loginSuccess} onHide={() => setshowLogin(false)}/>
      </div>
  );
}

export default Redirector;
