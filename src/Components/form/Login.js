import React, { useEffect, useState,useContext } from 'react'
import { Button, Stack, TextField,Box } from '@mui/material'
import '../Login.css'
import { useNavigate } from 'react-router-dom';
import {app ,auth,db}from './firebase';
import { 
  createUserWithEmailAndPassword,signInWithEmailAndPassword , 
  onAuthStateChanged, signInWithPopup} from "firebase/auth"
   import Home from './Home';
import { GoogleAuthProvider } from "firebase/auth";
import { Context } from './Authcontext';



const Login = () =>
 {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[userphoto,setusephoto]=useState("")
  const navigate=useNavigate();
  const provider = new GoogleAuthProvider();
   const {user}=useContext(Context)
 console.log(db)

  function signUp(e)  
  {
       e.preventDefault()
        
      createUserWithEmailAndPassword(auth,email, password)
      .then((auth)=>{alert("suceessfully created.Sign In again")
                  setEmail("")
                  setPassword("")
      })
        .catch((error) =>{ alert (error.message)
                    setEmail("")
                  setPassword("")})
    }  

    
  function signIn(e) 
  //providing email and password
  {
    e.preventDefault()
    
   signInWithEmailAndPassword(auth,email, password)
   .then((userCredential)=>{var user= userCredential.user;
  alert("signin successful")})
   .catch((error)=>{alert(error.message)
             setEmail("")
            setPassword("")})
  }
  

  const handleGoogleButton=()=>
  {
    signInWithPopup(auth,provider)
    .then((result)=>{console.log("signed In with google")})
    .catch((error)=>{console.error(error.messgae)})
  }

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
   if(user){
        navigate('/Home')
        setusephoto(user.photoURL)
        console.log(user.email)
 
   }
   else{
           console.log("signout")
   }
 })
 },[])


  
  return (
    <div className='container'>
      <div className="login_container">
          <h1>Login</h1>
          

          <div className="auth_fields_buttons flex-column">
            
              <button className='btn flex-row btn-primary' onClick={handleGoogleButton}>
                <img src="assets/google.png" alt="" width="50px"/>
                Sign In With Google
              </button>
              
                <input className='input' type="text" placeholder='email' value={email}  onChange={((e)=>{setEmail(e.target.value)})}/>
                <input className='input'  type="password" placeholder='password'  value={password}  onChange={((e)=>{setPassword(e.target.value)})}/>
                <button className='btn btn-secondary' onClick={signIn}>Sign In</button>
                <button className='btn btn-secondary'onClick={signUp}>Create Account</button>    
              
                <img src={userphoto} alt=""width="100px" />
          </div>
          


            
      </div>
    </div>
  )
}

export default Login