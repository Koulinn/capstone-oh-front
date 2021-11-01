import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'


const ADDRESS = process.env.REACT_APP_API_URL
export const socket = io(ADDRESS, { transports: ['websocket'] })



const mockUser = {
    _id: '617edbbc25fbe2e8d7fa795d',
    name: "Rafael",
    surname: "Limaa",
    avatar: "https://res.cloudinary.com/koulin/image/upload/v1635704994/OneHealth/patient/avatar/ti7wxty5xc2znimy34ca.png",
    email: "drdverzola@gmail.com",
    googleId: "114978369901583530553",
    phone_primary: "7895144568",
  };

// Get list of waiting users
// Open chat


function Chat() {

    useEffect(()=> {
        socket.on('connection', () => {
            
        })
        socket.on('waitingUsers', (payload) => {
           
        })
        socket.on('joinChat', (payload) => {
            socket.emit('joinSupportAssistant', payload)
        })


    },[])

    const requestAssistance =(user)=>{
        
        socket.emit('newUser', user)
    }
    return (
        <div>

            <h1>Chat</h1>
            <button onClick={()=>requestAssistance(mockUser)}>Request assistance</button>
            
        </div>
    )
}

export default Chat
