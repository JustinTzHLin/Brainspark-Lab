import { Flex, Center } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Slider } from "@/components/ui/slider";
import { RiNumbersFill } from "react-icons/ri";

interface NNumberOfQuestionsInputProps {
  questionNumber: number;
  setQuestionNumber: (nextValue: number) => void;
}

const NumberOfQuestionsInput: React.FC<NNumberOfQuestionsInputProps> = ({
  questionNumber,
  setQuestionNumber,
}) => {
  return (
    <Field label="Number of Questions">
      <Flex w="full">
        <Center
          w="2.5rem"
          borderColor="gray.200"
          borderWidth="1px"
          borderRadius="0.375rem"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          borderRightWidth={0}
        >
          <RiNumbersFill size={20} />
        </Center>
        <NumberInputRoot
          mr="1.5rem"
          min={1}
          max={50}
          value={questionNumber.toString()}
          onValueChange={(e) => setQuestionNumber(Math.round(Number(e.value)))}
          allowMouseWheel
          zIndex="10"
          w="calc(50% - 4rem)"
        >
          <NumberInputField
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
          />
        </NumberInputRoot>
        <Center h={10} w="50%">
          <Slider
            w="full"
            value={[questionNumber]}
            onValueChange={(e) => setQuestionNumber(Number(e.value))}
            min={1}
            max={50}
          />
        </Center>
      </Flex>
    </Field>
  );
};

export default NumberOfQuestionsInput;
