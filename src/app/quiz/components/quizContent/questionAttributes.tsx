import he from "he";
import { Flex, Spacer, Center, Badge } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

interface QuestionAttributesProps {
  quiz: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
}

const QuestionAttributes: React.FC<QuestionAttributesProps> = ({ quiz }) => {
  return (
    <Flex width="full" my={8} align="center" justifyContent="center">
      <Tooltip
        content={he.decode(quiz.category)}
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
  );
};

export default QuestionAttributes;
