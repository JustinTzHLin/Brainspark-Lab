"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { replaceQuiz } from "@/lib/features/quizSlice";
import { Flex, Box, Heading, Icon, IconButton } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { LuUserCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";
import axios from "axios";
import QuizFormContent from "./components/quizFormContent";

const QuizForm = () => {
  const [questionNumber, setQuestionNumber] = useState(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [questionTypes, setQuestionTypes] = useState([true, false, false]);
  const questionType = ["any", "multiple", "boolean"].filter(
    (el, i) => questionTypes[i]
  )[0];
  const router = useRouter();

  const [recentQuestionNumber, setRecentQuestionNumber] = useState(10);
  const [recentCategory, setRecentCategory] = useState("any");
  const [recentDifficulty, setRecentDifficulty] = useState("any");
  const [recentQuestionType, setRecentQuestionType] = useState("any");

  const dispatch = useAppDispatch();

  // Handle click start quiz
  const handleStartQuiz = async () => {
    // Create api string
    let triviaApiString = "https://opentdb.com/api.php?";
    console.log(questionNumber);
    console.log(category);
    console.log(difficulty);
    console.log(questionType);
    triviaApiString += `amount=${questionNumber}`;
    triviaApiString += category !== "any" ? `&category=${category}` : "";
    triviaApiString += difficulty !== "any" ? `&difficulty=${difficulty}` : "";
    triviaApiString += questionTypes[1]
      ? "&type=multiple"
      : questionTypes[2]
        ? "&type=boolean"
        : "";
    console.log(triviaApiString);

    // Fetch quiz and update quiz state
    try {
      const fetchQuizResult = await axios(triviaApiString);
      console.log(fetchQuizResult);
      if (fetchQuizResult.data.response_code === 0) {
        dispatch(
          replaceQuiz({
            questionNumber,
            category,
            difficulty,
            questionType,
            data: fetchQuizResult.data.results,
          })
        );
        router.push("/quiz");
      }
    } catch (err) {
      console.log("QuizForm fetch api Error: ", err);
    }
  };

  return (
    <Flex w="full" align="center" justifyContent="center" h="100vh">
      <Box p={8} maxW="full" borderWidth={1} borderRadius={8} boxShadow="md">
        <Flex w="full" align="center" justifyContent="space-between">
          <Box w="2.5rem"></Box>
          <Heading size="3xl">Quiz Option</Heading>
          <IconButton
            aria-label="Profile Button"
            variant="ghost"
            rounded="full"
            onClick={() => router.push("/profile")}
          >
            <LuUserCircle />
          </IconButton>
        </Flex>

        {/* Quiz Form Content */}
        <QuizFormContent
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          setCategory={setCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          handleStartQuiz={handleStartQuiz}
          questionTypes={questionTypes}
          setQuestionTypes={setQuestionTypes}
        />
      </Box>
    </Flex>
  );
};

export default QuizForm;
