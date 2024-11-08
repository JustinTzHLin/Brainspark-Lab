import he from "he";
import { Center } from "@chakra-ui/react";
import { Blockquote } from "@/components/ui/blockquote";

const QuestionContent = ({ question }: { question: string }) => {
  return (
    <Blockquote variant="solid" my={4} pr={0}>
      <Center w="full" h="8rem" fontSize={18}>
        <b>{he.decode(question)}</b>
      </Center>
    </Blockquote>
  );
};

export default QuestionContent;
