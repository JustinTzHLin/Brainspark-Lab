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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubmitAnswerModalProps {
  submitAnswerIsOpen: boolean;
  setSubmitAnswerIsOpen: (arg0: boolean) => void;
  checkAnswers: () => void;
}

const SubmitAnswerModal: React.FC<SubmitAnswerModalProps> = ({
  submitAnswerIsOpen,
  setSubmitAnswerIsOpen,
  checkAnswers,
}) => {
  return (
    <DialogRoot
      motionPreset="scale"
      onOpenChange={(e) => setSubmitAnswerIsOpen(e.open)}
      open={submitAnswerIsOpen}
      placement="center"
    >
      {" "}
      {/* initialFocusEl={cancelSubmitAnswerRef} */}
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Answers?</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          Double-check your answers, for once you submit, there&apos;s no
          turning back!
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="subtle">Nah</Button>
          </DialogActionTrigger>
          <Button onClick={() => checkAnswers()} ml={3}>
            Sure thing!
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SubmitAnswerModal;
