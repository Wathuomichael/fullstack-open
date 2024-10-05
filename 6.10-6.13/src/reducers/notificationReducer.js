import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return action.payload
    },
    remove(state, action) {
      return action.payload
    }
  }
})

export const { notify, remove } = notificationSlice.actions
export default notificationSlice.reducer
