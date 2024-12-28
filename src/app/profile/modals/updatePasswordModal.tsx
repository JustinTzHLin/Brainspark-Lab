import { useState } from "react";
import axios from "axios";
import { Center, Heading } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toaster, toaster } from "@/components/ui/toaster";
import PwdInput from "@/app/home/components/formContent/pwdInput";

interface UpdatePasswordModalProps {
  UpdatePasswordIsOpen: boolean;
  setUpdatePasswordIsOpen: (arg0: boolean) => void;
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  UpdatePasswordIsOpen,
  setUpdatePasswordIsOpen,
}) => {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const [password, setPassword] = useState("");
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordEmpty, setNewPasswordEmpty] = useState(false);

  const handleUpdatePassword = async () => {
    if (checkPassword()) {
      try {
        const updatePasswordResult = await axios.post(
          BACKEND_URL + "/user/changePassword",
          {
            password,
            newPassword,
          },
          { withCredentials: true }
        );
        console.log(updatePasswordResult);
        toaster.create({
          title: "Password Updated",
          description: "Password updated successfully.",
          type: "success",
          duration: 3000,
        });
        setUpdatePasswordIsOpen(false);
      } catch (err: any) {
        console.log(err);
        toaster.create({
          title: "Error Occurred",
          description: "Something went wrong when updating password.",
          type: "error",
          duration: 3000,
        });
      }
    }
  };

  const checkPassword = () => {
    if (!password) setPasswordEmpty(true);
    if (!newPassword) setNewPasswordEmpty(true);
    if (!password || !newPassword) return false;

    if (password === newPassword) {
      toaster.create({
        title: "Equal Password",
        description: <p>Password must be different from current password</p>,
        type: "warning",
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  return (
    <DialogRoot
      motionPreset="scale"
      onOpenChange={(e) => setUpdatePasswordIsOpen(e.open)}
      open={UpdatePasswordIsOpen}
      placement="center"
      onExitComplete={() => {
        setPassword("");
        setNewPassword("");
        setPasswordEmpty(false);
        setNewPasswordEmpty(false);
      }}
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <Center>
            <Heading size="2xl">Change Password</Heading>
          </Center>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <PwdInput
            setPassword={setPassword}
            isPasswordEmpty={isPasswordEmpty}
            setPasswordEmpty={setPasswordEmpty}
            placeholder="current password"
          />
          <PwdInput
            setPassword={setNewPassword}
            isPasswordEmpty={isNewPasswordEmpty}
            setPasswordEmpty={setNewPasswordEmpty}
            passwordLabel="New Password"
            placeholder="new password"
            autoFocus={false}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleUpdatePassword}>Update</Button>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </DialogRoot>
  );
};

export default UpdatePasswordModal;
