'use client';
import React, { Suspense, useEffect } from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { replaceIsLoadingModalOpen } from '@/lib/features/loginSlice';
import { useRouter } from 'next/navigation';
import FormContent from './formContent';
import VerifyLoggedInModal from '../components/verifyLoggedInModal';
import axios from 'axios';

const LogInForm = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  const currentAction = useAppSelector(state => state.login.userAccess.currentAction);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(replaceIsLoadingModalOpen(true));
    const verifyLoggedIn = async () => {
      try {
        const loggedIn = await axios.post(BACKEND_URL + '/user/verifyLoggedIn', {}, {withCredentials: true});
        if (loggedIn?.data?.result) {
          setTimeout(() => dispatch(replaceIsLoadingModalOpen(false)), 800);
          router.push('/quizform');
        }
      } catch (err: any) {
        console.log(err);
        dispatch(replaceIsLoadingModalOpen(false));
      }
    }
    verifyLoggedIn();
  }, [BACKEND_URL, dispatch, router])

  return (
    <Flex width="100%" align="center" justifyContent="center" p={8} height="100vh">
      <VerifyLoggedInModal />
      <Box p={8} maxW="full" borderWidth={1} borderRadius={8} boxShadow="md"> 
        <Box textAlign="center">
          <Heading size="3xl">{currentAction === 'signup' ? 'Sign Up' : 'Login'}</Heading> {/* color='teal.400' */}
        </Box>

        {/* Login Form Content */}
        <Suspense fallback={<Box width="26rem" height="216px" maxW="full"></Box>}>
          <FormContent />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default LogInForm;
