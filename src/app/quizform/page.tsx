'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks'; 
import { replaceQuiz } from '@/lib/features/quizSlice';
import {
  Flex, Box, Heading, IconButton,
} from '@chakra-ui/react';
import { MdAccountBox } from "react-icons/md";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import QuizFormContent from './quizFormContent';

const QuizForm = () => {
  const [questionNumber, setQuestionNumber] = useState(10);
  const [category, setCategory] = useState('any');
  const [difficulty, setDifficulty] = useState('any');
  const [questionTypes, setQuestionTypes] = useState([true, false, false]);
  const questionType = ['any', 'multiple', 'boolean'].filter((el, i) => questionTypes[i])[0];
  const router = useRouter();

  const [recentQuestionNumber, setRecentQuestionNumber] = useState(10);
  const [recentCategory, setRecentCategory] = useState('any');
  const [recentDifficulty, setRecentDifficulty] = useState('any');
  const [recentQuestionType, setRecentQuestionType] = useState('any');

  const dispatch = useAppDispatch();

  // Handle click start quiz
  const handleStartQuiz = async () => {

    // Create api string
    let triviaApiString = 'https://opentdb.com/api.php?';
    console.log(questionNumber);
    console.log(category);
    console.log(difficulty);
    console.log(questionType);
    triviaApiString += `amount=${questionNumber}`;
    triviaApiString += category !== 'any' ? `&category=${category}` : '';
    triviaApiString += difficulty !== 'any' ? `&difficulty=${difficulty}` : '';
    triviaApiString += questionTypes[1] ? '&type=multiple' : questionTypes[2] ? '&type=boolean' : '';
    console.log(triviaApiString);

    // Fetch quiz and update quiz state
    try {
      const fetchQuizResult = await axios(triviaApiString);
      console.log(fetchQuizResult)
      if (fetchQuizResult.data.response_code === 0) {
        dispatch(replaceQuiz({questionNumber, category, difficulty, questionType, data: fetchQuizResult.data.results}));
        router.push('/quiz');
      }
    } catch (err) {console.log('QuizForm fetch api Error: ', err)}
  };

  return (
    <Flex width="full" align="center" justifyContent="center" p={8} h="100vh">
      <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="md">
        <Flex width="full" align="center" justifyContent="center">
          <Box textAlign="center" w='80%' pl='18%'>
            <Heading size="3xl">Quiz Option</Heading>
          </Box>
          {/* testing */}
          <Box textAlign="right" pl='10%'>
            {/* <Popover>
              <PopoverTrigger>
                <IconButton
                  aria-label='Recent Result'
                  icon={<MdAccountBox size={30}/>}
                  color='teal.400'
                  variant="ghost"
                />
              </PopoverTrigger>
              <PopoverContent textAlign="left">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader textAlign='center' fontSize={24}><b>Recent Result</b></PopoverHeader>
                <PopoverBody>
                <TableContainer>
                    <Table variant='simple' fontSize={18}>
                      <Tbody height='10px'>
                        <Tr >
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Question Number</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='purple.500' width='10px'><b>{recentQuestionNumber}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Category</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='green.500'><b>{recentCategory.toUpperCase()}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Difficulty</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='red.500'><b>{recentDifficulty.toUpperCase()}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Question Type</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='blue.500'><b>{recentQuestionType.toUpperCase()}</b></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </PopoverBody>
              </PopoverContent>
            </Popover> */}
          </Box>
        </Flex>

        {/* Quiz Form Content */}
        <QuizFormContent
          questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} setCategory={setCategory}
          difficulty={difficulty} setDifficulty={setDifficulty} handleStartQuiz={handleStartQuiz}
          questionTypes={questionTypes} setQuestionTypes={setQuestionTypes}
        />
      </Box>
    </Flex>
  );
};

export default QuizForm;