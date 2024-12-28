import he from "he";
import {
  Box,
  Heading,
  Stack,
  Button,
  StackSeparator,
  Text,
  IconButton,
} from "@chakra-ui/react";
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
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Tooltip } from "@/components/ui/tooltip";
import Image from "next/image";

interface GeminiExplanationModalProps {
  geminiModalIsOpen: boolean;
  handleGeminiModalClose: () => void;
  geminiContentSuccess: boolean;
  geminiContentObj: {
    correctAnswer: string;
    incorrectAnswers: string[];
  };
  quiz: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  askGemini: () => void;
}

const GeminiExplanationModal: React.FC<GeminiExplanationModalProps> = ({
  geminiModalIsOpen,
  handleGeminiModalClose,
  geminiContentSuccess,
  geminiContentObj,
  quiz,
  askGemini,
}) => {
  return (
    <DialogRoot
      open={geminiModalIsOpen}
      onOpenChange={(e) => {
        if (e.open) askGemini();
        else handleGeminiModalClose();
      }}
      placement="center"
      size="xl"
    >
      <DialogBackdrop />
      <Tooltip
        content="Ask Gemini"
        showArrow
        openDelay={100}
        closeDelay={250}
        positioning={{ placement: "right", offset: { mainAxis: 3 } }}
      >
        <DialogTrigger asChild>
          <IconButton
            variant="ghost"
            aria-label="Gemini Icon Button"
            rounded="full"
            _active={{ transform: "scale(0.8)" }}
          >
            <Image
              src="/geminiIcon.svg"
              alt="Gemini Icon"
              height={25}
              width={25}
            />
          </IconButton>
        </DialogTrigger>
      </Tooltip>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <Heading size="2xl">Explanation from Gemini</Heading>
        </DialogHeader>
        <DialogBody>
          <Stack separator={<StackSeparator />} gap={3}>
            {/* test */}
            <Box>
              <Skeleton
                loading={!geminiContentSuccess}
                mb={geminiContentSuccess ? 0 : 3}
                height="8"
              >
                <Heading size="md" textTransform="uppercase">
                  Correct Answer: {he.decode(quiz.correct_answer)}
                </Heading>
              </Skeleton>
              <SkeletonText
                gap="3"
                pt={geminiContentSuccess ? "1" : "3"}
                height="6"
                loading={!geminiContentSuccess}
              >
                <Text>{geminiContentObj.correctAnswer}</Text>
              </SkeletonText>
            </Box>
            {quiz.incorrect_answers.map(
              (incorrectAnswer: string, i: number) => (
                <Box key={"incorrectAnswerBox_" + i}>
                  <Skeleton
                    loading={!geminiContentSuccess}
                    mb={geminiContentSuccess ? 0 : 3}
                    height="8"
                  >
                    <Heading size="sm" textTransform="uppercase">
                      {he.decode(incorrectAnswer)}
                    </Heading>
                  </Skeleton>
                  <SkeletonText
                    gap="3"
                    pt={geminiContentSuccess ? "1" : "3"}
                    height="6"
                    loading={!geminiContentSuccess}
                  >
                    <Text>{geminiContentObj.incorrectAnswers[i]}</Text>
                  </SkeletonText>
                </Box>
              )
            )}
          </Stack>
        </DialogBody>

        <DialogFooter>
          <Button colorScheme="blue" mr={3} onClick={handleGeminiModalClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default GeminiExplanationModal;
