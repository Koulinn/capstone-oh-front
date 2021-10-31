import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../redux/store/index.js'
import { BASE_URL } from './index.js';
import {setUserData, setUserLogIn, setUserTokens} from '../redux/actions/index.js'




const refreshAuthLogic = async (failedRequest) => {
    try {
        const storeState = store.getState()
        const refreshToken = storeState.user.refreshToken
        const dataResponse = await axios.post(BASE_URL + '/user/refreshToken', { refreshToken })
        store.dispatch(setUserTokens(dataResponse.data))
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + dataResponse.data.accessToken;
    
        return Promise.resolve()
        
    } catch (error) {
        console.log(error)
    }
}

createAuthRefreshInterceptor(axios, refreshAuthLogic);

const getMe = async (accessTokenParam) => {
    try {
        const storeState = store.getState()
        const {accessToken} = storeState.user
      
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + (accessTokenParam ? accessTokenParam : accessToken)
       
        const response = await axios.get(BASE_URL + "/user/me")

        store.dispatch(setUserData(response.data.user))
        store.dispatch(setUserLogIn())
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

const sendMedicalRequest = async (body)=>{
    try {
        const storeState = store.getState()
        const {accessToken} = storeState.user
       
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        const response = await axios.post(BASE_URL + "/user/bookTest", body)
        return response
        
    } catch (error) {
        console.log(error)
        return false
    }

}

const uploadAvatar = async(file) =>{
    try {
        const storeState = store.getState()
        const {accessToken} = storeState.user
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
           
        const response = await axios.put(BASE_URL + "/user/me/uploadAvatar",file)
        store.dispatch(setUserData(response.data.user))
        console.log(response)
        
    } catch (error) {
        console.log(error, 'Error from upload avatar')
        return false
    }
}
const updateUserData = async(data) =>{
    try {
        const storeState = store.getState()
        const {accessToken} = storeState.user
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
           
        const response = await axios.put(BASE_URL + "/user/me",data)
        store.dispatch(setUserData(response.data.user))
        console.log(response)
        
    } catch (error) {
        console.log(error, 'Error from upload avatar')
        return false
    }
}

const requests ={
    getMe:getMe,
    sendMedicalRequest:sendMedicalRequest,
    uploadAvatar:uploadAvatar,
    updateUserData:updateUserData
}
export default requests