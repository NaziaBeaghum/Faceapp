import React, { createContext, useState } from 'react'
import {auth} from './firebase'
// named export should have curly braces when importing.... ie without default
import Home from './Home'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

export  const Context=createContext()
 
const Authcontext = ({children}) => {
    const[user,setuser]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
       if(user){
            navigate('/Home')
            setuser(user)
            
       }
       else{
            console.log("signout")
       }
     })
     },[])
     console.log(user)
  return (
    <div><Context.Provider value={{user}}>
           {children}
        </Context.Provider></div>
  )
}

export default Authcontext