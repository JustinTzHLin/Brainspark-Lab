import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface loginState {
  userAccess: {
    currentAction: string;
    currentStatus: string;
    loggedIn: boolean;
    isLoadingModalOpen: boolean;
  };
}

const initialState: loginState = {
  userAccess: {
    currentAction: "login", // login || signup
    currentStatus: "email_input", // email_input || password_inut || initial_registration
    loggedIn: false,
    isLoadingModalOpen: true,
  },
};

export const loginSlice: Slice<loginState> = createSlice({
  name: "login",
  initialState,
  reducers: {
    replaceAction: (state, action: PayloadAction<string>) => {
      state.userAccess.currentAction = action.payload;
    },
    replaceStatus: (state, action: PayloadAction<string>) => {
      state.userAccess.currentStatus = action.payload;
    },
    replaceLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.userAccess.loggedIn = action.payload;
    },
    replaceIsLoadingModalOpen: (state, action: PayloadAction<boolean>) => {
      state.userAccess.isLoadingModalOpen = action.payload;
    },
  },
});

export const {
  replaceAction,
  replaceStatus,
  replaceLoggedIn,
  replaceIsLoadingModalOpen,
} = loginSlice.actions;

export type replaceActionType = typeof replaceAction;
export type replaceStatusType = typeof replaceStatus;
export type replaceLoggedInType = typeof replaceLoggedIn;
export type replaceIsLoadingModalOpenType = typeof replaceIsLoadingModalOpen;

export default loginSlice.reducer;
