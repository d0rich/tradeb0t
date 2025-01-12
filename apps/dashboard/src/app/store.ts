import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import notificationsReducer from '@/src/shared/model/notificationsSlice'

const createStore = () =>
  configureStore({
    reducer: {
      notifications: notificationsReducer
    }
  })

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(createStore)
