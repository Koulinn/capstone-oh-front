import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { MdOutlineChatBubbleOutline } from 'react-icons/md'


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

const mockMessage = {
    senderID: '617edbbc25fbe2e8d7fa795d',
    senderRole: 'user',
    text: `I'm user patatine hello!`,
}

function Chat() {
    const [roomId, setRoomId] = useState(null)

    useEffect(() => {
        socket.on('connection', () => {

        })
        socket.on('waitingUsers', (payload) => {

        })
        socket.on('joinChat', (payload) => {
            setRoomId(payload, 'settoom state function')
            socket.emit('joinSupportAssistant', payload)
        })
        socket.on('recipientMessage', (payload) => {
            console.log('recipientMessage', payload)
        })


    }, [])

    const sendMessage = (message, roomID) => {
        console.log(roomID, 'from send message function')
        const payload = {
            message,
            roomID: roomID
        }
        socket.emit('newMessage', payload)
    }

    const requestAssistance = (user) => {

        socket.emit('newUser', user)
    }


    return (
        <div>

            <h1>Chat</h1>
            <button onClick={() => requestAssistance(mockUser)}>Request assistance</button>
            <button onClick={() => sendMessage(mockMessage, roomId)}>Send Message</button>
            <div className="chat-wrapper d-flex align-items-center justify-content-center cursor-pointer" onClick={() => requestAssistance(mockUser)}>
                <div className="d-flex align-items-center">
                    <MdOutlineChatBubbleOutline className="my-auto mr-3" />
                    <h4>Chat</h4>
                </div>
            </div>
        </div>
    )
}

export default Chat
