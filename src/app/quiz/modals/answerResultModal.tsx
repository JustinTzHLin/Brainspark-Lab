import { Button } from "@/components/ui/button";
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

interface AnswerResultModalProps {
  checkAnswer: boolean;
  setCheckAnswer: (arg0: boolean) => void;
  router: any;
  questionNumber: number;
  correctCount: number;
}

const AnswerResultModal: React.FC<AnswerResultModalProps> = ({
  checkAnswer,
  setCheckAnswer,
  router,
  questionNumber,
  correctCount,
}) => {
  return (
    <DialogRoot
      open={checkAnswer}
      onOpenChange={(e) => setCheckAnswer(e.open)}
      placement="center"
      onExitComplete={() => router.replace("/quizform")}
    >
      <DialogBackdrop />
      <DialogTrigger />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Quiz Score</DialogTitle>
        </DialogHeader>
        <DialogBody>
          You got {correctCount} out of {questionNumber} correct! That&apos;s a
          perfect score!
        </DialogBody>
        <DialogFooter>
          <Button
            mr={3}
            onClick={() => {
              router.replace("/quizform");
            }}
            variant="subtle"
          >
            New Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default AnswerResultModal;
