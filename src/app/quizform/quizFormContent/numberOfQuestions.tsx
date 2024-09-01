import {
  Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Icon,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  SliderFilledTrack, SliderTrack, Slider, SliderThumb
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { RiNumbersFill } from "react-icons/ri";

interface NumberOfQuestionsProps {
  questionNumber: number,
  setQuestionNumber: (nextValue: number) => void
}

const NumberOfQuestions: React.FC<NumberOfQuestionsProps> = ({ questionNumber, setQuestionNumber }) => {

  return (
    <FormControl>
      <FormLabel color='teal.300'>Number of Questions</FormLabel>
      <Flex>
        <InputGroup width='2.5rem'>
          <InputLeftElement pointerEvents='none'>
            <Icon boxSize={5} color='teal.300' as={RiNumbersFill} />
          </InputLeftElement>
          <Input width='0rem' pr='0' />
        </InputGroup>
        <NumberInput focusBorderColor='teal.300' maxW='200px' mr='1.5rem' min={1} max={50} value={questionNumber} onChange={(questionNumber) => setQuestionNumber(Math.round(Number(questionNumber)))} allowMouseWheel>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper>
              <AddIcon boxSize={2.5} />
            </NumberIncrementStepper>
            <NumberDecrementStepper>
              <MinusIcon boxSize={2.5} />
            </NumberDecrementStepper>
          </NumberInputStepper>
        </NumberInput>
        <Slider flex='1' focusThumbOnChange={false} value={questionNumber} onChange={(questionNumber) => setQuestionNumber(questionNumber)} min={1} max={50}>
          <SliderTrack>
            <SliderFilledTrack bg='teal.300' />
          </SliderTrack>
          <SliderThumb fontSize='sm' boxSize='32px'>{questionNumber}</SliderThumb>
        </Slider>
      </Flex>
    </FormControl>
  )
}

export default NumberOfQuestions;