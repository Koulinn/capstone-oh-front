import { initialState } from "../store"

export const chatReducer = (state = initialState.chat, action) => {

    switch (action.type) {
        case 'SET_ROOM':
            return {
                ...state,
                allChatsRooms: action.payload
            }

        default: {
            return state
        }

    }
}
