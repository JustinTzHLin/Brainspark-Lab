import { Flex, Heading } from "@chakra-ui/react";
import GeminiExplanationModal from "../modals&popovers/geminiExplanationModal";
import QuizStatusPopover from "../modals&popovers/quizStatusPopover";

interface QuizHeaderProps {
  askGemini: () => void;
  geminiModalIsOpen: boolean;
  handleGeminiModalClose: () => void;
  geminiContentSuccess: boolean;
  geminiContentObj: {
    correctAnswer: string;
    incorrectAnswers: string[];
  };
  quiz: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  quizIndex: number;
  questionNumber: number;
  userAnswers: string[];
  handleChangeQuestion: (questionIndex: number) => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  askGemini,
  geminiModalIsOpen,
  handleGeminiModalClose,
  geminiContentSuccess,
  geminiContentObj,
  quiz,
  quizIndex,
  questionNumber,
  userAnswers,
  handleChangeQuestion,
}) => {
  return (
    <Flex width="full" align="center" justify="space-between">
      <GeminiExplanationModal
        geminiModalIsOpen={geminiModalIsOpen}
        handleGeminiModalClose={handleGeminiModalClose}
        geminiContentSuccess={geminiContentSuccess}
        geminiContentObj={geminiContentObj}
        quiz={quiz}
        askGemini={askGemini}
      />
      <Heading size="3xl" fontWeight="bold">
        Quiz {quizIndex + 1}/{questionNumber}
      </Heading>
      <QuizStatusPopover
        userAnswers={userAnswers}
        handleChangeQuestion={handleChangeQuestion}
      />
    </Flex>
  );
};

export default QuizHeader;
