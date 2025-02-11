import { Table } from "@chakra-ui/react";
import { capitalizing } from "@/utils/globalHandlers";

interface RecordsQuizzesProps {
  displayUserHistory: any;
  initialCategoryValues: any;
  setCurrQuizQuestions: any;
  setRecordsType: any;
}

const RecordsQuizzes: React.FC<RecordsQuizzesProps> = ({
  displayUserHistory,
  initialCategoryValues,
  setCurrQuizQuestions,
  setRecordsType,
}) => {
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
          {displayUserHistory.map((quizInformation: any) => (
            <Table.Row
              key={"quiz_" + quizInformation.info.id}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setCurrQuizQuestions(quizInformation.questions);
                setRecordsType("questions");
              }}
            >
              <Table.Cell>{quizInformation.info.question_number}</Table.Cell>
              <Table.Cell>
                {
                  initialCategoryValues.find(
                    (item: any) => item.value === quizInformation.info.category
                  )?.label
                }
              </Table.Cell>
              <Table.Cell>
                {capitalizing(quizInformation.info.difficulty)}
              </Table.Cell>
              <Table.Cell>
                {capitalizing(quizInformation.info.question_type)}
              </Table.Cell>
              <Table.Cell>
                {formatDate(quizInformation.info.created_at)}
              </Table.Cell>
              <Table.Cell>
                {`${quizInformation.info.correct_number} /
                      ${quizInformation.info.question_number}`}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default RecordsQuizzes;
