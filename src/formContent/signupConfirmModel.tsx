import {
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton, Button
} from "@chakra-ui/react";
import { useAppDispatch } from "@/lib/hooks";
import { replaceAction } from "@/lib/features/loginSlice";

interface SignupConfirmAlertProps {
  SignupConfirmIsOpen: boolean,
  SignupConfirmClose: () => void,
  cancelSignupConfirmRef: any,
  email: string
}

const SignupConfirmAlert: React.FC<SignupConfirmAlertProps> = ({ SignupConfirmIsOpen, SignupConfirmClose, cancelSignupConfirmRef, email}) => {
  const dispatch = useAppDispatch();

  return (
    <AlertDialog motionPreset='scale' leastDestructiveRef={cancelSignupConfirmRef} onClose={SignupConfirmClose} isOpen={SignupConfirmIsOpen} isCentered onCloseComplete={() => dispatch(replaceAction('login'))}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Thank You for Signing Up!</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Your registration is almost complete. We’ve sent a confirmation email to <b>{email}</b>. Please check your inbox and click the link in the email to activate your account and start enjoying Trivioasis.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelSignupConfirmRef} onClick={SignupConfirmClose}>
            Ok
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SignupConfirmAlert;