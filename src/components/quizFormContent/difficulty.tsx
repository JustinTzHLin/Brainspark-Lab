import {
  Flex, Box, Stack, Icon, Center
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { PiGaugeBold } from "react-icons/pi";

interface DifficultyProps {
  difficulty: string,
  setDifficulty: (nextValue: string) => void,
}

const Difficulty: React.FC<DifficultyProps> = ({ difficulty, setDifficulty }) => {
  return (
    <Field mt={6} label='Difficulty'>
      <Flex w="full" h={10}>
        <Center width='2.75rem' borderColor='gray.200' borderWidth='1px' borderRadius='0.375rem' borderTopRightRadius={0} borderBottomRightRadius={0} borderRightWidth={0}>
          <Icon boxSize={5}>
            <PiGaugeBold />
          </Icon>
        </Center>
        <Center borderWidth='1px' borderRadius='md' w="full" borderTopLeftRadius={0} borderBottomLeftRadius={0}>
          <RadioGroup onValueChange={e => setDifficulty(e.value)} value={difficulty} variant="outline">
            <Stack direction='row' gap={5}>
              <Radio value='any'>Any</Radio>
              <Radio value='easy'>Easy</Radio>
              <Radio value='medium'>Medium</Radio>
              <Radio value='hard'>Hard</Radio>
            </Stack>
          </RadioGroup>
        </Center>
      </Flex>
    </Field>
  )
}

export default Difficulty;