'use client';
import React, { Suspense } from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { useAppSelector } from '@/lib/hooks';
import FormContent from './formContent';

const LogInForm = () => {
  const currentAction = useAppSelector(state => state.login.loginObject.currentAction);

  return (
    <Flex width="100%" align="center" justifyContent="center" p={8} height="100vh">
      <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg"> 
        <Box textAlign="center">
          <Heading color='teal.300'>{currentAction === 'signup' ? 'Sign Up' : 'Login'}</Heading>
        </Box>

        {/* Login Form Content */}
        <Suspense fallback={<Box width="30rem" height="216px"></Box>}>
          <FormContent />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default LogInForm;
