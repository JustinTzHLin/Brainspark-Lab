'use client';
import React, { useRef, useState } from 'react';
import he from 'he';
import { useAppSelector } from '@/lib/hooks';
import {
  Flex, Spacer, Box, Heading, Stack, Center, Badge, Button, IconButton, useDisclosure, StackSeparator, Text
} from '@chakra-ui/react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  PopoverCloseTrigger,
  PopoverHeader
} from "@/components/ui/popover"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
import { ProgressBar, ProgressRoot } from "@/components/ui/progress"
import { Tooltip } from '@/components/ui/tooltip';
import Image from 'next/image';
import { BiSolidLeftArrow, BiSolidRightArrow  } from "react-icons/bi";
import { LuInfo } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import SubmitAnswerAlert from './submitAnswerAlert';
import AnswerResultModal from './answerResultModal';

const Quiz = () => {
  /*  Quiz Example
  const quizExample = {questionNumber: 5, category: 'geography', difficulty: 'easy', questionType: 'any', data:[{"type":"multiple","difficulty":"easy","category":"Geography","question":"Which Russian oblast forms a border with Poland?","correct_answer":"Kaliningrad","incorrect_answers":["Samara","Nizhny Novgorod","Omsk"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Vatican City is a country.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What is the capital of Indonesia?","correct_answer":"Jakarta","incorrect_answers":["Bandung","Medan","Palembang"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Alaska is the largest state in the United States.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What country has a horizontal bicolor red and white flag?","correct_answer":"Monaco","incorrect_answers":["Bahrain","Malta","Liechenstein"]}]};
  */
  const quizObject = useAppSelector((state) => state.quiz.quizObject);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
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
  const [buttonBorderColor, setButtonBorderColor] = useState(Array(4).fill('0px 0px 0px 0px #DD6B20 inset'));

  // Shuffle options array
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const [options, setOptions] = useState(shuffleArray(quiz.correct_answer ? [quiz.correct_answer].concat(quiz.incorrect_answers) : []));
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questionNumber).fill(''));
  const [correctCount, setCorrectCount] = useState(0);
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
    setUserAnswers(userAnswers.toSpliced(quizIndex, 1, options[index]));
  }

  // Handle click quiz status button
  const handleChangeQuestion = (questionIndex: number) => {
    console.log('handle change question');
    console.log(userAnswers);
    if (questionIndex < questionNumber) {
      setQuizIndex(questionIndex);
      setQuiz(data[questionIndex]);
      setButtonBorderColor(Array(4).fill('0px 0px 0px 0px #DD6B20 inset'));
      const newOptions = shuffleArray([data[questionIndex].correct_answer].concat(data[questionIndex].incorrect_answers));
      setOptions(newOptions);
      for (let i = 0; i < newOptions.length; i++) {
        if (newOptions[i] === userAnswers[questionIndex]) handleSelectedChoice(i);
      }
    } else setSubmitAnswerIsOpen(true);
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
    setSubmitAnswerIsOpen(false);
    setCheckAnswer(true);
  }

  // Gemini generate explanation process
  const askGemini = () => {
    setGeminiContentSuccess(false);
    setGeminiModalIsOpen(true);
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
    setGeminiModalIsOpen(false);
    resetGeminiContent();
  }

  const [submitAnswerIsOpen, setSubmitAnswerIsOpen] = useState(false);
  const cancelSubmitAnswerRef = useRef<null | HTMLButtonElement>(null);

  const [checkAnswer, setCheckAnswer] = useState(false);

  const [geminiModalIsOpen, setGeminiModalIsOpen] = useState(false);

  const [questionStatusIsOpen, setQuestionStatusIsOpen] = useState(false);

  return (
    <Flex width="full" align="center" justifyContent="center" p={8} h="100vh">
      <Box p={8} width="510px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Flex width="full" align="center" justify="space-between">
          <Box>
            <IconButton
              variant="ghost"
              aria-label="Gemini Icon Button"
              onClick={askGemini}
              rounded="full"
              _active={{transform: 'scale(0.8)'}}
            >
              <Image src="/geminiIcon.svg" alt="Gemini Icon" height={25} width={25}/>
            </IconButton>
            <DialogRoot open={geminiModalIsOpen} onOpenChange={handleGeminiModalClose} placement="center" size="xl">
              <DialogBackdrop />
              <DialogContent>
                <DialogCloseTrigger />
                <DialogHeader>
                  <DialogTitle><Heading size='2xl'>Explanation from Gemini</Heading></DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Stack separator={<StackSeparator />} gap={3}>{/* test */}
                    <Box>
                      <Skeleton loading={!geminiContentSuccess} mb={geminiContentSuccess ? 0 : 3}>
                        <Heading size='md' textTransform='uppercase'>
                          Correct Answer: {he.decode(quiz.correct_answer)}
                        </Heading>
                      </Skeleton>
                      <SkeletonText noOfLines={2} gap='3' pt={geminiContentSuccess ? '1' : '3'} height='8' loading={!geminiContentSuccess}>
                        {/* pt={geminiContentSuccess ? '3' : '1'} noOfLines={2} gap='4' height='3' loading={!geminiContentSuccess} */}
                        <Text>
                          {geminiContentObj.correctAnswer}
                        </Text>
                      </SkeletonText>
                    </Box>
                    {quiz.incorrect_answers.map((incorrectAnswer: string, i: number) => 
                      (
                        <Box key={'incorrectAnswerBox_' + i}>
                          <Skeleton loading={!geminiContentSuccess} mb={geminiContentSuccess ? 0 : 3}>
                            <Heading size='sm' textTransform='uppercase'>
                              {he.decode(incorrectAnswer)}
                            </Heading>
                          </Skeleton>
                          <SkeletonText noOfLines={2} gap='3' pt={geminiContentSuccess ? '1' : '3'} height='6' loading={!geminiContentSuccess}>
                          {/* pt={geminiContentSuccess ? '3' : '1'} noOfLines={2} gap='3' height='3' loading={!geminiContentSuccess} */}
                            <Text>
                              {geminiContentObj.incorrectAnswers[i]}
                            </Text>
                          </SkeletonText>
                        </Box>
                      )
                    )}
                  </Stack>
                </DialogBody>

                <DialogFooter>
                  <Button colorScheme='blue' mr={3} onClick={handleGeminiModalClose}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Box>
          <Heading size='3xl' fontWeight="bold">Quiz {quizIndex+1}/{questionNumber}</Heading>
          <Box>
            {/* test */}
            <PopoverRoot positioning={{ placement: "bottom-end" }} open={questionStatusIsOpen} onOpenChange={e => setQuestionStatusIsOpen(e.open)}>
              <PopoverTrigger>
                <Button
                  aria-label="Quiz Status"
                  variant="ghost"
                  rounded="full"
                  _active={{transform: 'scale(0.8)'}}
                  aspectRatio={1}
                >
                  <LuInfo />
                </Button>
              </PopoverTrigger>
              <PopoverContent textAlign="left" w='445px'>
                <PopoverArrow />
                <PopoverCloseTrigger />
                <PopoverHeader textAlign='center' fontSize={24}><b>Quiz Status</b></PopoverHeader>
                <PopoverBody>
                  <Center>
                    <Box w={(40 + 6 * 2) * 7 + "px"}>
                      {userAnswers.map((userAnswer, i) => {
                        return (
                          <Button
                            w='40px' key={'quizStatusButton' + i} m='6px' onClick={() => {handleChangeQuestion(i); setQuestionStatusIsOpen(false);}}
                            variant={userAnswer === '' ? "surface" : "solid"}
                          >
                            {i+1}
                          </Button>
                        )
                      })}
                    </Box>
                  </Center>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Box>
        </Flex>
        <ProgressRoot my={8} value={questionNumber === 0 ? 0 :(quizIndex+1)*100/questionNumber}>
          <ProgressBar />
        </ProgressRoot>
        <Flex width='full' my={8} align="center" justifyContent="center">
          <Tooltip
            content={quiz.category} showArrow openDelay={100} closeDelay={250}
            positioning={{offset: {mainAxis: 3}}}
          >
            <Badge w='46%' fontSize={15} textAlign='center' variant='surface' colorPalette='green' _hover={{cursor: 'pointer'}}>
              <Center w="full">
                {quiz.category.startsWith('Entertainment') ? 'Entertainment' : he.decode(quiz.category)}
              </Center>
            </Badge>
          </Tooltip>
          <Spacer />
          <Badge w='22%' fontSize={15} textAlign='center' variant='surface' colorPalette='red'>
          <Center w="full">{quiz.difficulty}</Center>
          </Badge>
          <Spacer />
          <Badge w='22%' fontSize={15} textAlign='center' variant='surface' colorPalette='purple'>
          <Center w="full">{quiz.type}</Center>
          </Badge>
        </Flex>
        <Center my={4} textAlign="left" width='full' bg='gray.500' py={3} pl={3.5} pr={3.5} borderRadius={10}>
          <Box textAlign="left" w='30rem' bg='white' p={2} borderRadius={6} h='8rem'>
            <b>{he.decode(quiz.question)}</b>
          </Box>
        </Center>
        {
          Array.from({length: options.length}).map((_, i) => {
            return (
              <Button
                key={'quiz_option_'+i} width='full' my={2} fontSize={20} boxShadow={buttonBorderColor[i]}
                height={options.length === 4 ? '48px' : '112px'} variant="subtle"
                //colorScheme={['whatsapp', 'twitter', 'purple', 'pink'][i]}
                _active={{transform: 'scale(0.9)'}} onClick={() => selectOption(i)}
              >
                <b>{he.decode(options[i])}</b>
              </Button>
            )
          })
        }
        <Flex width='full' my={8} align="center" justifyContent="center">
          <IconButton disabled={quizIndex === 0} aria-label='Previous Question' borderRightRadius={0} height='48px' width='50%' fontSize={20} colorScheme='gray' _active={{transform: 'scale(0.9)'}} onClick={() => handleChangeQuestion(quizIndex-1)} variant="subtle">
            <BiSolidLeftArrow />
          </IconButton>
          <IconButton aria-label='Next Question' borderLeftRadius={0} height='48px' width='50%' fontSize={20} colorScheme='gray' _active={{transform: 'scale(0.9)'}} onClick={() => handleChangeQuestion(quizIndex+1)} variant="subtle">
            <BiSolidRightArrow />
          </IconButton>
        </Flex>
      </Box>

      {/* Submit Answer Alert */}
      <SubmitAnswerAlert submitAnswerIsOpen={submitAnswerIsOpen} setSubmitAnswerIsOpen={setSubmitAnswerIsOpen} cancelSubmitAnswerRef={cancelSubmitAnswerRef} checkAnswers={checkAnswers} />

      {/* Answer Result Modal */}
      <AnswerResultModal checkAnswer={checkAnswer} setCheckAnswer={setCheckAnswer} router={router} questionNumber={questionNumber} correctCount={correctCount} />

    </Flex>
  );
};

export default Quiz;