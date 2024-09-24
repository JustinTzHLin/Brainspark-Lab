import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface loginState {
  loginObject: {
    currentAction: string,
    status: string,
  }
}

const initialState: loginState = {
  loginObject: {
    currentAction: 'login',
    status: 'email'
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
      state.loginObject.status = action.payload
    },
  },
})

export const { replaceAction, replaceStatus } = loginSlice.actions

export default loginSlice.reducer