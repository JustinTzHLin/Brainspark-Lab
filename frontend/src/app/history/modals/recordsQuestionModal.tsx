import { useState, useEffect } from "react";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Blockquote } from "@/components/ui/blockquote";
import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QuestionModalObjProps } from "../components/recordsQuestions";
import he from "he";
import { shuffleArray } from "@/utils/globalHandlers";

interface RecordsQuestionModalProps {
  questionModalIsOpen: boolean;
  setQuestionModalIsOpen: (arg0: boolean) => void;
  questionModalObj: QuestionModalObjProps;
}

const RecordsQuestionModal: React.FC<RecordsQuestionModalProps> = ({
  questionModalIsOpen,
  setQuestionModalIsOpen,
  questionModalObj,
}) => {
  const [optionsArray, setOptionsArray] = useState<string[]>([]);

  useEffect(() => {
    setOptionsArray(
      shuffleArray([
        questionModalObj.correct_answer,
        ...questionModalObj.incorrect_answer,
      ])
    );
  }, [questionModalObj]);

  return (
    <DialogRoot
      open={questionModalIsOpen}
      onOpenChange={(e) => setQuestionModalIsOpen(e.open)}
      placement="center"
      lazyMount
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogBody>
          <Stack mt={8}>
            <Blockquote pr={0} mb={6} fontSize={20} variant="solid">
              <b>{he.decode(questionModalObj.content)}</b>
            </Blockquote>
            <Box p={4} fontSize={16}>
              {optionsArray.map((option, i) => (
                <Flex key={"questionModalOption_" + i}>
                  <Text w={6}>{String.fromCharCode(i + 65)}.</Text>
                  <Text w="calc(100% - 1.5rem)" fontWeight="semibold">
                    {he.decode(option)}
                  </Text>
                </Flex>
              ))}
              <Flex mt={6}>
                <Text w={36}>Correct Answer:&nbsp;</Text>
                <Text fontWeight="semibold">
                  {questionModalObj.correct_answer}
                </Text>
              </Flex>
              <Flex>
                <Text w={36}>Your Answer:&nbsp;</Text>
                <Text fontWeight="semibold">
                  {questionModalObj.user_answer}
                </Text>
              </Flex>
            </Box>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="subtle">Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default RecordsQuestionModal;
