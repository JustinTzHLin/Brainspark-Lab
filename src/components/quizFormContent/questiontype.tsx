import {
  Box, Stack, FormControl, FormLabel, Icon, Checkbox, Center, Flex
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
      <Flex>
        <Center width='2.75rem' borderColor='gray.200' borderWidth='1px' borderRadius='0.375rem'>
          <Icon boxSize={5} color='teal.300' as={BsUiRadios }/>
        </Center>
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
      </Flex>
    </FormControl>
  )
}

export default QuestionType;