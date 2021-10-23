import { initialState } from "../store"

export const medicalRequest = (state = initialState.medicalRequest, action) => {

    switch (action.type) {
        case 'SET_TAGS':
            return {
                ...state,
                tags: action.payload
            }
  
        default: {
            return state
        }

    }
}
