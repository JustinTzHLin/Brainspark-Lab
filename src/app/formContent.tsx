import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Stack, Box, Button, Text, Link, useToast, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import Email from '../components/formContent/email';
import Password from '../components/formContent/password';
import Username from '../components/formContent/username';
import SignupConfirmAlert from '../components/formContent/signupConfirmModel';
import { useAppSelector } from '@/lib/hooks';
import { useAppDispatch } from '@/lib/hooks';
import validator from 'validator';
import { replaceAction, replaceStatus } from '@/lib/features/loginSlice';

const FormContent = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  const [email, setEmail] = useState('');
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [username, setUsername] = useState('');
  const [isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { currentAction, currentStatus } = useAppSelector(state => state.login.loginObject);
  const dispatch = useAppDispatch();
  const searchParamas = useSearchParams();

  const { isOpen: signupConfirmIsOpen, onOpen: signupConfirmOpen, onClose: signupConfirmClose } = useDisclosure();
  const cancelSignupConfirmRef = useRef<null | HTMLButtonElement>(null);

  useEffect(() => {
    const confirmToken = async () => {
      const token = searchParamas.get('token');
      if (token) {
        try {
          const tokenConfirmResult = await axios.post(BACKEND_URL + '/user/tokenConfirm', {token}, {withCredentials: true});
          console.log(tokenConfirmResult);
          setEmail(tokenConfirmResult.data.useremail);
          dispatch(replaceStatus('initial_registration'));
          dispatch(replaceAction('signup'));
        } catch (err: any) {
          console.log('LoginForm fetch /tokenConfirm: Error: ', err);
          if (err.response.data.type === 'token_expired') {
            router.push('/');
            toast({
              position: 'top',
              title: 'Error Occurred',
              description: "Token expired. Please try again.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              position: 'top',
              title: 'Error Occurred',
              description: "Something went wrong. Please contact us.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        }
      }
    }
    confirmToken();
  }, [BACKEND_URL, dispatch, router, searchParamas, toast])

  // Handle click login button
  const handleContinue = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (currentStatus === 'email_input') {
      // Check inputs are not empty 
      if (!email) setEmailEmpty(true);
      if (email) {
        setBtnIsLoading(true);
        console.log('start sign in');
        try {

          // Sign in process
          if (validator.isEmail(email)) {
            const loginResult = await axios.post(BACKEND_URL + '/user/emailConfirm', {email}, {withCredentials: true});
            setBtnIsLoading(false);
            console.log(loginResult);
            if (loginResult.data.result === 'email_not_existed') {
              if (currentAction === 'signup') {
                const sendEmailResult = await axios.post(BACKEND_URL + '/user/confirmRegistration', {email}, {withCredentials: true});
                console.log(sendEmailResult);
                signupConfirmOpen();
              } else if (currentAction === 'login') {
                toast({
                  position: 'top',
                  title: 'The email doesn\'t belong to any account.',
                  description: (<p>Please sign up first.</p>),
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
                dispatch(replaceAction('signup'));
              }
            } else if (loginResult.data.result === 'email_existed') {
              if (currentAction === 'signup') {
                toast({
                  position: 'top',
                  title: 'The email already belongs to an account.',
                  description: (<p>Please try to login.</p>),
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
                dispatch(replaceAction('login'));
              } else if (currentAction === 'login') {
                dispatch(replaceStatus('password_input'));
              }
            }
          } else {
            setBtnIsLoading(false);
            toast({
              position: 'top',
              title: 'Email Not Valid',
              description: (<p>Please enter a valid email.</p>),
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }

        } // Handle error in specific case
          catch (err: any) {
            setBtnIsLoading(false);
            console.log('LoginForm fetch /confirmEmail: Error: ', err);
            toast({
              position: 'top',
              title: 'Error Occurred',
              description: "Something went wrong when confirming your email.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
        }
      }
    } else if (currentStatus === 'password_input') {
      if (!password) setPasswordEmpty(true);
      if (password) {
        setBtnIsLoading(true);
        console.log('start login');
        try {

          // Sign in process
          const loginResult = await axios.post(BACKEND_URL + '/user/signIn', {password, email}, {withCredentials: true});
          console.log(loginResult);
          router.push('/quizform');

        } // Handle error in specific case
          catch (err: any) {
          setBtnIsLoading(false);
          console.log('LoginForm fetch /signIn: Error: ', err);
          if (err.response.data.type === 'user_not_found' || err.response.data.type === 'invalid_credentials') {
            toast.closeAll();
            toast({
              position: 'top',
              title: 'Login Failed',
              description: (<p>Username or Password incorrect.<br />You can sign up or try again later.</p>),
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              position: 'top',
              title: 'Error Occurred',
              description: "Something went wrong when signing in.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        }
      }
    } else if (currentStatus === 'initial_registration') {
      // Check inputs are not empty 
      if (!password) setPasswordEmpty(true);
      if (!username) setUsernameEmpty(true);
      if (!email) {
        toast({
          position: 'top',
          title: 'Error Occurred',
          description: "This link may be expired or already used.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      // Sign up process
      if(password && username && email) {
        setBtnIsLoading(true);
        console.log('start sign up');
        try {
          const signUpResult = await axios.post(BACKEND_URL + '/user/signUp', {username, password, email}, {withCredentials: true});
          setBtnIsLoading(false);
          console.log(signUpResult);
          router.push('/quizform');

        } // Handle error in specific case
          catch (err: any) {
          setBtnIsLoading(false);
          console.log('LoginForm fetch /signUp: Error: ', err);
          if (err.response.data.type === 'email_already_exists') {
            toast.closeAll();
            toast({
              position: 'top',
              title: 'Error Occurred',
              description: "Please choose a different username.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              position: 'top',
              title: 'Error Occurred',
              description: "Something went wrong when signing in.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        }
      }
    }
  };

  // Handle click as guest
  // const handleGuest = () => {router.push('/quizform')};

  return (
    <Box my={4} textAlign="left" width='30rem'>
      <form>

        {/* Email Input */}
        {
          currentStatus === 'email_input' ? <Email setEmail={setEmail} isEmailEmpty={isEmailEmpty} setEmailEmpty={setEmailEmpty} />
            : currentStatus === 'password_input' ? <Password setPassword={setPassword} isPasswordEmpty={isPasswordEmpty} setPasswordEmpty={setPasswordEmpty} showPassword={showPassword} handleView={() => {setShowPassword(!showPassword)}} />
            : currentStatus === 'initial_registration' ? <>
              <Username setUsername={setUsername} isUsernameEmpty={isUsernameEmpty} setUsernameEmpty={setUsernameEmpty} />
              <Password setPassword={setPassword} isPasswordEmpty={isPasswordEmpty} setPasswordEmpty={setPasswordEmpty} showPassword={showPassword} handleView={() => {setShowPassword(!showPassword)}} />
            </> : null
        }

        {/* Submit Button */}
        <Button
          color='white' _hover={{ bg: 'teal' }} bg='teal.300' border='1px' borderColor='#ccd0d5' width="full" mt={4} type="submit" onClick={handleContinue}
          isLoading={btnIsLoading}
        >
          Continue
        </Button>

        <Stack pt={6}>
          <Text align={'center'} onClick={() => {
            dispatch(replaceAction(currentAction === 'signup' ? 'login' : 'signup'))
            dispatch(replaceStatus('email_input'));
          }}
            _hover={{ cursor: 'pointer' }}>
            {currentAction === 'signup' ? 'Already have an account?' : "Don’t have an account?"} <Link color={'teal.500'}>{currentAction === 'signup' ? 'Login' : 'Sign Up'}</Link>
          </Text>
        </Stack>

        <SignupConfirmAlert SignupConfirmIsOpen={signupConfirmIsOpen} SignupConfirmClose={signupConfirmClose} cancelSignupConfirmRef={cancelSignupConfirmRef} email={email} />
      </form>
    </Box>
  )
}

export default FormContent;