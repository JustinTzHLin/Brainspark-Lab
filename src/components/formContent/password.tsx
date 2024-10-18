import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Button, Input, InputGroup, InputLeftElement, InputRightElement
} from '@chakra-ui/react';
import { LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface PasswordProps {
  setPassword: (nextValue: string) => void,
  isPasswordEmpty: boolean,
  setPasswordEmpty: (nextValue: boolean) => void,
  showPassword: boolean,
  handleView: () => void
}

const Password: React.FC<PasswordProps> = ({ setPassword, isPasswordEmpty, setPasswordEmpty, showPassword, handleView }) => {

  return (
    <FormControl mt={6} isRequired isInvalid={isPasswordEmpty}>
      <FormLabel color='teal.300'>Password</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <LockIcon color='teal.300' />
        </InputLeftElement>
        <Input color='teal.400' focusBorderColor='teal.300' type={showPassword ? 'text' : 'password'} placeholder="*******"
        onChange={e => setPassword(e.currentTarget.value)} onFocus={() => setPasswordEmpty(false)} />
        <InputRightElement width='4.5rem'>
          <Button _hover={{ bg: 'gray.100' }} bg='white' color='teal.300' h='1.75rem' size='md' width='3.75rem' onClick={handleView}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>Password is required.</FormErrorMessage>
    </FormControl>
  )
}

export default Password;