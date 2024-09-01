import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Icon, Input, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { FaUser } from "react-icons/fa";

interface UsernameProps {
  setUsername: (nextValue: string) => void,
  isUsernameEmpty: boolean,
  setUsernameEmpty: (nextValue: boolean) => void
}

const Username: React.FC<UsernameProps> = ({ setUsername, isUsernameEmpty, setUsernameEmpty }) => {

  return (
    <FormControl isRequired isInvalid={isUsernameEmpty}>
      <FormLabel color='teal.300'>Username</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={FaUser} color='teal.300' />
        </InputLeftElement>
        <Input color='teal.400' focusBorderColor='teal.300' type="text" placeholder="username"
        onChange={e => setUsername(e.currentTarget.value)} onFocus={() => setUsernameEmpty(false)} />
      </InputGroup>
      <FormErrorMessage>Username is required.</FormErrorMessage>
    </FormControl>
  );
}

export default Username;