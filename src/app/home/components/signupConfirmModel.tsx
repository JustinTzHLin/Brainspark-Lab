import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { replaceAction } from "@/lib/features/loginSlice";

interface SignupConfirmAlertProps {
  SignupConfirmIsOpen: boolean;
  setSignupConfirmIsOpen: (arg0: boolean) => void;
  cancelSignupConfirmRef: any;
  email: string;
}

const SignupConfirmAlert: React.FC<SignupConfirmAlertProps> = ({
  SignupConfirmIsOpen,
  setSignupConfirmIsOpen,
  cancelSignupConfirmRef,
  email,
}) => {
  const dispatch = useAppDispatch();

  return (
    <DialogRoot
      motionPreset="scale"
      onOpenChange={(e) => setSignupConfirmIsOpen(e.open)}
      open={SignupConfirmIsOpen}
      placement="center"
      onExitComplete={() => dispatch(replaceAction("login"))}
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thank You for Signing Up!</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          Your registration is almost complete. We’ve sent a confirmation email
          to <b>{email}</b>. Please check your inbox and click the link in the
          email to activate your account and start enjoying Trivioasis.
        </DialogBody>
        <DialogFooter>
          <Button
            ref={cancelSignupConfirmRef}
            onClick={() => setSignupConfirmIsOpen(false)}
            variant="subtle"
          >
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SignupConfirmAlert;
