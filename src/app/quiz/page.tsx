'use client';
import React, { useRef, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import {
  Flex, Spacer, Box, Heading, Stack, Center, Badge, Button, ButtonGroup, IconButton, useDisclosure, Icon, StackDivider, Text, Skeleton, SkeletonText,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
  Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton, Progress,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import Image from 'next/image';
import { InfoIcon } from '@chakra-ui/icons';
import { BiSolidLeftArrow, BiSolidRightArrow  } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import EmptyAnswerAlert from './emptyAnswerAlert';
import SubmitAnswerAlert from './submitAnswerAlert';
import AnswerResultModal from './answerResultModal';

const Quiz = () => {
  /*  Quiz Example
  const quizExample = {questionNumber: 5, category: 'geography', difficulty: 'easy', questionType: 'any', data:[{"type":"multiple","difficulty":"easy","category":"Geography","question":"Which Russian oblast forms a border with Poland?","correct_answer":"Kaliningrad","incorrect_answers":["Samara","Nizhny Novgorod","Omsk"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Vatican City is a country.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What is the capital of Indonesia?","correct_answer":"Jakarta","incorrect_answers":["Bandung","Medan","Palembang"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Alaska is the largest state in the United States.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What country has a horizontal bicolor red and white flag?","correct_answer":"Monaco","incorrect_answers":["Bahrain","Malta","Liechenstein"]}]};
  */
  const quizObject = useAppSelector((state) => state.quiz.quizObject);
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';
  const router = useRouter();
  const {questionNumber, category, difficulty, questionType, data} = quizObject;
  const [quizIndex, setQuizIndex] = useState(0);
  const [quiz, setQuiz] = useState(data[0] || {
    type: '',
    difficulty: '',
    category: '',
    question: '',
    correct_answer: '',
    incorrect_answers: []
  });
  const [buttonBorderColor, setButtonBorderColor] = useState(['0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset']);

  // Shuffle options array
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const [options, setOptions] = useState(shuffleArray(quiz.correct_answer ? [quiz.correct_answer].concat(quiz.incorrect_answers) : []));
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questionNumber).fill(''));
  const [correctCount, setCorrectCount] = useState(0);
  const [previousBtnDisabled, setPreviousBtnDisabled] = useState(true);
  const [geminiContentObj, setGeminiContentObj] = useState<{
    correctAnswer: string,
    incorrectAnswers: string[],
  }>({correctAnswer: '', incorrectAnswers: ['', '', '', '']});
  const [geminiContentSuccess, setGeminiContentSuccess] = useState(false);

  // Handle clicked option
  const handleSelectedChoice = (index: number) => {
    const newButtonBorder = [];
    for (let i=0; i<4; i++) {
      if (i === index) newButtonBorder.push('0px 0px 0px 8px #DD6B20 inset');
      else newButtonBorder.push('0px 0px 0px 0px #DD6B20 inset');
    }
    setButtonBorderColor(newButtonBorder);
  }

  // Handle select option process
  const selectOption = (index: number) => {
    handleSelectedChoice(index);
    setCurrentAnswer(options[index]);
    setUserAnswers(userAnswers.toSpliced(quizIndex, 1, options[index]));
  }

  // Handle click next question button
  const handleNextQuestion = () => {
    console.log('handle next question');
    console.log(userAnswers);
    setPreviousBtnDisabled(false);
    if (currentAnswer) {
      console.log(currentAnswer);
      setCurrentAnswer(userAnswers[quizIndex+1] || '');
      if (quizIndex + 1 < questionNumber) {
        setQuizIndex(quizIndex+1);
        setQuiz(data[quizIndex+1]);
        setButtonBorderColor(['0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset']);
        const newOptions = shuffleArray([data[quizIndex+1].correct_answer].concat(data[quizIndex+1].incorrect_answers));
        setOptions(newOptions);
        for (let i = 0; i < newOptions.length; i++) {
          if (newOptions[i] === userAnswers[quizIndex+1]) handleSelectedChoice(i);
        }
      } else submitAnswerOpen();
    } else {
      console.log('empty answer');
      answerEmptyOpen();
    }
  }

  // Handle click previous question button
  const handlePreviousQuestion = () => {
    console.log('handle previous question');
    console.log(userAnswers);
    setQuizIndex(quizIndex-1);
    setQuiz(data[quizIndex-1]);
    const newOptions = shuffleArray([data[quizIndex-1].correct_answer].concat(data[quizIndex-1].incorrect_answers));
    setOptions(newOptions);
    for (let i = 0; i < newOptions.length; i++) {
      if (newOptions[i] === userAnswers[quizIndex-1]) handleSelectedChoice(i);
    }
    setCurrentAnswer(userAnswers[quizIndex-1]);
    if (quizIndex === 1) setPreviousBtnDisabled(true);
  }

  // Check and store answers process
  const checkAnswers = () => {
    let counting = 0;
    for (const [index, currentAnswer] of userAnswers.entries()) {
      if (currentAnswer.toLowerCase() === data[index].correct_answer.toLowerCase()) counting++;
      console.log(currentAnswer, data[index].correct_answer, index);
    }
    fetch(BACKEND_URL + '/quiz/storeResult', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },// user questionNumber, category, difficulty, questionType, dataArray, answerArray, correctCount
      body: JSON.stringify({
        questionNumber, category, difficulty, questionType, dataArray: data, answerArray: userAnswers, correctCount: counting
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log('LoginForm fetch /signUp: Error: ', err));
    setCorrectCount(counting);
    submitAnswerClose();
    checkAnswerOpen();
  }

  // Gemini generate explanation process
  const askGemini = () => {
    setGeminiContentSuccess(false);
    geminiModalOpen();
    fetch('/api/gemini/quizInformation', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizObject: quiz
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const responseArray = data.response.slice(0, data.response.indexOf('/n')).split('##').map((sentence: string) => sentence.trim() );
        setGeminiContentObj({
          correctAnswer: responseArray[0],
          incorrectAnswers: responseArray.slice(1),
        });
        setGeminiContentSuccess(true);
      })
      .catch(err => console.log('Quiz fetch /api/gemini/quizInformation: Error: ', err));
  }

  // Reset Gemini prompt variables
  const resetGeminiContent = () => setGeminiContentObj({ correctAnswer: '', incorrectAnswers: ['', '', '', ''] });

  // Handle Gemini modal close
  const handleGeminiModalClose = () => {
    geminiModalClose();
    resetGeminiContent();
  }

  const { isOpen: answerEmptyIsOpen, onOpen: answerEmptyOpen, onClose: answerEmptyClose } = useDisclosure();
  const cancelAnswerEmptyRef = useRef<null | HTMLButtonElement>(null);

  const { isOpen: submitAnswerIsOpen, onOpen: submitAnswerOpen, onClose: submitAnswerClose } = useDisclosure();
  const cancelSubmitAnswerRef = useRef<null | HTMLButtonElement>(null);

  const { isOpen: checkAnswer, onOpen: checkAnswerOpen, onClose: checkAnswerClose } = useDisclosure();

  const { isOpen: geminiModalIsOpen, onOpen: geminiModalOpen, onClose: geminiModalClose } = useDisclosure();

  return (
    <Flex width="full" align="center" justifyContent="center" p={8} h="100vh">
      <Box p={8} width="510px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Flex width="full" align="center" justifyContent="center">
          <Box textAlign="left" pr='10%'>
            <IconButton
              icon={<Image src="/geminiIcon.svg" alt="Gemini Icon" height={25} width={25}/>} 
              variant={"ghost"}
              aria-label="Gemini Icon Button"
              onClick={askGemini}
              isRound={true}
              _active={{transform: 'scale(0.8)'}}
            />
            <Modal isOpen={geminiModalIsOpen} onClose={handleGeminiModalClose} isCentered size={"2xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader><Heading size='lg'>Explanation from Gemini</Heading></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack divider={<StackDivider />} spacing={3}>
                    <Box>
                      <Skeleton isLoaded={geminiContentSuccess}>
                        <Heading size='md' textTransform='uppercase'>
                          Correct Answer:{quiz.correct_answer}
                        </Heading>
                      </Skeleton>
                      <SkeletonText pt={geminiContentSuccess ? '1' : '3'} noOfLines={2} spacing='4' skeletonHeight='3' isLoaded={geminiContentSuccess}>
                        <Text>
                          {geminiContentObj.correctAnswer}
                        </Text>
                      </SkeletonText>
                    </Box>
                    {quiz.incorrect_answers.map((incorrectAnswer: [string], i: number) => {
                      return (
                        <Box key={'incorrectAnswerBox' + i}>
                          <Skeleton isLoaded={geminiContentSuccess}>
                            <Heading size='sm' textTransform='uppercase'>
                              {incorrectAnswer}
                            </Heading>
                          </Skeleton>
                          <SkeletonText pt={geminiContentSuccess ? '1' : '3'} noOfLines={2} spacing='3' skeletonHeight='3' isLoaded={geminiContentSuccess}>
                            <Text>
                              {geminiContentObj.incorrectAnswers[i]}
                            </Text>
                          </SkeletonText>
                        </Box>
                      )
                    })}
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={handleGeminiModalClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          <Box textAlign="center" w='80%'>
            <Heading color='orange.500'>Quiz {quizIndex+1}/{questionNumber}</Heading>
          </Box>
          <Box textAlign="right" pl='10%'>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  aria-label="Info"
                  icon={<InfoIcon boxSize={5} />}
                  color='orange.500'
                  variant="ghost"
                  isRound={true}
                />
              </PopoverTrigger>
              <PopoverContent textAlign="left">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader textAlign='center' fontSize={24}><b>Quiz Form Results</b></PopoverHeader>
                <PopoverBody>
                  <TableContainer>
                    <Table variant='simple' fontSize={18}>
                      <Tbody height='10px'>
                        <Tr >
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Question Number</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='purple.500' width='10px'><b>{questionNumber}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Category</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='green.500'><b>{category.toUpperCase()}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Difficulty</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='red.500'><b>{difficulty.toUpperCase()}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Question Type</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='blue.500'><b>{questionType.toUpperCase()}</b></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
        <Progress my={8} colorScheme='orange' value={(quizIndex+1)*100/questionNumber} />
        <Flex width='full' my={8} align="center" justifyContent="center">
          <Badge w='50%' fontSize={14} textAlign='center' variant='solid' colorScheme='green'>{quiz.category}</Badge>
          <Spacer />
          <Badge w='20%' fontSize={14} textAlign='center' variant='solid' colorScheme='red'>{quiz.difficulty}</Badge>
          <Spacer />
          <Badge w='20%' fontSize={14} textAlign='center' variant='solid' colorScheme='purple'>{quiz.type}</Badge>
        </Flex>
        <Center my={4} textAlign="left" width='full' bg='orange.500' py={3} pl={3.5} pr={3.5} borderRadius={10}>
          <Box textAlign="left" w='30rem' bg='white' p={2} borderRadius={6} h='8rem'>
            <b>{quiz.question}</b>
          </Box>
        </Center>
        <Flex width='full' my={8} align="center" justifyContent="center">
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[0]} colorScheme='whatsapp' _active={{transform: 'scale(0.9)'}} onClick={() => selectOption(0)}>
            <b>{options[0]}</b>
          </Button>
          <Spacer />
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[1]} colorScheme='twitter'_active={{transform: 'scale(0.9)'}} onClick={() => selectOption(1)}>
            <b>{options[1]}</b>
          </Button>
        </Flex>
        <Flex width='full' my={8} align="center" justifyContent="center">
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[2]} colorScheme='purple' _active={{transform: 'scale(0.9)'}} onClick={() => selectOption(2)}>
            <b>{options[2]}</b>
          </Button>
          <Spacer />
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[3]} colorScheme='pink' _active={{transform: 'scale(0.9)'}} onClick={() => selectOption(3)}>
            <b>{options[3]}</b>
          </Button>
        </Flex>
        <Flex width='full' my={8} align="center" justifyContent="center">
          <IconButton isDisabled={previousBtnDisabled} aria-label='Previous Question' borderRightRadius={0} height='48px' width='50%' fontSize={20} colorScheme='gray' icon={<BiSolidLeftArrow />} _active={{transform: 'scale(0.9)'}} onClick={() => handlePreviousQuestion()} />
          <IconButton aria-label='Next Question' borderLeftRadius={0} height='48px' width='50%' fontSize={20} colorScheme='gray' icon={<BiSolidRightArrow />} _active={{transform: 'scale(0.9)'}} onClick={() => handleNextQuestion()} />
        </Flex>
      </Box>

      {/* Empty Answer Alert */}
      <EmptyAnswerAlert answerEmptyIsOpen={answerEmptyIsOpen} answerEmptyClose={answerEmptyClose} cancelAnswerEmptyRef={cancelAnswerEmptyRef}/>

      {/* Submit Answer Alert */}
      <SubmitAnswerAlert submitAnswerIsOpen={submitAnswerIsOpen} submitAnswerClose={submitAnswerClose} cancelSubmitAnswerRef={cancelSubmitAnswerRef} checkAnswers={checkAnswers} />

      {/* Answer Result Modal */}
      <AnswerResultModal checkAnswer={checkAnswer} checkAnswerClose={checkAnswerClose} router={router} questionNumber={questionNumber} correctCount={correctCount} />

    </Flex>
  );
};

export default Quiz;