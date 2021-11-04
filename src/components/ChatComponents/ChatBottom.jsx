import React, {useState} from 'react'
import { MdSend, MdOutlineAttachment } from 'react-icons/md'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useSelector } from 'react-redux'
import { socket } from '../../views/Chat/Chat'
import regRequests from '../../lib/requests-handlers';

const { uploadCloudinary } = regRequests

function ChatBottom() {
    const userId = useSelector(s => s.user._id)
    const [imgPreview, setImgPreview] = useState(null)


    const showImagePreview = (file) => {
        const objectURL = URL.createObjectURL(file)
        setImgPreview(objectURL)
    }


    const sendMessage = async (e) => {
        e.preventDefault()
        const fileObj = e.target[2].files[0]
        let imgUrl = null
        if (fileObj) {
            imgUrl = await uploadCloudinary(fileObj)
        }
        const message = {
            senderID: userId,
            senderRole: 'user',
            text: e.target[0].value,
            files: imgUrl
        }

        const payload = {
            message,
            roomID: userId
        }
        socket.emit('newMessage', payload)
        setImgPreview(null)
    }


    return (
        <div>
            {imgPreview ? <img src={imgPreview} alt="" width='64' height="64" /> : ''}
            <form onSubmit={sendMessage} className="chatInput-wrapper d-flex justify-content-between align-items-center py-3">
                <TextareaAutosize
                    className="text-area-wrapper ml-3"
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Enter your message"

                />
                <div
                    className="sendAttachment-Btn-wrapper d-flex justify-content-center align-items-center cursor-pointer mx-3"
                    onChange={(e) => showImagePreview(e.target.files[0])}
                >
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
