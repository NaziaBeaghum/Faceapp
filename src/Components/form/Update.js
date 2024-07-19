import React, { useRef } from 'react'
import '../Login.css'
import  {updateProfile} from "firebase/auth";
import {auth}from './firebase';

const Update = () => {
  const newName=useRef(null)
  const newPic=useRef(null)
  // instaed of state I have used useRef
  // newname is saved as newName.current.value
  const handlesubmit=(e)=>{
   e.preventDefault()
   console.log(newName.current.value)
   console.log(newPic.current.value)
   updateProfile(auth.currentUser, {
            displayName:newName.current.value,
            photoURL:newPic.current.value
        })
        .then(() => {
            console.log("Profile updated")
        })
        .catch((error) => {
            console.error(error.message)
        })
  }

  return (
   <div className="container">
    <div className="login_container flex-column">
      <form onSubmit={(e)=>handlesubmit(e)}>
          <input  placeholder='add newName' type="text" required ref={newName}/>
          <input placeholder='add pic' type="text" required ref={newPic}/>
          <button type="submit">Update</button>
         </form>
    </div>
   </div>
  )
}

 export default Update