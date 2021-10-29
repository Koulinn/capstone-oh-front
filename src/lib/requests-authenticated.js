import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../redux/store/index.js'
import { BASE_URL } from './index.js';
import {setUserData, setUserLogIn} from '../redux/actions/index.js'




const refreshAuthLogic = async (failedRequest) => {
    const storeState = store.getState()

   
    const refreshToken = storeState.user.refreshToken
    const tokenRefreshResponse = await axios.post(BASE_URL + '/user/refreshToken', { refreshToken })
    console.log(storeState, 'storeSTate')
    console.log('Tokenresponse', tokenRefreshResponse)

    // localStorage.setItem('token', tokenRefreshResponse.data.refreshToken);
    // localStorage.setItem('accessToken', tokenRefreshResponse.data.accessToken);


    // console.log(tokenRefreshResponse, 'Token refresh response')

    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;

    return Promise.resolve()
}

createAuthRefreshInterceptor(axios, refreshAuthLogic);

const getMe = async (accessTokenParam) => {
    try {
        
        const storeState = store.getState()
        const {accessToken} = storeState.user
        console.log(accessToken, 'AccessToken from store')
        console.log(accessTokenParam, 'accessTokenParam from store')
       
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + (accessTokenParam === (undefined || null) ? accessToken : accessTokenParam)
       
    
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

const requests ={
    getMe:getMe,
    sendMedicalRequest:sendMedicalRequest,
}
export default requests