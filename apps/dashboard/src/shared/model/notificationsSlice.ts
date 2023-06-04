import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Notification } from './Notification'
import { HYDRATE } from 'next-redux-wrapper'

const sliceName = 'notifications'

export interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: []
}

export const notificationsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    pushNotification(state, action: PayloadAction<Omit<Notification, 'createdAt'>>) {
      const newNotification: Notification = {
        ...action.payload,
        createdAt: new Date().getTime()
      }
      state.notifications.push(newNotification)
    },
    clearNotifications(state) {
      state.notifications = []
    },
    removeNotification(state, action: PayloadAction<number>) {
      const index = state.notifications.findIndex((n) => Number(n.createdAt) === action.payload)
      state.notifications.splice(index, 1)
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload[sliceName]
      }
    }
  }
})

export const { pushNotification, clearNotifications, removeNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
