import React from "react";
import { MdOutlineClose } from "react-icons/md";

function ChatHeader({ setShowChat }) {
    return (
        <div className="chatSupport-wrapper d-flex justify-content-between align-items-center p-3 w-100">
            <div className="">
                <h5 className="text-white">Support Chat</h5>
            </div>
            <div className="cursor-pointer">
                <MdOutlineClose onClick={() => setShowChat(false)} />
            </div>
            {/* <div className="d-flex align-items-center">
                <div className="supportAvatar-wrapper">
                    <img src="https://www.cdbradshaw.com/wp-content/uploads/2021/07/generic-avatar.jpg" alt="" />
                </div>
                <div className="ml-3">
                    Mary Doe
                </div>
            </div> */}
        </div>
    );
}

export default ChatHeader;
