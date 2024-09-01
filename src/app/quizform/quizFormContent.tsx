import { Box, Button } from '@chakra-ui/react';
import NumberOfQuestions from './quizFormContent/numberOfQuestions';
import Category from './quizFormContent/category';
import QuestionType from './quizFormContent/questiontype';
import Difficulty from './quizFormContent/difficulty';

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
    <Box my={4} textAlign="left" width='30rem'>
      <form>

        {/* Number of Questions */}
        <NumberOfQuestions questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />

        {/* Category */}
        <Category setCategory={setCategory} />
        
        {/* Difficulty */}
        <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
        
        {/* Question Type */}
        <QuestionType questionTypes={questionTypes} setQuestionTypes={setQuestionTypes} />

        {/* Start Quiz Button */}
        <Button
          color='white' _hover={{ bg: 'gray.100', color:'teal.300' }} bg='teal.300' border='1px' borderColor='#ccd0d5' width="full" mt={6} onClick={handleStartQuiz}>
          <b>S t a r t&nbsp;&nbsp;&nbsp;&nbsp;Q u i z !</b>
        </Button>
      </form>
    </Box>
  )
}

export default QuizFormContent;