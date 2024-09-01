import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button
} from "@chakra-ui/react";

interface AnswerResultModalProps {
  checkAnswer: boolean,
  checkAnswerClose: () => void,
  router: any,
  questionNumber: number,
  correctCount: number
}

const AnswerResultModal: React.FC<AnswerResultModalProps> = ({ checkAnswer, checkAnswerClose, router, questionNumber, correctCount }) => {

  return (
    <Modal isOpen={checkAnswer} onClose={checkAnswerClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          You got {correctCount} out of {questionNumber} correct!
          That&apos;s a perfect score!
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => {router.push('/quizform')}}>
            New Quiz
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AnswerResultModal;