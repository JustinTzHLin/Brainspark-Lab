import React from 'react';
import { Button, Input, Group } from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { PasswordInput } from "@/components/ui/password-input"
import { Field } from '@/components/ui/field';
import { LuLock } from "react-icons/lu";

interface PasswordProps {
  setPassword: (nextValue: string) => void,
  isPasswordEmpty: boolean,
  setPasswordEmpty: (nextValue: boolean) => void
}

const Password: React.FC<PasswordProps> = ({ setPassword, isPasswordEmpty, setPasswordEmpty }) => {

  return (
    <Field mt={6} required invalid={isPasswordEmpty} label='Password' errorText='Password is required.'>
      <InputGroup startElement={<LuLock size={16} color='black'/>} w="full">
        <PasswordInput
          placeholder="secret password" onChange={e => setPassword(e.currentTarget.value)} onFocus={() => setPasswordEmpty(false)} autoFocus
        />
      </InputGroup>
    </Field>
  )
}

export default Password;