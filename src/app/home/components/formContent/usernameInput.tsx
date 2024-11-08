import React from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { FaUser } from "react-icons/fa";

interface UsernameInputProps {
  setUsername: (nextValue: string) => void;
  isUsernameEmpty: boolean;
  setUsernameEmpty: (nextValue: boolean) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({
  setUsername,
  isUsernameEmpty,
  setUsernameEmpty,
}) => {
  return (
    <Field
      required
      invalid={isUsernameEmpty}
      label="Username"
      color="teal.400"
      errorText="Username is required."
    >
      <InputGroup startElement={<FaUser size={16} color="black" />} w="full">
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
          onFocus={() => setUsernameEmpty(false)}
          autoFocus
        />
      </InputGroup>
    </Field>
  );
};

export default UsernameInput;
