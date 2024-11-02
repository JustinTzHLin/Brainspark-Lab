import {
  Flex, Icon, Center,
  // NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  // SliderFilledTrack, SliderTrack, Slider, SliderThumb
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { Slider } from "@/components/ui/slider"
import { RiNumbersFill } from "react-icons/ri";

interface NumberOfQuestionsProps {
  questionNumber: number,
  setQuestionNumber: (nextValue: number) => void
}

const NumberOfQuestions: React.FC<NumberOfQuestionsProps> = ({ questionNumber, setQuestionNumber }) => {

  return (
    <Field label='Number of Questions'>
      <Flex w="full">
        <Center width='2.5rem' borderColor='gray.200' borderWidth='1px' borderRadius='0.375rem' borderTopRightRadius={0} borderBottomRightRadius={0} borderRightWidth={0}>
          <Icon boxSize={5}>
            <RiNumbersFill />
          </Icon>
        </Center>
        <NumberInputRoot mr='1.5rem' min={1} max={50} value={questionNumber.toString()} onValueChange={(e) => setQuestionNumber(Math.round(Number(e.value)))} allowMouseWheel zIndex='10'>
          <NumberInputField borderTopLeftRadius={0} borderBottomLeftRadius={0} />
        </NumberInputRoot>
        <Center h={10} w="40%">
          <Slider
            flex='1' value={[questionNumber]} onValueChange={(e) => setQuestionNumber(Number(e.value))} min={1} max={50}//test
          /> 
        </Center>
        {/* focusThumbOnChange={false} */}
          {/* <SliderTrack>
            <SliderFilledTrack bg='teal.400' />
          </SliderTrack>
          <SliderThumb fontSize='sm' boxSize='32px'>{questionNumber}</SliderThumb> */}
      </Flex>
    </Field>
  )
}

export default NumberOfQuestions;