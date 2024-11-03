import { Box, Button, Text } from '@chakra-ui/react';
import NumberOfQuestions from '../../components/quizFormContent/numberOfQuestions';
import Category from '../../components/quizFormContent/category';
import QuestionType from '../../components/quizFormContent/questiontype';
import Difficulty from '../../components/quizFormContent/difficulty';

interface QuizFormContentProps {
  questionNumber: number,
  setQuestionNumber: (nextValue: number) => void,
  setCategory: (nextValue: string) => void,
  difficulty: string,
  setDifficulty: (nextValue: string) => void,
  questionTypes: boolean[],
  setQuestionTypes: (nextValue: boolean[]) => void,
  handleStartQuiz: () => void
}

const QuizFormContent: React.FC<QuizFormContentProps> = ({ questionNumber, setQuestionNumber, setCategory, difficulty, setDifficulty, questionTypes, setQuestionTypes, handleStartQuiz }) => {
  return (
    <Box my={4} textAlign="left" w="26rem" maxW='full'>

          {/* Number of Questions */}
          <NumberOfQuestions questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />

          {/* Category */}
          <Category setCategory={setCategory} />
          
          {/* Difficulty */}
          <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
          
          {/* Question Type */}
          <QuestionType questionTypes={questionTypes} setQuestionTypes={setQuestionTypes} />

          {/* Start Quiz Button */}
          <Button w="full" mt={8} onClick={handleStartQuiz}>
            <Text fontSize="md"><b>S t a r t&nbsp;&nbsp;&nbsp;&nbsp;Q u i z !</b></Text>
          </Button>
    </Box>
  )
}

export default QuizFormContent;