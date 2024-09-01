import {
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton, Button
} from "@chakra-ui/react";

interface EmptyAnswerAlertProps {
  answerEmptyIsOpen: boolean,
  answerEmptyClose: () => void,
  cancelAnswerEmptyRef: any
}

const EmptyAnswerAlert: React.FC<EmptyAnswerAlertProps> = ({ answerEmptyIsOpen, answerEmptyClose, cancelAnswerEmptyRef }) => {

  return (
    <AlertDialog motionPreset='scale' leastDestructiveRef={cancelAnswerEmptyRef} onClose={answerEmptyClose} isOpen={answerEmptyIsOpen} isCentered >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Empty Answer?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Please select an answer to proceed.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelAnswerEmptyRef} onClick={answerEmptyClose}>
            Got it!
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EmptyAnswerAlert;