import axios from 'axios'


const URL = process.env.REACT_APP_API_URL

const registerWithEmail = async (data)=>{
    try {
        const res = await axios.post(`${URL}/user`, data)
        return res
    } catch (error) {
        return false
    }
}

const regRequests = {
    registerWithEmail:registerWithEmail
}


export default regRequests