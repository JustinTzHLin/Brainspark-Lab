import { useState } from "react";
import { Table } from "@chakra-ui/react";
import he from "he";
import { capitalizing } from "@/utils/globalHandlers";
import RecordsQuestionModal from "../modals/recordsQuestionModal";
import { LuX, LuCheck } from "react-icons/lu";

interface TriviaRecordsProps {
  userHistory: any;
  recordsType: string;
  setRecordsType: (arg0: string) => void;
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

const TriviaRecords: React.FC<TriviaRecordsProps> = ({
  userHistory,
  recordsType,
  setRecordsType,
}) => {
  const [currQuizId, setCurrQuizId] = useState(-1);
  const [currQuestionId, setCurrQuestionId] = useState(-1);
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

  const categoryTranslation = {
    any: "Any",
    "9": "General Knowledge",
    "10": "Entertainment: Books",
    "11": "Entertainment: Film",
    "12": "Entertainment: Music",
    "13": "Entertainment: Musicals & Theatres",
    "14": "Entertainment: Television",
    "15": "Entertainment: Video Games",
    "16": "Entertainment: Board Games",
    "17": "Science & Nature",
    "18": "Science: Computers",
    "19": "Science: Mathematics",
    "20": "Mythology",
    "21": "Sports",
    "22": "Geography",
    "23": "History",
    "24": "Politics",
    "25": "Art",
    "26": "Celebrities",
    "27": "Animals",
    "28": "Vehicles",
    "29": "Entertainment: Comics",
    "30": "Science: Gadgets",
    "31": "Entertainment: Japanese Anime & Manga",
    "32": "Entertainment: Cartoon & Animations",
  };

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
    return formattedDate;
  };

  return (
    <Table.ScrollArea
      borderWidth="1px"
      maxW="full"
      maxH="calc(100vh - 20rem)"
      rounded="md"
    >
      <Table.Root stickyHeader interactive showColumnBorder>
        {recordsType === "quizzes" ? (
          <>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>#</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader>Difficulty</Table.ColumnHeader>
                <Table.ColumnHeader>Type</Table.ColumnHeader>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
                <Table.ColumnHeader>Score</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(userHistory).map((quizId) => (
                <Table.Row
                  key={"quiz_" + quizId}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    setCurrQuizId(Number(quizId));
                    setRecordsType("questions");
                  }}
                >
                  <Table.Cell>
                    {userHistory[quizId].info.question_number}
                  </Table.Cell>
                  <Table.Cell>
                    {
                      categoryTranslation[
                        userHistory[quizId].info
                          .category as keyof typeof categoryTranslation
                      ]
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {capitalizing(userHistory[quizId].info.difficulty)}
                  </Table.Cell>
                  <Table.Cell>
                    {capitalizing(userHistory[quizId].info.question_type)}
                  </Table.Cell>
                  <Table.Cell>
                    {formatDate(userHistory[quizId].info.created_at)}
                  </Table.Cell>
                  <Table.Cell>
                    {`${userHistory[quizId].info.correct_number} /
                      ${userHistory[quizId].info.question_number}`}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </>
        ) : (
          <>
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
              {userHistory[currQuizId].questions.map(
                (question: any, index: number) => (
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
                    <Table.Cell>
                      {capitalizing(question.question_type)}
                    </Table.Cell>
                    <Table.Cell>
                      {question.user_answer === question.correct_answer ? (
                        <LuCheck size={20} />
                      ) : (
                        <LuX size={20} />
                      )}
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </>
        )}
      </Table.Root>
      <RecordsQuestionModal
        questionModalIsOpen={questionModalIsOpen}
        setQuestionModalIsOpen={setQuestionModalIsOpen}
        questionModalObj={questionModalObj}
      />
    </Table.ScrollArea>
  );
};

export default TriviaRecords;
