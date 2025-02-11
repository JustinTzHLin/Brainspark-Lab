import he from "he";
import { Button } from "@chakra-ui/react";

interface QuestionOptionsProps {
  options: string[];
  selectOption: (index: number) => void;
  buttonBorderColor: string[];
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  options,
  selectOption,
  buttonBorderColor,
}) => {
  return (
    <>
      {Array.from({ length: options.length }).map((_, i) => {
        return (
          <Button
            key={"quiz_option_" + i}
            width="full"
            my={2}
            boxShadow={buttonBorderColor[i]}
            height={options.length === 4 ? "48px" : "112px"}
            variant="ghost"
            fontSize={
              options[i].length > 60 ? 13 : options[i].length > 40 ? 16 : 20
            }
            _active={{ transform: "scale(0.9)" }}
            onClick={() => selectOption(i)}
          >
            <b>{he.decode(options[i])}</b>
          </Button>
        );
      })}
    </>
  );
};

export default QuestionOptions;
