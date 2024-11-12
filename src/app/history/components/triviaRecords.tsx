import { Table } from "@chakra-ui/react";

const TriviaRecords = ({ userHistory }: { userHistory: any }) => {
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
      w="26rem"
      maxW="full"
      maxH="calc(100vh - 20rem)"
      rounded="md"
    >
      <Table.Root stickyHeader interactive>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Difficulty</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(userHistory).map((quizId) => (
            <Table.Row key={"quiz_" + quizId} _hover={{ cursor: "pointer" }}>
              <Table.Cell>
                {userHistory[quizId].info.question_number}
              </Table.Cell>
              <Table.Cell>{userHistory[quizId].info.category}</Table.Cell>
              <Table.Cell>{userHistory[quizId].info.difficulty}</Table.Cell>
              <Table.Cell>{userHistory[quizId].info.question_type}</Table.Cell>
              <Table.Cell>
                {formatDate(userHistory[quizId].info.created_at)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TriviaRecords;
