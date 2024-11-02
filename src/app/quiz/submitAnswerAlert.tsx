// import {
//   AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton, Button
// } from "@chakra-ui/react";
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
import { Button } from "@/components/ui/button";

interface SubmitAnswerAlertProps {
  submitAnswerIsOpen: boolean,
  setSubmitAnswerIsOpen: (arg0: boolean) => void,
  cancelSubmitAnswerRef: any,
  checkAnswers: () => void
}

const SubmitAnswerAlert: React.FC<SubmitAnswerAlertProps> = ({ submitAnswerIsOpen, setSubmitAnswerIsOpen, cancelSubmitAnswerRef, checkAnswers }) => {

  return (
    <DialogRoot motionPreset='scale' onOpenChange={e => setSubmitAnswerIsOpen(e.open)} open={submitAnswerIsOpen} placement='center'> {/* initialFocusEl={cancelSubmitAnswerRef} */}
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Answers?</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          Double-check your answers, for once you submit, there&apos;s no turning back!
        </DialogBody>
        <DialogFooter>
          <Button ref={cancelSubmitAnswerRef} onClick={() => setSubmitAnswerIsOpen(false)}>
            Nah
          </Button>
          <Button colorScheme='green' onClick={() => checkAnswers()} ml={3}>
            Sure thing!
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default SubmitAnswerAlert;