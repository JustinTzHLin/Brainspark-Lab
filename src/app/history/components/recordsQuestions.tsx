import { useState } from "react";
import { Table } from "@chakra-ui/react";
import he from "he";
import RecordsQuestionModal from "../modals/recordsQuestionModal";
import { capitalizing } from "@/utils/globalHandlers";
import { LuX, LuCheck } from "react-icons/lu";

interface RecordsQuestionsProps {
  currQuizQuestions: any;
}
export interface QuestionModalObjProps {
  user_answer: string;
  content: string;
  correct_answer: string;
  incorrect_answer: string[];
  category: string;
  difficulty: string;
  question_type: string;
}

const RecordsQuestions: React.FC<RecordsQuestionsProps> = ({
  currQuizQuestions,
}) => {
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);
  const [questionModalObj, setQuestionModalObj] =
    useState<QuestionModalObjProps>({
      user_answer: "",
      content: "",
      correct_answer: "",
      incorrect_answer: [],
      category: "",
      difficulty: "",
      question_type: "",
    });

  return (
    <>
      <Table.ScrollArea
        borderWidth="1px"
        maxW="full"
        maxH="calc(100vh - 20rem)"
        rounded="md"
      >
        <Table.Root stickyHeader interactive showColumnBorder>
          <Table.Header>
            <Table.Row bg="bg.subtle" textAlign="center">
              <Table.ColumnHeader>No.</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Difficulty</Table.ColumnHeader>
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader>Correct</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currQuizQuestions.map((question: any, index: number) => (
              <Table.Row
                key={"question_" + question.question_id}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setQuestionModalIsOpen(true);
                  const questionObj = {
                    user_answer: question.user_answer,
                    content: question.content,
                    correct_answer: question.correct_answer,
                    incorrect_answer: JSON.parse(question.incorrect_answer),
                    category: question.category,
                    difficulty: question.difficulty,
                    question_type: question.question_type,
                  };
                  setQuestionModalObj(questionObj);
                }}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{he.decode(question.category)}</Table.Cell>
                <Table.Cell>{capitalizing(question.difficulty)}</Table.Cell>
                <Table.Cell>{capitalizing(question.question_type)}</Table.Cell>
                <Table.Cell>
                  {question.user_answer === question.correct_answer ? (
                    <LuCheck size={20} />
                  ) : (
                    <LuX size={20} />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <RecordsQuestionModal
        questionModalIsOpen={questionModalIsOpen}
        setQuestionModalIsOpen={setQuestionModalIsOpen}
        questionModalObj={questionModalObj}
      />
    </>
  );
};

export default RecordsQuestions;
