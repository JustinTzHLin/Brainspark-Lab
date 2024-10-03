import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

interface EmailProps {
  setEmail: (nextValue: string) => void,
  isEmailEmpty: boolean,
  setEmailEmpty: (nextValue: boolean) => void
}

const Email: React.FC<EmailProps> = ({ setEmail, isEmailEmpty, setEmailEmpty }) => {
  
  return (
    <FormControl mt={6} isRequired isInvalid={isEmailEmpty}>
      <FormLabel color='teal.300'>Email (Required for Sign up)</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <EmailIcon color='teal.300' />
        </InputLeftElement>
        <Input color='teal.400' focusBorderColor='teal.300' type="email" placeholder="test@test.com"
        onChange={e => setEmail(e.currentTarget.value)} onFocus={() => setEmailEmpty(false)} />
      </InputGroup>
      <FormErrorMessage>Email is required.</FormErrorMessage>
    </FormControl>
  )
}

export default Email;