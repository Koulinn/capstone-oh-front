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
const login = async (data)=>{
    try {
        const res = await axios.post(`${URL}/user/login`, data)
        return res
    } catch (error) {
        return false
    }
}

const medicalTestsSuggestions = async(inputValue)=>{
    try {
        console.log(inputValue)
        const res= await axios.get(`${URL}/hospital?testName=${inputValue}`)
        return res
    } catch (error) {
        console.log(error)
        return false
    }
}

const regRequests = {
    registerWithEmail:registerWithEmail,
    login:login,
    medicalTestsSuggestions:medicalTestsSuggestions
}


export default regRequests