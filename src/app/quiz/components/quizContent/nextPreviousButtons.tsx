import { Flex, IconButton } from "@chakra-ui/react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface NextPreviousButtonsProps {
  quizIndex: number;
  handleChangeQuestion: (questionIndex: number) => void;
}

const NextPreviousButtons: React.FC<NextPreviousButtonsProps> = ({
  quizIndex,
  handleChangeQuestion,
}) => {
  return (
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
  );
};

export default NextPreviousButtons;
