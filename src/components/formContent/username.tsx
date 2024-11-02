import React from 'react';
import { Icon, Input, Group } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { FaUser } from "react-icons/fa";

interface UsernameProps {
  setUsername: (nextValue: string) => void,
  isUsernameEmpty: boolean,
  setUsernameEmpty: (nextValue: boolean) => void
}

const Username: React.FC<UsernameProps> = ({ setUsername, isUsernameEmpty, setUsernameEmpty }) => {

  return (
    <Field required invalid={isUsernameEmpty} label='Username' color='teal.400' errorText='Username is required.'>
      {/* <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={FaUser} color='teal.400' />
        </InputLeftElement>
        <Input color='teal.400' focusBorderColor='teal.400' type="text" placeholder="username"
        onChange={e => setUsername(e.currentTarget.value)} onFocus={() => setUsernameEmpty(false)} />
      </InputGroup> */}
      <Group attached>
        <Icon as={FaUser} color='teal.400' />
        <Input color='teal.400' type="text" placeholder="username" //focusBorderColor='teal.400'
        onChange={e => setUsername(e.currentTarget.value)} onFocus={() => setUsernameEmpty(false)} />
      </Group>
    </Field>
  );
}

export default Username;