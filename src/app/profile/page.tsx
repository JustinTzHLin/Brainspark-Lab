"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Toaster, toaster } from "@/components/ui/toaster";
import VerifyLoggedInModal from "@/components/verifyLoggedInModal";
import UpdatePasswordModal from "./modals/updatePasswordModal";
import { verifyLoggedIn } from "@/utils/quizFormHandler";
import { useAppDispatch } from "@/lib/hooks";
import { replaceIsLoadingModalOpen } from "@/lib/features/loginSlice";
import { LuMenu, LuLogOut, LuHistory, LuTrophy } from "react-icons/lu";

const Profile = () => {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const router = useRouter();
  const dispatch = useAppDispatch();

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
  const [UpdatePasswordIsOpen, setUpdatePasswordIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserInformation = async () => {
      dispatch(replaceIsLoadingModalOpen(true));
      const userInformation: userInformationType = await verifyLoggedIn(
        BACKEND_URL,
        router,
        dispatch,
        replaceIsLoadingModalOpen,
        "/profile"
      );
      if (userInformation) setUserInformation(userInformation);
    };
    fetchUserInformation();
  }, [BACKEND_URL, dispatch, router]);

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate;
  };

  const logOut = async () => {
    console.log("logging out");
    try {
      const logOutResult = await axios("/api/user/logOut", {
        withCredentials: true,
      });
      if (logOutResult?.data.result) router.push("/");
      else throw new Error("Failed to log out.");
    } catch (err) {
      console.log(err);
      toaster.create({
        title: "Error Occurred",
        description: "Something went wrong when logging out.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Flex w="full" align="center" justifyContent="center" height="100vh">
      <Card.Root variant="elevated">
        <Card.Header>
          <Flex mb={6} w="full" justifyContent="space-between">
            <Box w={10}></Box>
            <Avatar
              name={userInformation.username}
              boxSize={180}
              fontSize={90}
            />
            <MenuRoot positioning={{ placement: "bottom-end" }}>
              <MenuTrigger asChild>
                <IconButton variant="ghost" aria-label="menu">
                  <LuMenu />
                </IconButton>
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  value="past-trivia"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => router.push("/history")}
                >
                  <LuHistory size={16} />
                  History
                </MenuItem>
                <MenuItem
                  value="play-trivia"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => router.push("/quizform")}
                >
                  <LuTrophy size={16} />
                  Play Trivia
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Flex>
          <Heading size="4xl" textAlign="center">
            {userInformation.username}
          </Heading>
        </Card.Header>
        <Card.Body>
          <Center>
            <Text textStyle="xl" textAlign="left">
              {userInformation.email}
            </Text>
          </Center>
          <Center mt={4}>
            <Card.Description fontSize="md">
              You joined Triviaosis on:&nbsp;
              <b>{formatDate(userInformation.created_at)}</b>
            </Card.Description>
          </Center>
          <Center mt={2}>
            <Card.Description fontSize="md">
              Your last visit was:&nbsp;
              <b>{formatDate(userInformation.last_visited)}</b>
            </Card.Description>
          </Center>
        </Card.Body>
        <Card.Footer>
          <Flex w="100%" justifyContent="center" gap={2}>
            <Button
              variant="subtle"
              onClick={() => setUpdatePasswordIsOpen(true)}
            >
              Change Password
            </Button>
            <Button variant="subtle" onClick={() => logOut()}>
              <LuLogOut />
              Log Out
            </Button>
          </Flex>
        </Card.Footer>
      </Card.Root>
      <VerifyLoggedInModal />
      <UpdatePasswordModal
        UpdatePasswordIsOpen={UpdatePasswordIsOpen}
        setUpdatePasswordIsOpen={setUpdatePasswordIsOpen}
      />
      <Toaster />
    </Flex>
  );
};

export default Profile;
