"use client";
import React, { Suspense, useEffect } from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { replaceIsLoadingModalOpen } from "@/lib/features/loginSlice";
import { useRouter } from "next/navigation";
import FormContent from "./home/components/formContent";
import VerifyLoggedInModal from "../components/verifyLoggedInModal";
import axios from "axios";

const LogInForm = () => {
  const currentAction = useAppSelector(
    (state) => state.login.userAccess.currentAction
  );

  return (
    <Flex w="full" align="center" justifyContent="center" height="100vh">
      <VerifyLoggedInModal />
      <Box p={8} maxW="full" borderWidth={1} borderRadius={8} boxShadow="md">
        <Box textAlign="center">
          <Heading size="3xl">
            {currentAction === "signup" ? "Sign Up" : "Login"}
          </Heading>{" "}
          {/* color='teal.400' */}
        </Box>

        {/* Login Form Content */}
        <Suspense fallback={<Box w="26rem" height="202px" maxW="full"></Box>}>
          <FormContent />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default LogInForm;
