import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import TodoSVG from '../assets/todo-svg.svg'
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
       <div className="container">

       <div className="title">Todo - List
       <PostAddIcon className="delete-button"/>
        </div>
       

     <div className="form">

    
      <div className="user-details">
      
      

      
        {isRegistering ? (
          <>
          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value
                })
              }
            />
            </div>
            <div className="input-box">
            <span className="details"> Confirm Email</span>
            <input
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value
                })
              }
            />
            </div>
            <div className="input-box">
            <span className="details">Password</span>
            <input
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value
                })
              }
            />
            </div>
            <div className="input-box">
            <span className="details">Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value
                })
              }
            />
            </div>
            <div className="button1">
            <button className="sign-in-register-button" onClick={handleRegister}>Register</button>
            </div>
            <div className="button2">
            <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go back</button>
            </div>
            
          </>
          
        ) : (
          <>
          <div className="welcome1">

         
          <div className="input-box1">
          <span className="details">Email</span>
          <input type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
          </div>
           <div className="input-box2">
           <span className="details">Password</span>
           <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
           </div>
           </div>
           <div className="buttons">

           
            <div className="button1">
            <button className="" onClick={handleSignIn}>
              Sign In
            </button>
            </div>
            <div className="button2">
            <button
              className=""
              onClick={() => setIsRegistering(true)}
            >
              Create an account
            </button>
            </div>
            </div>
          </>
        )}
      </div>
      </div>
      </div>
    </div>
  );
}