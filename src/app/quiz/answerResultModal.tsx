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
  checkAnswer: boolean,
  setCheckAnswer: (arg0: boolean) => void,
  router: any,
  questionNumber: number,
  correctCount: number
}

const AnswerResultModal: React.FC<AnswerResultModalProps> = ({ checkAnswer, setCheckAnswer, router, questionNumber, correctCount }) => {

  return (
    <DialogRoot open={checkAnswer} onOpenChange={e => setCheckAnswer(e.open)}>
      <DialogBackdrop />
      <DialogTrigger />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          You got {correctCount} out of {questionNumber} correct!
          That&apos;s a perfect score!
        </DialogBody>
        <DialogFooter>
          <Button colorScheme='blue' mr={3} onClick={() => {router.push('/quizform')}}>
            New Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
    // migrate
    // <Modal isOpen={checkAnswer} onClose={checkAnswerClose}>
    //   <ModalOverlay />
    //   <ModalContent>
    //     <ModalHeader>Modal Title</ModalHeader>
    //     <ModalCloseButton />
    //     <ModalBody>
    //       You got {correctCount} out of {questionNumber} correct!
    //       That&apos;s a perfect score!
    //     </ModalBody>
    //     <ModalFooter>
    //       <Button colorScheme='blue' mr={3} onClick={() => {router.push('/quizform')}}>
    //         New Quiz
    //       </Button>
    //     </ModalFooter>
    //   </ModalContent>
    // </Modal>
  )
}

export default AnswerResultModal;