import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface loginState {
  loginObject: {
    currentAction: string,
    currentStatus: string,
  }
}

const initialState: loginState = {
  loginObject: {
    currentAction: 'login', // login || signup
    currentStatus: 'email_input' // email_input || password_inut || initial_registration
  },
}

export const loginSlice: Slice<loginState> = createSlice({
  name: 'login',
  initialState,
  reducers: {
    replaceAction: (state, action: PayloadAction<string>) => {
      state.loginObject.currentAction = action.payload
    },
    replaceStatus: (state, action: PayloadAction<string>) => {
      state.loginObject.currentStatus = action.payload
    },
  },
})

export const { replaceAction, replaceStatus } = loginSlice.actions

export default loginSlice.reducer