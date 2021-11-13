import React from 'react'
import {format} from 'date-fns'

function ChatMessage({ user, message, img }) {
    console.log(message.senderRole)
    return (
        <div className={"position-relative w-75 my-3" + (user ? ' align-self-end' : '')}>
            <div className={"px-3 pt-3 pb-2 d-block" + (user ? ' userMessage-wrapper' : ' assistantMessage-wrapper')} >
                {img ?
                    <img
                        className="mb-2"
                        src={img}
                        alt=""
                    />
                    : ''
                }
                <p style={{overflowWrap: 'anywhere'}}>{message.text}</p>
                <small className="d-block" style={{textAlign:(message.senderRole === 'user' ? 'right' : 'left')}}>{format(new Date(message.createdAt), 'HH:mm')}</small>
            </div>

        </div>
    )
}

export default ChatMessage
