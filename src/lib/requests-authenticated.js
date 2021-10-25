import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../redux/store/index.js'
import { BASE_URL } from './index.js';




const refreshAuthLogic = async (failedRequest) => {
    const storeState = store.getState()

    const refreshToken = store.user.refreshToken
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

const getMe = async () => {
    try {
        
        const storeState = store.getState()
        const accessToken = storeState.user.accessToken
    
        console.log(storeState, 'USER DATA from REQUEST handler line 33')
        console.log(storeState, 'getstate from getMe')
    
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    
        const response = await axios.get(BASE_URL + "/user/me")
        console.log(response, ' from get me')
        return response
    } catch (error) {
        return false
    }
}


export default getMe