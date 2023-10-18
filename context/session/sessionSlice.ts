import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/context/store'

export interface UserState {
  id: number | undefined
  name: string
  email: string
  role: string
  avatar: string
}

export interface SessionState {
  user: User
  // accessToken: string
}

const initialState: SessionState = {
  user: { id: undefined, name: '', email: '', role: '', avatar: '' },
  // accessToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionState>) => {
      console.log('setSession:', action.payload.user)
      state.user = action.payload.user
      // state.accessToken = action.payload.accessToken
    },
    deleteSession: () => ({ ...initialState }),
  },
})

export const { setSession, deleteSession } = userSlice.actions

export const selectSession = (state: RootState) => state.session

export default userSlice.reducer
