import React from 'react'

function ChatMessage({user, message}) {
    return (
        <div className={"position-relative w-75 my-3" + (user? ' align-self-end' : '' ) }>
            <div className={"p-3 d-block text-truncate" + (user? ' userMessage-wrapper' : ' assistantMessage-wrapper' )} >
                <p className="text-truncate">{message.text}</p>
                <span>{message.createdAt}</span>
            </div>

        </div>
    )
}

export default ChatMessage
