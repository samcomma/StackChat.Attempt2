import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'

// ACTION CREATORS
export const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
}

// INITIAL STATE
const initialState = {
  messages: []
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages }
    default:
      return state
  }
}

// STORE
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
export default store
