import { useState } from "react";
import { Flex, Text, Stack } from "@chakra-ui/react";
import { MenuContent, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RecordsQuizzes from "./recordsQuizzes";
import RecordsQuestions from "./recordsQuestions";
import { LuChevronDown } from "react-icons/lu";

interface TriviaRecordsProps {
  userHistory: any;
  recordsType: string;
  setRecordsType: (arg0: string) => void;
}

const initialCategoryValues = [
  { label: "Any", checked: true, value: "any" },
  { label: "General Knowledge", checked: true, value: "9" },
  { label: "Entertainment: Books", checked: true, value: "10" },
  { label: "Entertainment: Film", checked: true, value: "11" },
  { label: "Entertainment: Music", checked: true, value: "12" },
  { label: "Entertainment: Musicals & Theatres", checked: true, value: "13" },
  { label: "Entertainment: Television", checked: true, value: "14" },
  { label: "Entertainment: Video Games", checked: true, value: "15" },
  { label: "Entertainment: Board Games", checked: true, value: "16" },
  { label: "Science & Nature", checked: true, value: "17" },
  { label: "Science: Computers", checked: true, value: "18" },
  { label: "Science: Mathematics", checked: true, value: "19" },
  { label: "Mythology", checked: true, value: "20" },
  { label: "Sports", checked: true, value: "21" },
  { label: "Geography", checked: true, value: "22" },
  { label: "History", checked: true, value: "23" },
  { label: "Politics", checked: true, value: "24" },
  { label: "Art", checked: true, value: "25" },
  { label: "Celebrities", checked: true, value: "26" },
  { label: "Animals", checked: true, value: "27" },
  { label: "Vehicles", checked: true, value: "28" },
  { label: "Entertainment: Comics", checked: true, value: "29" },
  { label: "Science: Gadgets", checked: true, value: "30" },
  {
    label: "Entertainment: Japanese Anime & Manga",
    checked: true,
    value: "31",
  },
  { label: "Entertainment: Cartoon & Animations", checked: true, value: "32" },
];
const initialDifficultyValues = [
  { label: "Any", checked: true, value: "any" },
  { label: "Easy", checked: true, value: "easy" },
  { label: "Medium", checked: true, value: "medium" },
  { label: "Hard", checked: true, value: "hard" },
];
const initialQuestionTypeValues = [
  { label: "Any", checked: true, value: "any" },
  { label: "Multiple Choice", checked: true, value: "multiple" },
  { label: "True / False", checked: true, value: "boolean" },
];

const TriviaRecords: React.FC<TriviaRecordsProps> = ({
  userHistory,
  recordsType,
  setRecordsType,
}) => {
  const [currQuizQuestions, setCurrQuizQuestions] = useState([]);

  const [categoryCheckboxValues, setCategoryCheckboxValues] = useState(
    initialCategoryValues
  );
  const categoryAllChecked = categoryCheckboxValues.every(
    (item) => item.checked
  );
  const categorySomeChecked = categoryCheckboxValues.some(
    (item) => item.checked
  );
  const categoryFilterArray = categoryCheckboxValues
    .filter((item) => item.checked)
    .map((item) => item.value);

  const [difficultyCheckboxValues, setDifficultyCheckboxValues] = useState(
    initialDifficultyValues
  );
  const difficultyAllChecked = difficultyCheckboxValues.every(
    (item) => item.checked
  );
  const difficultySomeChecked = difficultyCheckboxValues.some(
    (item) => item.checked
  );
  const difficultyFilterArray = difficultyCheckboxValues
    .filter((item) => item.checked)
    .map((item) => item.value);

  const [questionTypeCheckboxValues, setQuestionTypeCheckboxValues] = useState(
    initialQuestionTypeValues
  );
  const questionTypeAllChecked = questionTypeCheckboxValues.every(
    (item) => item.checked
  );
  const questionTypeSomeChecked = questionTypeCheckboxValues.some(
    (item) => item.checked
  );
  const questionTypeFilterArray = questionTypeCheckboxValues
    .filter((item) => item.checked)
    .map((item) => item.value);

  const displayUserHistory = userHistory.filter(
    (quiz: any) =>
      categoryFilterArray.includes(quiz.info.category) &&
      difficultyFilterArray.includes(quiz.info.difficulty) &&
      questionTypeFilterArray.includes(quiz.info.question_type)
  );

  const resetFilters = () => {
    setCategoryCheckboxValues(initialCategoryValues);
    setDifficultyCheckboxValues(initialDifficultyValues);
    setQuestionTypeCheckboxValues(initialQuestionTypeValues);
  };

  return (
    <>
      <Flex align="center" mb={2} justifyContent="space-between" gap={2}>
        <Text>Filter: </Text>

        {/* Category Filter */}
        <MenuRoot aria-label="Category Filter">
          <MenuTrigger asChild>
            <Button variant="outline" size="sm" pr={2}>
              Category
              <LuChevronDown />
            </Button>
          </MenuTrigger>
          <MenuContent p={4} h={400} overflowY="auto">
            <Stack p={2}>
              <Checkbox
                checked={
                  categoryAllChecked
                    ? true
                    : categorySomeChecked
                      ? "indeterminate"
                      : false
                }
                onCheckedChange={(e) => {
                  setCategoryCheckboxValues((current) =>
                    current.map((value) => ({ ...value, checked: !!e.checked }))
                  );
                }}
              >
                All
              </Checkbox>
              {categoryCheckboxValues.map((item, index) => (
                <Checkbox
                  key={"categoryFilter_" + item.value}
                  value={item.value}
                  checked={item.checked}
                  ms={6}
                  onCheckedChange={(e: any) => {
                    setCategoryCheckboxValues((current) => {
                      const newValues = [...current];
                      newValues[index] = {
                        ...newValues[index],
                        checked: !!e.checked,
                      };
                      return newValues;
                    });
                  }}
                >
                  {item.label}
                </Checkbox>
              ))}
            </Stack>
          </MenuContent>
        </MenuRoot>

        {/* Difficulty Filter */}
        <MenuRoot aria-label="Difficulty Filter">
          <MenuTrigger asChild>
            <Button variant="outline" size="sm" pr={2}>
              Difficulty
              <LuChevronDown />
            </Button>
          </MenuTrigger>
          <MenuContent p={4}>
            <Stack p={2}>
              <Checkbox
                checked={
                  difficultyAllChecked
                    ? true
                    : difficultySomeChecked
                      ? "indeterminate"
                      : false
                }
                onCheckedChange={(e) => {
                  setDifficultyCheckboxValues((current) =>
                    current.map((value) => ({ ...value, checked: !!e.checked }))
                  );
                }}
              >
                All
              </Checkbox>
              {difficultyCheckboxValues.map((item, index) => (
                <Checkbox
                  key={"difficultyFilter_" + item.value}
                  value={item.value}
                  checked={item.checked}
                  ms={6}
                  onCheckedChange={(e: any) => {
                    setDifficultyCheckboxValues((current) => {
                      const newValues = [...current];
                      newValues[index] = {
                        ...newValues[index],
                        checked: !!e.checked,
                      };
                      return newValues;
                    });
                  }}
                >
                  {item.label}
                </Checkbox>
              ))}
            </Stack>
          </MenuContent>
        </MenuRoot>

        {/* Question Type Filter */}
        <MenuRoot aria-label="Type Filter">
          <MenuTrigger asChild>
            <Button variant="outline" size="sm" pr={2}>
              Type
              <LuChevronDown />
            </Button>
          </MenuTrigger>
          <MenuContent p={4}>
            <Stack p={2}>
              <Checkbox
                checked={
                  questionTypeAllChecked
                    ? true
                    : questionTypeSomeChecked
                      ? "indeterminate"
                      : false
                }
                onCheckedChange={(e) => {
                  setQuestionTypeCheckboxValues((current) =>
                    current.map((value) => ({ ...value, checked: !!e.checked }))
                  );
                }}
              >
                All
              </Checkbox>
              {questionTypeCheckboxValues.map((item, index) => (
                <Checkbox
                  key={"questionTypeFilter_" + item.value}
                  value={item.value}
                  checked={item.checked}
                  ms={6}
                  onCheckedChange={(e: any) => {
                    setQuestionTypeCheckboxValues((current) => {
                      const newValues = [...current];
                      newValues[index] = {
                        ...newValues[index],
                        checked: !!e.checked,
                      };
                      return newValues;
                    });
                  }}
                >
                  {item.label}
                </Checkbox>
              ))}
            </Stack>
          </MenuContent>
        </MenuRoot>

        <Button variant="ghost" size="sm" onClick={() => resetFilters()}>
          Clean Filter
        </Button>
      </Flex>
      {recordsType === "quizzes" ? (
        <RecordsQuizzes
          displayUserHistory={displayUserHistory}
          initialCategoryValues={initialCategoryValues}
          setCurrQuizQuestions={setCurrQuizQuestions}
          setRecordsType={setRecordsType}
        />
      ) : (
        <RecordsQuestions currQuizQuestions={currQuizQuestions} />
      )}
    </>
  );
};

export default TriviaRecords;
