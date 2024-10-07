import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      console.log(action.payload)
      return action.payload
    },
    remove(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(remove(''))
    }, time * 1000)
  }
}

export const { notify, remove } = notificationSlice.actions
export default notificationSlice.reducer
