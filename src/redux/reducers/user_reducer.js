import { initialState } from "../store"

export const userReducer = (state = initialState.user, action) => {

    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLogged: true
            }

        case 'SET_LOGGED_OUT':
            return {
                ...state,
                isLogged: false
            }
        case 'SET_USER_TOKENS':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }

        case 'SET_USER_DATA':
            delete action.payload.refreshToken
            return {
                ...state,
                ...action.payload
                
            }

        default: {
            return state
        }

    }
}

