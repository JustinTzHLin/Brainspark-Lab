import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface QuizState {
  quizObject: {
    questionNumber: number;
    category: string;
    difficulty: string;
    questionType: string;
    data: any;
  };
}

const initialState: QuizState = {
  quizObject: {
    questionNumber: 0,
    category: "",
    difficulty: "",
    questionType: "",
    data: [],
  },
};

export const quizSlice: Slice<QuizState> = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    replaceQuiz: (state, action: PayloadAction<QuizState["quizObject"]>) => {
      state.quizObject = action.payload;
    },
  },
});

export const { replaceQuiz } = quizSlice.actions;

export default quizSlice.reducer;
