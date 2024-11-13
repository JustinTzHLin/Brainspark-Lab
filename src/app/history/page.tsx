"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flex, Card, Heading, Tabs } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import VerifyLoggedInModal from "@/components/verifyLoggedInModal";
import { verifyLoggedIn } from "@/utils/quizFormHandler";
import { useAppDispatch } from "@/lib/hooks";
import { replaceIsLoadingModalOpen } from "@/lib/features/loginSlice";
import axios from "axios";
import TriviaRecords from "./components/triviaRecords";
import TriviaCharts from "./components/triviaCharts";

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
  const [userHistory, setUserHistory] = useState({});

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
    <Flex w="full" align="center" justifyContent="center" height="100vh">
      <Card.Root variant="elevated" maxH="full">
        <Card.Header>
          <Heading size="4xl" textAlign="center">
            History
          </Heading>
        </Card.Header>
        <Card.Body maxH="full">
          <Tabs.Root defaultValue="records" variant="plain" maxH="full">
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
            <Tabs.Content value="records" maxH="full">
              <TriviaRecords userHistory={userHistory} />
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
  );
};

export default History;
