"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Box, Flex, Heading } from "@chakra-ui/react";
import { verifyLoggedIn } from "@/utils/quizFormHandler";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { replaceIsLoadingModalOpen } from "@/lib/features/loginSlice";

const Profile = () => {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    verifyLoggedIn(
      BACKEND_URL,
      router,
      dispatch,
      replaceIsLoadingModalOpen,
      "/profile"
    );
  });

  return (
    <Flex w="full" align="center" justifyContent="center" height="100vh">
      {/* <Box p={8} maxW="full" borderWidth={1} borderRadius={8} boxShadow="md">
        Profile
      </Box> */}
      <Card.Root variant="elevated">
        <Card.Header>
          <Heading size="3xl">Profile</Heading>
        </Card.Header>
        <Card.Body>
          <Card.Description>sdasd</Card.Description>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default Profile;
