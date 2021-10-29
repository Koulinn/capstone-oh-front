import axios from 'axios'

export const setUserData = (payload) => ({
  type: 'SET_USER_DATA',
  payload: payload
})
export const setUserLogIn = () => ({
  type: 'SET_LOGGED_IN',
})

export const setUserTokens = (payload) => ({
  type: 'SET_USER_TOKENS',
  payload: payload
})
export const setUserLogOut = (payload) => ({
  type: 'SET_LOGGED_OUT',
})


