"use client";
import React, { useRef, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import QuizHeader from "./components/quizHeader";
import QuizContent from "./components/quizContent";
import SubmitAnswerModal from "./modals&popovers/submitAnswerModal";
import AnswerResultModal from "./modals&popovers/answerResultModal";

const Quiz = () => {
  /*  Quiz Example
  const quizExample = {questionNumber: 5, category: 'geography', difficulty: 'easy', questionType: 'any', data:[{"type":"multiple","difficulty":"easy","category":"Geography","question":"Which Russian oblast forms a border with Poland?","correct_answer":"Kaliningrad","incorrect_answers":["Samara","Nizhny Novgorod","Omsk"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Vatican City is a country.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What is the capital of Indonesia?","correct_answer":"Jakarta","incorrect_answers":["Bandung","Medan","Palembang"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Alaska is the largest state in the United States.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What country has a horizontal bicolor red and white flag?","correct_answer":"Monaco","incorrect_answers":["Bahrain","Malta","Liechenstein"]}]};
  */
  const quizObject = useAppSelector((state) => state.quiz.quizObject);
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const router = useRouter();
  const { questionNumber, category, difficulty, questionType, data } =
    quizObject;
  const [quizIndex, setQuizIndex] = useState(0);
  const [quiz, setQuiz] = useState(
    data[0] || {
      type: "",
      difficulty: "",
      category: "",
      question: "",
      correct_answer: "",
      incorrect_answers: [],
    }
  );
  const [buttonBorderColor, setButtonBorderColor] = useState(
    Array(4).fill("0px 0px 0px 0px #18181b inset")
  );

  // Shuffle options array
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const [options, setOptions] = useState(
    shuffleArray(
      quiz.correct_answer
        ? [quiz.correct_answer].concat(quiz.incorrect_answers)
        : []
    )
  );
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(questionNumber).fill("")
  );
  const [correctCount, setCorrectCount] = useState(0);
  const [geminiContentObj, setGeminiContentObj] = useState<{
    correctAnswer: string;
    incorrectAnswers: string[];
  }>({ correctAnswer: "", incorrectAnswers: ["", "", "", ""] });
  const [geminiContentSuccess, setGeminiContentSuccess] = useState(false);
  const [submitAnswerIsOpen, setSubmitAnswerIsOpen] = useState(false);
  const cancelSubmitAnswerRef = useRef<null | HTMLButtonElement>(null);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [geminiModalIsOpen, setGeminiModalIsOpen] = useState(false);

  // Handle clicked option
  const handleSelectedChoice = (index: number) => {
    const newButtonBorder = [];
    for (let i = 0; i < 4; i++) {
      if (i === index) newButtonBorder.push("0px 0px 0px 5px #18181b inset");
      else newButtonBorder.push("0px 0px 0px 0px #18181b inset");
    }
    setButtonBorderColor(newButtonBorder);
  };

  // Handle select option process
  const selectOption = (index: number) => {
    handleSelectedChoice(index);
    setUserAnswers(userAnswers.toSpliced(quizIndex, 1, options[index]));
  };

  // Handle click quiz status button
  const handleChangeQuestion = (questionIndex: number) => {
    console.log("handle change question");
    console.log(userAnswers);
    if (questionIndex < questionNumber) {
      setQuizIndex(questionIndex);
      setQuiz(data[questionIndex]);
      setButtonBorderColor(Array(4).fill("0px 0px 0px 0px #18181b inset"));
      const newOptions = shuffleArray(
        [data[questionIndex].correct_answer].concat(
          data[questionIndex].incorrect_answers
        )
      );
      setOptions(newOptions);
      for (let i = 0; i < newOptions.length; i++) {
        if (newOptions[i] === userAnswers[questionIndex])
          handleSelectedChoice(i);
      }
    } else setSubmitAnswerIsOpen(true);
  };

  // Check and store answers process
  const checkAnswers = () => {
    let counting = 0;
    for (const [index, currentAnswer] of userAnswers.entries()) {
      if (
        currentAnswer.toLowerCase() === data[index].correct_answer.toLowerCase()
      )
        counting++;
      console.log(currentAnswer, data[index].correct_answer, index);
    }
    fetch(BACKEND_URL + "/quiz/storeResult", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }, // user questionNumber, category, difficulty, questionType, dataArray, answerArray, correctCount
      body: JSON.stringify({
        questionNumber,
        category,
        difficulty,
        questionType,
        dataArray: data,
        answerArray: userAnswers,
        correctCount: counting,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("LoginForm fetch /signUp: Error: ", err));
    setCorrectCount(counting);
    setSubmitAnswerIsOpen(false);
    setCheckAnswer(true);
  };

  // Gemini generate explanation process
  const askGemini = () => {
    setGeminiContentSuccess(false);
    setGeminiModalIsOpen(true);
    fetch("/api/gemini/quizInformation", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizObject: quiz,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const responseArray = data.response
          .slice(0, data.response.indexOf("/n"))
          .split("##")
          .map((sentence: string) => sentence.trim());
        setGeminiContentObj({
          correctAnswer: responseArray[0],
          incorrectAnswers: responseArray.slice(1),
        });
        setGeminiContentSuccess(true);
      })
      .catch((err) =>
        console.log("Quiz fetch /api/gemini/quizInformation: Error: ", err)
      );
  };

  // Reset Gemini prompt variables
  const resetGeminiContent = () =>
    setGeminiContentObj({
      correctAnswer: "",
      incorrectAnswers: ["", "", "", ""],
    });

  // Handle Gemini modal close
  const handleGeminiModalClose = () => {
    setGeminiModalIsOpen(false);
    resetGeminiContent();
  };

  return (
    <Flex width="full" align="center" justifyContent="center" h="100vh">
      <Box p={8} maxW="full" borderWidth={1} borderRadius={8} boxShadow="md">
        <QuizHeader
          askGemini={askGemini}
          geminiModalIsOpen={geminiModalIsOpen}
          handleGeminiModalClose={handleGeminiModalClose}
          geminiContentSuccess={geminiContentSuccess}
          geminiContentObj={geminiContentObj}
          quiz={quiz}
          quizIndex={quizIndex}
          questionNumber={questionNumber}
          userAnswers={userAnswers}
          handleChangeQuestion={handleChangeQuestion}
        />
        <QuizContent
          quizIndex={quizIndex}
          quiz={quiz}
          buttonBorderColor={buttonBorderColor}
          options={options}
          selectOption={selectOption}
          handleChangeQuestion={handleChangeQuestion}
        />
      </Box>

      {/* Submit Answer Modal */}
      <SubmitAnswerModal
        submitAnswerIsOpen={submitAnswerIsOpen}
        setSubmitAnswerIsOpen={setSubmitAnswerIsOpen}
        cancelSubmitAnswerRef={cancelSubmitAnswerRef}
        checkAnswers={checkAnswers}
      />

      {/* Answer Result Modal */}
      <AnswerResultModal
        checkAnswer={checkAnswer}
        setCheckAnswer={setCheckAnswer}
        router={router}
        questionNumber={questionNumber}
        correctCount={correctCount}
      />
    </Flex>
  );
};

export default Quiz;
