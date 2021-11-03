import React from 'react'
import { MdSend, MdOutlineAttachment } from 'react-icons/md'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {useSelector} from 'react-redux'
import {socket} from '../../views/Chat/Chat'

function ChatBottom() {
    const userId = useSelector(s => s.user._id)

    const sendMessage = (e) => {
        e.preventDefault()
        const message = {
          senderID: userId,
          senderRole: 'user',
          text: e.target[0].value,
        }
        
        const payload = {
          message,
          roomID: userId
        }
        console.log(payload, 'message payload')
        socket.emit('newMessage', payload)
      }
    return (
        <div >
            <form onSubmit={sendMessage} className="chatInput-wrapper d-flex justify-content-between align-items-center py-3">
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
                <button type="submit">
                    <div className="sendMessage-Btn-wrapper d-flex justify-content-center align-items-center cursor-pointer mr-3">
                        <MdSend />
                    </div>
                </button>
            </form>

        </div>
    )
}

export default ChatBottom
