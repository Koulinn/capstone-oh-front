import React from 'react'

function ChatHeader() {
    return (
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
    )
}

export default ChatHeader
