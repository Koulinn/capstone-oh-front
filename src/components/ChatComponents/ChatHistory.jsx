import React from 'react'
import ChatMessage from './ChatMessage'

function ChatHistory({currentMessageHistory}) {
    return (
        <div className="chatMessages-wrapper d-flex flex-column text-truncate p-3">
            <div className="d-flex flex-column">
                {currentMessageHistory.map(m=>
                <ChatMessage 
                key={m._id} 
                message={m}
                img={m.files || null}
                user={m.senderRole !== 'assistant'? true : false} 
                />)}
            </div>
        </div>
    )
}

export default ChatHistory
