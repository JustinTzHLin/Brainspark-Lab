import {
  Box, Stack, FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, Icon, Checkbox,
} from '@chakra-ui/react';
import { BsUiRadios } from "react-icons/bs";

interface QuestionTypeProps {
  questionTypes: boolean[],
  setQuestionTypes: (nextValue: boolean[]) => void
}

const QuestionType: React.FC<QuestionTypeProps> = ({ questionTypes, setQuestionTypes }) => {
  return (
    <FormControl mt={6}>
      <FormLabel color='teal.300'>Question Type</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon boxSize={5} color='teal.300' as={BsUiRadios} />
        </InputLeftElement>
        <Input width='0rem' pr='0' />
        <Box borderWidth='1px' borderRadius='md' p={1.5} width='100%'>
          <Stack direction='row' spacing={10} ml={3} >
            <Checkbox colorScheme='teal' isChecked={questionTypes[0]} onChange={() => setQuestionTypes([true, false, false])}>
              Any
            </Checkbox>
            <Checkbox colorScheme='teal' isChecked={questionTypes[1]} onChange={() => setQuestionTypes([false, true, false])}>
              Multiple Choice
            </Checkbox>
            <Checkbox colorScheme='teal' isChecked={questionTypes[2]} onChange={() => setQuestionTypes([false, false, true])}>
              True / False
            </Checkbox>
          </Stack>
        </Box>
      </InputGroup>
      <FormErrorMessage>Password is required.</FormErrorMessage>
    </FormControl>
  )
}

export default QuestionType;