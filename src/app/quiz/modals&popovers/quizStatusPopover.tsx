import { useState } from "react";
import { Box, Center, Button, IconButton } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  PopoverCloseTrigger,
  PopoverHeader,
} from "@/components/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { LuInfo } from "react-icons/lu";

interface QuizStatusPopoverProps {
  userAnswers: string[];
  handleChangeQuestion: (questionIndex: number) => void;
}

const QuizStatusPopover: React.FC<QuizStatusPopoverProps> = ({
  userAnswers,
  handleChangeQuestion,
}) => {
  const [questionStatusIsOpen, setQuestionStatusIsOpen] = useState(false);

  return (
    <PopoverRoot
      positioning={{ placement: "bottom-end" }}
      open={questionStatusIsOpen}
      onOpenChange={(e) => setQuestionStatusIsOpen(e.open)}
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Quiz Status"
          variant="ghost"
          rounded="full"
          _active={{ transform: "scale(0.8)" }}
          aspectRatio={1}
        >
          <Tooltip
            content="Quiz Status"
            showArrow
            openDelay={100}
            closeDelay={250}
            positioning={{ placement: "left", offset: { mainAxis: 10 } }}
          >
            <LuInfo />
          </Tooltip>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent textAlign="left" w="416px">
        <PopoverArrow />
        <PopoverCloseTrigger />
        <PopoverHeader textAlign="center" fontSize={24}>
          <b>Quiz Status</b>
        </PopoverHeader>
        <PopoverBody>
          <Center>
            <Box w={(36 + 5 * 2) * 8 + "px"}>
              {userAnswers.map((userAnswer, i) => {
                return (
                  <Button
                    w="36px"
                    key={"quizStatusButton" + i}
                    m="5px"
                    size="sm"
                    variant={userAnswer === "" ? "surface" : "solid"}
                    onClick={() => {
                      handleChangeQuestion(i);
                      setQuestionStatusIsOpen(false);
                    }}
                    _active={{ transform: "scale(0.85)" }}
                  >
                    {i + 1}
                  </Button>
                );
              })}
            </Box>
          </Center>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default QuizStatusPopover;
