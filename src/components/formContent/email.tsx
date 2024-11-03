import React from 'react';
import { Input, Group, Box } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { InputGroup } from '@/components/ui/input-group';
import { LuMail } from "react-icons/lu";

interface EmailProps {
  setEmail: (nextValue: string) => void,
  isEmailEmpty: boolean,
  setEmailEmpty: (nextValue: boolean) => void
}

const Email: React.FC<EmailProps> = ({ setEmail, isEmailEmpty, setEmailEmpty }) => {
  
  return (
    <Field mt={6} required invalid={isEmailEmpty} label={"Email"} errorText='Email is required.'>
      <InputGroup flex="1" startElement={<LuMail size={16} color="black" />} w='full'>
        <Input type="email" placeholder="test@test.com" autoFocus
        onChange={e => setEmail(e.currentTarget.value)} onFocus={() => setEmailEmpty(false)} />
      </InputGroup>
    </Field>
  )
}

export default Email;