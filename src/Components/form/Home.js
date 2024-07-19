import React, { useContext, useEffect, useState } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Home.css'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {auth} from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Context } from './Authcontext';
import Update from './Update';
import { collection,
          addDoc,doc,
          setDoc,getDocs,
          serverTimestamp, 
          onSnapshot,
          query,where,orderBy, updateDoc} from "firebase/firestore"; 
           import { deleteDoc } from "firebase/firestore";
import { db } from './firebase';
import TimeAgo from 'react-timeago'
import ReactTimeago from 'react-timeago';
import { findIndex } from 'lodash';


const Home = () => {
  const navigate=useNavigate()
    const {user}=useContext(Context)
   const[Post,setPost]=useState("")
   const[emoji,setEmoji]=useState([{id:1,
                                    img:"assets/1.png",
                                    name:"Awful"},
                                    {id:2,
                                      img:"assets/2.png",
                                      name:"Bad"},
                                     {id:3,
                                        img:"assets/3.png",
                                        name:"Meh"},
                                      {id:4,
                                          img:"assets/4.png",
                                          name:"Good"},
                                      {id:5,
                                       img:"assets/5.png",
                                        name:"Amazing"} ])
   const[selectedEmoji,setSelectedEmoji]=useState(0)
   const[users,setUsers]=useState([])
   const[loading,setLoading]=useState(true)
   const[fetchdata,setFetchdata]=useState([])
   const[fetchid,setfetchid]=useState([])
  console.log(user)

  function logout(e)
  {
     e.preventDefault()
     signOut(auth)
    .then((auth)=>{navigate('/')})
    .catch((error)=>error.message)
  }

 async function HandlePostButton()
  {
    const user=auth.currentUser
   
    if(Post)
   {
      try {
        const docRef = await addDoc(collection(db, "Newyear"),
          {
          body:Post ,  
          UserId:user.uid,
          DisplayName:user.displayName,
          createdAt:serverTimestamp(),
          mood:selectedEmoji
          })
         setPost("")
         setSelectedEmoji(0)
         
        //addDoc is a func to add documents which pass two parameters
        //(1.collection fn with db,collection id)
        //(2.object with fields and values) =>this is wat we exactly pushg in the db
        // await setDoc(doc(db, "cities", "India"),        =>which helps create our own id

         console.log("Document written with ID: ",docRef.id);
        
          }
    catch (e) {
       console.error("Error adding document: ", e);
           }
   }
  }
  

  function handleClick(id)
    {
       setSelectedEmoji(id)
       console.log(selectedEmoji)
       
    }
   
      // useEffect(async()=>{

      //   // const subscribe=firestore().collection("Info").onSnapshot(querySnapshot=>{
      //   //      const users=[];
       
      //   const querySnapshot = await getDocs(collection(db, "Info"))
      //   const array=[];
      //        querySnapshot.forEach((docs)=>{
              
      //          array.push({...docs.data(),key:docs.id})
      //        });
      //        setUsers(array)
      //        setLoading(false)
      //        return()=>querySnapshot();
              
        
      //  },[])
    
      //  console.log(users)
// useEffect(()=>{
//   async function  HandleFetchPostButton()
// {
 
//    try{
// const querySnapshot =await getDocs(collection(db, "Dec"))
//   const newData=[]
//   querySnapshot.forEach((doc) => { 
//       // console.log(doc.id, " => ", doc.data());
//       newData.push(doc.data())
//       // console.log(doc.data())
//       setFetchdata(newData);
//  });
// //  if (newData!= fetchdata) {
//   // setFetchdata(newData);
// // }
// // var info=doc.data()
//       // setFetchdata((arr)=>[...arr,info])
//       //  console.log(fetchdata)
//  }
// catch (e) {
//   console.error("Error adding document: ", e);
//      }
// }
// return()=>HandleFetchPostButton()
// },[fetchdata])   
    useEffect(()=>{
      function fetchInRealtime()
        {
          //,where("UserId","==",user.uid)
           const user=auth.currentUser
           const NewRef=collection(db,"Newyear")
           const q=query(NewRef,orderBy("createdAt", "desc"))
          //query particular abt things
           onSnapshot(q,(querySnapshot)=>{
            // onSnapshot(collection(db,"Newyear"),(querySnapshot)=>{
            const newData=[]
            const newid=[]
            querySnapshot.forEach((doc)=>{ 
              console.log(doc.id)   
              newData.push(doc.data())
              newid.push(doc.id)
              setFetchdata(newData)
              setfetchid(newid)
              // Newfn(doc)
          })  
        })}
        return()=>fetchInRealtime()
    },[Post])

 console.log(fetchdata)
//   function displaydate(firebaseDate)
//   {
//     const date=firebaseDate.toDate().toDateString()
//     const day=date.getDate();
    
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May",
//                        "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//    const month=monthNames[date.getMonth()];
//     const year=date.getFullYear()
//      let hours=date.getHours()
//      let minutes=date.getMinutes()
//     return `${day} ${month} ${year}-${hours}:${minutes}`
//   }
//   // const photourl=user.photoURL;
  
      // if(index !==-1)
      // {
      //  fetchdata.splice(index,1)
      //  console.log(fetchdata)
       const handleEditButton=async(wholedoc,index,fetchid)=>{
       console.log(fetchid)
        const postdata=wholedoc.body;
         const postId=fetchid[index]
         console.log(postId)
        const postRef= doc(db, "Newyear", postId)
          const newbody=prompt("edit" ,postdata.body)
        await updateDoc(postRef, {
          body: newbody
         })
       console.log("edited")
      }

       
      // const handleDeleteButton=(index)=>{
      //   console.log(index)
      //    for (let i=0;i<=fetchdata.length;i++)
      //    {
      //     if(index===i)
      //     {
      //       fetchdata.splice(i,1)
      //       console.log(fetchdata)
      //       setFetchdata(fetchdata)
      //     }
      //    }
      // }
    const handleDeleteButton=async(fetchid,index)=>
    { 
      const postId=fetchid[index]
      await deleteDoc(doc(db, "Newyear", postId))
      console.log(fetchdata)
    }
  
  return (
    <div>
          <nav className='nav_bar' style={{backgroundColor:"#fff"}}>
            <h3>WELCOME TO FACEAPP</h3>

            <IconButton   onClick={logout} style={{fontSize:"large"}}>
            <ExitToAppIcon />
            </IconButton>  
            </nav>
 
       <div className="app_container">
         <div className="user_section"> 
            <img src={user.photoURL} alt="" width="100px"/> 
            <p style={{textAlign:"center", color:"white",fontSize:"1.4em"}}>hey {user.displayName},How r u?</p>
                
            <div className="emoji_section">
                  {emoji.map((item)=>(<>
                    <button id="mood-1" className="mood-emoji-btn" onClick={()=>handleClick(item.id)}>
                      <img src={item.img} alt=""/>
                      <div className="emoji_text" style={{color:"#FFF"}}>{item.name}</div>
                    </button>
                    </> 
                    ))}
            </div>
              <div className="post_section">
                    <textarea className='post_textarea'
                    placeholder="Write down how you're feeling..."
                    value={Post}
                    onChange={(e)=>setPost(e.target.value)} 
                    >
                    </textarea>
                    <button className='post_btn'onClick={HandlePostButton}>Post</button>
                     {/* <button className='fetchpost_btn'onClick={HandleFetchPostButton}>Fetch Post</button>   */}

                      {fetchdata?.map((item,index)=>{
                       return <div id="fetch_data" className="post_section"  key={item.id}>   
                         <div className="flex_post">
                            <div className="flex_item">
                              <ReactTimeago date={new Date(item.createdAt?.toDate()).toLocaleString()}/>
                                <img src= {`assets/${item.mood}.png`} alt=""/>   
                            </div> 
                            <p className='fetch_info'>{item.body}</p>  
                            <IconButton onClick={()=>handleEditButton(item,index,fetchid)}>
                              <EditIcon/>
                              </IconButton> 
                              <IconButton  onClick={()=>handleDeleteButton(fetchid,index)}>
                              <DeleteIcon/>
                              </IconButton> 
                          </div>
                          </div>
                         }
                          )
                       }  
                
          
              </div>
         </div> 
       </div>
     </div>
  )
}

export default Home