import {
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton, Button
} from "@chakra-ui/react";

interface SubmitAnswerAlertProps {
  submitAnswerIsOpen: boolean,
  submitAnswerClose: () => void,
  cancelSubmitAnswerRef: any,
  checkAnswers: () => void
}

const SubmitAnswerAlert: React.FC<SubmitAnswerAlertProps> = ({ submitAnswerIsOpen, submitAnswerClose, cancelSubmitAnswerRef, checkAnswers }) => {

  return (
    <AlertDialog motionPreset='scale' leastDestructiveRef={cancelSubmitAnswerRef} onClose={submitAnswerClose} isOpen={submitAnswerIsOpen} isCentered >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Submit Answers?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Double-check your answers, for once you submit, there&apos;s no turning back!
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelSubmitAnswerRef} onClick={submitAnswerClose}>
            Nah
          </Button>
          <Button colorScheme='green' onClick={() => checkAnswers()} ml={3}>
            Sure thing!
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SubmitAnswerAlert;