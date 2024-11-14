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
import { QuestionModalObjProps } from "../components/triviaRecords";
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
  const optionsArray = shuffleArray(
    questionModalObj.incorrect_answer.concat([questionModalObj.correct_answer])
  );

  return (
    <DialogRoot
      open={questionModalIsOpen}
      onOpenChange={(e) => setQuestionModalIsOpen(e.open)}
      placement="center"
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          {/* <DialogTitle>Quiz Score</DialogTitle> */}
        </DialogHeader>
        <DialogBody>
          <Stack>
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
                Correct Answer:&nbsp;
                <Text fontWeight="semibold">
                  {questionModalObj.correct_answer}
                </Text>
              </Flex>
              <Flex>
                Your Answer:&nbsp;
                <Text fontWeight="semibold">
                  {questionModalObj.user_answer}
                </Text>
              </Flex>
            </Box>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="subtle">Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default RecordsQuestionModal;
