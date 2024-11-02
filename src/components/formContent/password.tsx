import React from 'react';
import { Button, Input, Group } from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { PasswordInput } from "@/components/ui/password-input"
import { Field } from '@/components/ui/field';
import { LuLock } from "react-icons/lu";

interface PasswordProps {
  setPassword: (nextValue: string) => void,
  isPasswordEmpty: boolean,
  setPasswordEmpty: (nextValue: boolean) => void,
  showPassword: boolean,
  handleView: () => void
}

const Password: React.FC<PasswordProps> = ({ setPassword, isPasswordEmpty, setPasswordEmpty, showPassword, handleView }) => {

  return (
    <Field mt={6} required invalid={isPasswordEmpty} label='Password' errorText='Password is required.'>
      {/* <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <LockIcon color='teal.400' />
        </InputLeftElement>
        <Input color='teal.400' focusBorderColor='teal.400' type={showPassword ? 'text' : 'password'} placeholder="*******"
        onChange={e => setPassword(e.currentTarget.value)} onFocus={() => setPasswordEmpty(false)} />
        <InputRightElement width='4.5rem'>
          <Button _hover={{ bg: 'gray.100' }} bg='white' color='teal.400' h='1.75rem' size='md' width='3.75rem' onClick={handleView}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup> */}
      <InputGroup startElement={<LuLock size={16} color='black'/>} w="full">
        <PasswordInput placeholder="secret password" onChange={e => setPassword(e.currentTarget.value)} onFocus={() => setPasswordEmpty(false)} autoFocus />
        {/* <Input type={showPassword ? 'text' : 'password'} placeholder="*******" 
        onChange={e => setPassword(e.currentTarget.value)} onFocus={() => setPasswordEmpty(false)} />
        <Button _hover={{ bg: 'gray.100' }} bg='white' h='1.75rem' size='md' width='3.75rem' onClick={handleView}>
          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
        </Button> */}
      </InputGroup>
    </Field>
  )
}

export default Password;