import { chatReducer } from "./chat-reducer";
import { userReducer } from "./user_reducer";
import { medicalRequest } from "./medicalRequest";




const reducerLib = {
    userReducer:userReducer,
    chatReducer:chatReducer,
    medicalRequest:medicalRequest
}

export default reducerLib