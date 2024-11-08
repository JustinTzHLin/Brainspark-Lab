import { Flex, Box, Stack, Icon, Center } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { PiGaugeBold } from "react-icons/pi";

interface DifficultyRadioProps {
  difficulty: string;
  setDifficulty: (nextValue: string) => void;
}

const DifficultyRadio: React.FC<DifficultyRadioProps> = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <Field mt={6} label="Difficulty">
      <Flex w="full" h={10}>
        <Center
          width="2.5rem"
          borderColor="gray.200"
          borderWidth="1px"
          borderRadius="0.375rem"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          borderRightWidth={0}
        >
          <Icon boxSize={5}>
            <PiGaugeBold />
          </Icon>
        </Center>
        <Center
          w="calc(100% - 2.5rem)"
          borderWidth="1px"
          borderRadius="md"
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
        >
          <RadioGroup
            onValueChange={(e) => setDifficulty(e.value)}
            value={difficulty}
            variant="outline"
          >
            <Stack direction="row" gap={{ base: 2, sm: 5 }}>
              <Radio value="any">Any</Radio>
              <Radio value="easy">Easy</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="hard">Hard</Radio>
            </Stack>
          </RadioGroup>
        </Center>
      </Flex>
    </Field>
  );
};

export default DifficultyRadio;
