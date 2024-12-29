import { InputGroup } from "@/components/ui/input-group";
import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@/components/ui/field";
import { LuLock } from "react-icons/lu";

interface PwdInputProps {
  setPassword: (nextValue: string) => void;
  isPasswordEmpty: boolean;
  setPasswordEmpty: (nextValue: boolean) => void;
  passwordLabel?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

const PwdInput: React.FC<PwdInputProps> = ({
  setPassword,
  isPasswordEmpty,
  setPasswordEmpty,
  passwordLabel = "Password",
  placeholder = "secret password",
  autoFocus = true,
}) => {
  return (
    <Field
      mt={6}
      required
      invalid={isPasswordEmpty}
      label={passwordLabel}
      errorText="Password is required."
    >
      <InputGroup startElement={<LuLock size={16} color="black" />} w="full">
        <PasswordInput
          placeholder={placeholder}
          onChange={(e) => setPassword(e.currentTarget.value)}
          onFocus={() => setPasswordEmpty(false)}
          autoFocus={autoFocus}
        />
      </InputGroup>
    </Field>
  );
};

export default PwdInput;
