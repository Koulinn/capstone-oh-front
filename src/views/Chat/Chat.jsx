import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { MdOutlineChatBubbleOutline } from 'react-icons/md'
import ChatHistory from '../../components/ChatComponents/ChatHistory';
import ChatHeader from '../../components/ChatComponents/ChatHeader';
import ChatBottom from '../../components/ChatComponents/ChatBottom';
import { CSSTransition } from 'react-transition-group';
import useMediaQuery from '@mui/material/useMediaQuery';

const ADDRESS = process.env.REACT_APP_API_URL
export const socket = io(ADDRESS, { transports: ['websocket'] })


const hideMobile={
    minHeight: '0px !important',
    maxWidth: '0px !important',
    width: '0px !important',
    height: '0px !important',
    fontSize: '4rem'
}

function Chat({ showChat, setShowChat }) {
    const [roomId, setRoomId] = useState(null)
    const user = useSelector(s => s.user)
    const [currentMessageHistory, setCurrentMessageHistory] = useState([])
    const isMobile = useMediaQuery('(max-width:640px)');

    useEffect(() => {
        socket.on('connection', () => {

        })
        socket.on('waitingUsers', (payload) => {

        })
        socket.on('joinChat', (payload) => {
            setRoomId(payload, 'settoom state function')
            socket.emit('joinSupportAssistant', payload)
        })


    }, [])

    const updateChatMessages = (payload) => {

        console.log(currentMessageHistory, ' Before set current message history')
        setCurrentMessageHistory([...currentMessageHistory, payload])
        console.log('recipientMessage', payload)
    }

    useEffect(() => {
        socket.on('recipientMessage', updateChatMessages)
        return () => {
            socket.off('recipientMessage', updateChatMessages)
        }
    }, [currentMessageHistory])

    const requestAssistance = (user) => {
        console.log('inside request assistance')
        delete user.refreshToken
        setShowChat(!showChat)

        socket.emit('newUser', user)
    }


    return (
        <div>
            <div 
            className={"chat-wrapper d-flex align-items-center justify-content-center " }>
                {!isMobile && <div
                    className="d-flex w-100 align-items-center justify-content-center cursor-pointer"
                    
                    onClick={() => requestAssistance(user)}
                >
                    <MdOutlineChatBubbleOutline className="my-auto mr-3" />
                    <h4>Chat</h4>
                </div>}

                <CSSTransition
                    in={showChat}
                    timeout={5000}
                    classNames="fade"
                    mountOnEnter={true}
                    unmountOnExit={true}
                    appear={true}
                >
                    <div className="chatDisplay-wrapper">
                        <div className="position-relative">
                            <ChatHeader setShowChat={setShowChat} />
                            <ChatHistory currentMessageHistory={currentMessageHistory} />
                            <ChatBottom />
                        </div>

                    </div>

                </CSSTransition>

            </div>
        </div>
    )
}

export default Chat
