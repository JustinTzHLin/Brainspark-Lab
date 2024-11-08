import { useRef } from "react";
import { Input, IconButton } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { LuMail, LuX } from "react-icons/lu";

interface EmailInputProps {
  setEmail: (nextValue: string) => void;
  isEmailEmpty: boolean;
  setEmailEmpty: (nextValue: boolean) => void;
  email: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  setEmail,
  isEmailEmpty,
  setEmailEmpty,
  email,
}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  return (
    <Field
      mt={6}
      required
      invalid={isEmailEmpty}
      label={"Email"}
      errorText="Email is required."
    >
      <InputGroup
        startElement={<LuMail size={16} color="black" />}
        w="full"
        endElement={
          <IconButton
            variant="plain"
            onClick={() => {
              setEmail("");
              emailInputRef.current?.focus();
            }}
            mr={-2}
            size="xs"
          >
            <LuX color="black" />
          </IconButton>
        }
      >
        <Input
          type="email"
          placeholder="test@test.com"
          ref={emailInputRef}
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          onFocus={() => setEmailEmpty(false)}
        />
      </InputGroup>
    </Field>
  );
};

export default EmailInput;
