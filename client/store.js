import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import socket from './socket'

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER'

// ACTION CREATORS
export const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
}

export const writeMessage = inputContent => {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent
  }
}

export const gotNewMessageFromServer = message => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message
  }
}

// THUNK CREATORS
export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get('/api/messages')
    const messages = response.data
    dispatch(gotMessagesFromServer(messages))
  }
}

export const sendMessage = message => {
  return async dispatch => {
    const response = await axios.post('/api/messages', message)
    const newMessage = response.data
    dispatch(gotNewMessageFromServer(newMessage))
    socket.emit('new-message', newMessage)
  }
}

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: ''
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages }
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry }
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] }
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
