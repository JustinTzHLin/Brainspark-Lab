"use client";
import he from "he";
import { useAppSelector } from "@/lib/hooks";
import {
  Flex,
  Spacer,
  Center,
  Badge,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { Tooltip } from "@/components/ui/tooltip";
import { Blockquote } from "@/components/ui/blockquote";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

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
    <>
      <ProgressRoot
        my={8}
        value={
          questionNumber === 0 ? 0 : ((quizIndex + 1) * 100) / questionNumber
        }
      >
        <ProgressBar />
      </ProgressRoot>
      <Flex width="full" my={8} align="center" justifyContent="center">
        <Tooltip
          content={quiz.category}
          showArrow
          openDelay={100}
          closeDelay={250}
          positioning={{ offset: { mainAxis: 3 } }}
        >
          <Badge
            w="46%"
            fontSize={15}
            textAlign="center"
            _hover={{ cursor: "pointer" }}
            h={6}
            textTransform="uppercase"
          >
            <Center w="full">
              {quiz.category.startsWith("Entertainment")
                ? "Entertainment"
                : he.decode(quiz.category)}
            </Center>
          </Badge>
        </Tooltip>
        <Spacer />
        <Badge
          w="22%"
          fontSize={15}
          textAlign="center"
          h={6}
          textTransform="uppercase"
        >
          <Center w="full">{quiz.difficulty}</Center>
        </Badge>
        <Spacer />
        <Badge
          w="22%"
          fontSize={15}
          textAlign="center"
          h={6}
          textTransform="uppercase"
        >
          <Center w="full">{quiz.type}</Center>
        </Badge>
      </Flex>
      <Blockquote variant="solid" my={4} pr={0}>
        <Center w="full" h="8rem" fontSize={18}>
          <b>{he.decode(quiz.question)}</b>
        </Center>
      </Blockquote>
      {Array.from({ length: options.length }).map((_, i) => {
        return (
          <Button
            key={"quiz_option_" + i}
            width="full"
            my={2}
            boxShadow={buttonBorderColor[i]}
            height={options.length === 4 ? "48px" : "112px"}
            variant="ghost"
            fontSize={
              options[i].length > 60 ? 13 : options[i].length > 40 ? 16 : 20
            }
            _active={{ transform: "scale(0.9)" }}
            onClick={() => selectOption(i)}
          >
            <b>{he.decode(options[i])}</b>
          </Button>
        );
      })}
      <Flex width="full" my={8} align="center" justifyContent="center">
        <IconButton
          disabled={quizIndex === 0}
          aria-label="Previous Question"
          borderRightRadius={0}
          height="48px"
          width="50%"
          fontSize={20}
          colorScheme="gray"
          _active={{ transform: "scale(0.9)" }}
          onClick={() => handleChangeQuestion(quizIndex - 1)}
          variant="subtle"
        >
          <BiSolidLeftArrow />
        </IconButton>
        <IconButton
          aria-label="Next Question"
          borderLeftRadius={0}
          height="48px"
          width="50%"
          fontSize={20}
          colorScheme="gray"
          _active={{ transform: "scale(0.9)" }}
          onClick={() => handleChangeQuestion(quizIndex + 1)}
          variant="subtle"
        >
          <BiSolidRightArrow />
        </IconButton>
      </Flex>
    </>
  );
};

export default QuizContent;
