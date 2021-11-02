import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { MdOutlineChatBubbleOutline, MdSend, MdOutlineAttachment } from 'react-icons/md'
import TextareaAutosize from '@mui/material/TextareaAutosize';


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
    const [showChat, setShowChat] = useState(false)

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
        setShowChat(true)

        socket.emit('newUser', user)
    }


    return (
        <div>

            <h1>Chat</h1>
            <button onClick={() => requestAssistance(mockUser)}>Request assistance</button>
            <button onClick={() => sendMessage(mockMessage, roomId)}>Send Message</button>
            <div className="chat-wrapper d-flex align-items-center justify-content-center" onClick={() => requestAssistance(mockUser)}>
                <div className="d-flex align-items-center cursor-pointer">
                    <MdOutlineChatBubbleOutline className="my-auto mr-3" />
                    <h4>Chat</h4>
                </div>
                {showChat ?
                    <div className="chatDisplay-wrapper">
                        <div className="position-relative">
                            <div className="chatSupport-wrapper p-3 w-100">
                                <div className="pb-3">
                                    <h3>OneHealth Support</h3>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="supportAvatar-wrapper">
                                        <img src="https://www.cdbradshaw.com/wp-content/uploads/2021/07/generic-avatar.jpg" alt="" />
                                    </div>
                                    <div className="ml-3">
                                        Mary Doe
                                    </div>
                                </div>
                            </div>
                            <div className="chatMessages-wrapper d-flex flex-column text-truncate p-3">

                                <div className="d-flex flex-column">
                                    <div className="position-relative w-75 my-3 align-self-end" >
                                        <div className=" userMessage-wrapper p-3 d-block text-truncate" >
                                            <p className="text-truncate">kj ahsdkj hsahdasdasdasdasda sadasdashgsdadjasgdkjasdasdasd asd asdjghasgdjhasgdajhsgdajhsagdjas gdas sdas</p>
                                            <span> 11:20</span>
                                        </div>

                                    </div>
                                    <div className="position-relative w-75 my-3">
                                        <div className="assistantMessage-wrapper p-3 d-block text-truncate" >
                                            <p className="text-truncate">kj ahsdkj hsahdasdasdasdasda sadasdashgsdadjasgdkjasdasdasd asd asdjghasgdjhasgdajhsgdajhsagdjas gdas sdas</p>
                                            <span> 11:20</span>
                                        </div>

                                    </div>
                                    <div className="position-relative w-75 align-self-end my-3">
                                        <div className=" userMessage-wrapper p-3 d-block text-truncate align-self-end" >
                                            <p className="text-truncate">kj ahsdkj hsahdasdasdasdasda sadasdashgsdadjasgdkjasdasdasd asd asdjghasgdjhasgdajhsgdajhsagdjas gdas sdas</p>
                                            <span> 11:20</span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="chatInput-wrapper d-flex justify-content-between align-items-center py-3">
                                <TextareaAutosize
                                    className="text-area-wrapper ml-3"
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Enter your message"

                                />
                                <div className="sendAttachment-Btn-wrapper d-flex justify-content-center align-items-center cursor-pointer mx-3">
                                    <label htmlFor="fileField" className="cursor-pointer m-0">
                                    <MdOutlineAttachment />
                                    </label>
                                    <input type="file" id="fileField" className="d-none" />
                                </div>
                                <div className="sendMessage-Btn-wrapper d-flex justify-content-center align-items-center cursor-pointer mr-3">
                                    <MdSend />
                                </div>

                            </div>
                        </div>

                    </div>
                    : ''}
            </div>
        </div>
    )
}

export default Chat
