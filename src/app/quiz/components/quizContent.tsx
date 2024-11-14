import { useAppSelector } from "@/lib/hooks";
import { Box } from "@chakra-ui/react";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import QuestionAttributes from "./quizContent/questionAttributes";
import QuestionContent from "./quizContent/questionContent";
import QuestionOptions from "./quizContent/questionOptions";
import NextPreviousButtons from "./quizContent/nextPreviousButtons";

interface QuizContentProps {
  quizIndex: number;
  quiz: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  buttonBorderColor: string[];
  options: string[];
  selectOption: (index: number) => void;
  handleChangeQuestion: (questionIndex: number) => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  quizIndex,
  quiz,
  buttonBorderColor,
  options,
  selectOption,
  handleChangeQuestion,
}) => {
  const quizObject = useAppSelector((state) => state.quiz.quizObject);
  const { questionNumber } = quizObject;
  return (
    <Box w="30rem" maxW="full">
      <ProgressRoot
        my={8}
        value={
          questionNumber === 0 ? 0 : ((quizIndex + 1) * 100) / questionNumber
        }
      >
        <ProgressBar />
      </ProgressRoot>
      <QuestionAttributes quiz={quiz} />
      <QuestionContent question={quiz.question} />
      <QuestionOptions
        options={options}
        selectOption={selectOption}
        buttonBorderColor={buttonBorderColor}
      />
      <NextPreviousButtons
        quizIndex={quizIndex}
        handleChangeQuestion={handleChangeQuestion}
      />
    </Box>
  );
};

export default QuizContent;
