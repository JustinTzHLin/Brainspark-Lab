import { Box, Button, Text } from "@chakra-ui/react";
import NumberOfQuestionsInput from "./quizFormContent/numberOfQuestionsInput";
import CategorySelect from "./quizFormContent/categorySelect";
import QuestionTypeCheckbox from "./quizFormContent/questiontypeCheckbox";
import DifficultyRadio from "./quizFormContent/difficultyRadio";

interface QuizFormContentProps {
  questionNumber: number;
  setQuestionNumber: (nextValue: number) => void;
  setCategory: (nextValue: string) => void;
  difficulty: string;
  setDifficulty: (nextValue: string) => void;
  questionTypes: boolean[];
  setQuestionTypes: (nextValue: boolean[]) => void;
  handleStartQuiz: () => void;
}

const QuizFormContent: React.FC<QuizFormContentProps> = ({
  questionNumber,
  setQuestionNumber,
  setCategory,
  difficulty,
  setDifficulty,
  questionTypes,
  setQuestionTypes,
  handleStartQuiz,
}) => {
  return (
    <Box my={6} w="26rem" maxW="full">
      {/* Number of Questions */}
      <NumberOfQuestionsInput
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
      />

      {/* Category */}
      <CategorySelect setCategory={setCategory} />

      {/* Difficulty */}
      <DifficultyRadio difficulty={difficulty} setDifficulty={setDifficulty} />

      {/* Question Type */}
      <QuestionTypeCheckbox
        questionTypes={questionTypes}
        setQuestionTypes={setQuestionTypes}
      />

      {/* Start Quiz Button */}
      <Button w="full" mt={8} onClick={handleStartQuiz}>
        <Text fontSize="md">
          <b>S t a r t&nbsp;&nbsp;&nbsp;&nbsp;Q u i z !</b>
        </Text>
      </Button>
    </Box>
  );
};

export default QuizFormContent;
