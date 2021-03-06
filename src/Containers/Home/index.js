// import React from 'react'
 import Layout from '../../Components/layout'

// /**
// * @author
// * @function HomePage
// **/

// const HomePage = (props) => {
  
//   return(
//       <Layout>
//        <div>HomePage</div>
//       </Layout>
    
//    )

//  }

// export default HomePage
import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeConversations, getRealTimeUsers, updateMessage } from '../../actions/user.actions';
const User = props => {
    const {user ,onClick} = props;
return(
               <div onClick={()=>onClick(user)} key={user.uid} className="displayName">
                    <div className="displayPic">
                        <img src="https://avatars1.githubusercontent.com/u/54733827?v=4" alt="Dp" />
                    </div>
                    <div style={{display: 'flex',flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                        <span style={{fontWeight: 500}}>{user.FirstName} {user.LastName}</span>
                        <span className={user.isOnline ? 'onlineStatus': 'onlineStatus off'}>
                        </span>
                    </div>
                </div>
)
}
const HomePage = (props) => {
   const dispatch = useDispatch() 
   let unsubscribe;
   const auth = useSelector(state => state.auth)
   const user = useSelector(state => state.user)
   const [ChatStarted,setChatStarted] =useState(false)
   const [ChatUser,setChatUser] =useState('')
   const [message,setmessage] =useState('')
   const [UserUid,setUserUid] =useState('')

   

    useEffect(()=>{
       unsubscribe =  dispatch(getRealTimeUsers(auth.uid))
          .then((unsubscribe)=>{
             return unsubscribe
          })
          .catch((err)=>{
              console.log(err)
          })

       
    }, [])

    useEffect(()=>{
        return ()=>{
            unsubscribe.then(f=>f()).catch(err=>console.log(err))
        }
    },[])

    const initChat = (user) => {
             setChatStarted(true)
             setUserUid(user.uid)
             setChatUser( `${user.FirstName} ${user.LastName}`)
             console.log(user)
             dispatch(getRealTimeConversations({uid_1: auth.uid,uid_2: user.uid }))
    } 
    const submitMsg = () => {
        console.log('came')
         const msgObj ={
             user_uid_1: auth.uid,
             user_uid_2: UserUid,
             message
         }
         if(message!==''){
             dispatch(updateMessage(msgObj))
             .then(()=>{
               setmessage('')
             })
         }
         
    }
  return (
      <Layout>
    <section className="container">
    <div className="listOfUsers">
       {
           user.users.length > 0 ? 
           user.users.map(user => {
               return(
                 <User onClick={initChat} key={user.uid} user={user}/>
               )
           })
           : null
       }
                
    </div>
    <div className="chatArea">
      
          
        <div className="chatHeader">
               {
                   ChatStarted?
                   ChatUser: 'Start Chating By Clicking On Users'
                   
               }
        </div>
       
        <div className="messageSections">
            {
                ChatStarted?
                user.conversations.map(con=>
                    <div style={{ textAlign: con.user_uid_1==auth.uid? 'right': 'left' }}>
                      <p className="messageStyle" >{con.message}</p>
                   </div>
                )
                
                : ""
            
           
            }
        </div>
        {
            ChatStarted?
            <div className="chatControls">
               <textarea
               className='textarea' 
               value={message}
               placeholder='Enter Message'
               onChange={(e)=> setmessage(e.target.value)}    
               onKeyDown={(event)=>{
                   if(event.key=='Enter'){
                        return submitMsg()
                       
                   }
               }}
               >

               </textarea>
                <button className='SendButton' onClick={submitMsg}>Send</button>
            </div>: null
        }
    </div>
</section>
</Layout>
  );
}

export default HomePage;