'use client';
import React from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';
// import { useAppSelector } from '@/lib/hooks';
import LogInFormContent from './loginFormContent';

const LogInForm = () => {

  return (
    <Flex width="100%" align="center" justifyContent="center" p={8} height="100vh">
      <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg"> 
        <Box textAlign="center">
          <Heading color='teal.300'>Login</Heading>
        </Box>

        {/* Login Form Content */}
        <LogInFormContent />
      </Box>
    </Flex>
  );
};

export default LogInForm;
