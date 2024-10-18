import {
  Flex, Box, Stack, FormControl, FormLabel, FormErrorMessage, Icon, Radio, RadioGroup, Center
} from '@chakra-ui/react';
import { PiGaugeBold } from "react-icons/pi";

interface DifficultyProps {
  difficulty: string,
  setDifficulty: (nextValue: string) => void,
}

const Difficulty: React.FC<DifficultyProps> = ({ difficulty, setDifficulty }) => {
  return (
    <FormControl mt={6}>
      <FormLabel color='teal.300'>Difficulty</FormLabel>
      <Flex>
        <Center width='2.75rem' borderColor='gray.200' borderWidth='1px' borderRadius='0.375rem'>
          <Icon boxSize={5} color='teal.300' as={PiGaugeBold }/>
        </Center>
        <Box borderWidth='1px' borderRadius='md' p={1.5} width='100%'>
          <RadioGroup onChange={setDifficulty} value={difficulty} ml={3} >
            <Stack direction='row' spacing={10} >
              <Radio value='any' colorScheme='teal'>Any</Radio>
              <Radio value='easy' colorScheme='teal'>Easy</Radio>
              <Radio value='medium' colorScheme='teal'>Medium</Radio>
              <Radio value='hard' colorScheme='teal'>Hard</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
      <FormErrorMessage>Username is required.</FormErrorMessage>
    </FormControl>
  )
}

export default Difficulty;