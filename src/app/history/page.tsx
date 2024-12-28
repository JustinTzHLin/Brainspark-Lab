"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Card, Heading, Tabs, IconButton } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Toaster, toaster } from "@/components/ui/toaster";
import VerifyLoggedInModal from "@/components/verifyLoggedInModal";
import { verifyLoggedIn } from "@/utils/quizFormHandler";
import { useAppDispatch } from "@/lib/hooks";
import { replaceIsLoadingModalOpen } from "@/lib/features/loginSlice";
import axios from "axios";
import Navbar from "@/components/navbar";
import TriviaRecords from "./components/triviaRecords";
import TriviaCharts from "./components/triviaCharts";
import { LuArrowLeft } from "react-icons/lu";

const History = () => {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const dispatch = useAppDispatch();
  const router = useRouter();

  interface userInformationType {
    userId: number;
    username: string;
    email: string;
    created_at: string;
    last_visited: string;
  }

  const [userInformation, setUserInformation] = useState<userInformationType>({
    userId: -1,
    username: "",
    email: "",
    created_at: "",
    last_visited: "",
  });
  const [userHistory, setUserHistory] = useState([]);
  const [recordsType, setRecordsType] = useState("quizzes"); // quizzes, questions
  const [tabType, setTabType] = useState("records"); // records, charts

  useEffect(() => {
    const fetchUserInformation = async () => {
      dispatch(replaceIsLoadingModalOpen(true));
      const userInformation: userInformationType = await verifyLoggedIn(
        BACKEND_URL,
        router,
        dispatch,
        replaceIsLoadingModalOpen,
        "/history"
      );
      if (userInformation) {
        setUserInformation(userInformation);
        fetchUserHistory();
      }
    };
    const fetchUserHistory = async () => {
      try {
        const results = await axios(`${BACKEND_URL}/quiz/getUserHistory`, {
          withCredentials: true,
        });
        if (results?.data) setUserHistory(results.data);
        else throw new Error("Failed to get user history.");
        console.log(results.data);
      } catch (err: any) {
        console.log(err);
        toaster.create({
          title: "Error Occurred",
          description: "Something went wrong when fetching user history.",
          type: "error",
          duration: 3000,
        });
      }
    };
    fetchUserInformation();
  }, [BACKEND_URL, dispatch, router]);

  return (
    <Box>
      <Navbar />
      <Flex
        w="full"
        align="center"
        justifyContent="center"
        height="calc(100vh - 63px)"
      >
        <Card.Root variant="elevated" maxH="full" p={4}>
          <Card.Header>
            <Heading size="4xl" textAlign="center">
              History
            </Heading>
          </Card.Header>
          <Card.Body maxH="full">
            <Tabs.Root
              defaultValue="records"
              variant="plain"
              maxH="full"
              value={tabType}
              onValueChange={(e) => setTabType(e.value)}
            >
              <Flex justifyContent="space-between">
                <Tabs.List>
                  <Tabs.Trigger value="records">Records</Tabs.Trigger>
                  <Tabs.Trigger value="charts">Charts</Tabs.Trigger>
                  <Tabs.Indicator
                    borderWidth={0}
                    borderBottomWidth={2}
                    borderColor="black"
                    boxShadow={"none"}
                  />
                </Tabs.List>
                <IconButton
                  variant="ghost"
                  aria-label="back"
                  _icon={{ boxSize: "24px" }}
                  _active={{ transform: "scale(0.8)" }}
                  disabled={recordsType === "quizzes"}
                  display={tabType === "records" ? "flex" : "none"}
                  onClick={() => {
                    if (recordsType === "questions") setRecordsType("quizzes");
                  }}
                >
                  <LuArrowLeft />
                </IconButton>
              </Flex>
              <Tabs.Content value="records" maxH="full">
                <TriviaRecords
                  userHistory={userHistory}
                  recordsType={recordsType}
                  setRecordsType={setRecordsType}
                />
              </Tabs.Content>
              <Tabs.Content value="charts">
                <TriviaCharts userHistory={userHistory} />
              </Tabs.Content>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>
        <VerifyLoggedInModal />
        <Toaster />
      </Flex>
    </Box>
  );
};

export default History;
