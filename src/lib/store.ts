import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './features/quizSlice';
import loginReducer from './features/loginSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    login: loginReducer
  },
})

// Infer the type of makeStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;