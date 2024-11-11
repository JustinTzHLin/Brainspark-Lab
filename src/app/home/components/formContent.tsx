import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Text, Link, Center } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import EmailInput from "./formContent/emailInput";
import PwdInput from "./formContent/pwdInput";
import UsernameInput from "./formContent/usernameInput";
import SignupConfirmModal from "../modals/signupConfirmModal";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import validator from "validator";
import { replaceAction, replaceStatus } from "@/lib/features/loginSlice";
import { replaceIsLoadingModalOpen } from "@/lib/features/loginSlice";
import { initialStatusConfirm } from "@/utils/quizFormHandler";

const FormContent = () => {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const router = useRouter();
  const { currentAction, currentStatus } = useAppSelector(
    (state) => state.login.userAccess
  );
  const dispatch = useAppDispatch();
  const searchParamas = useSearchParams();

  const [signupConfirmIsOpen, setSignupConfirmIsOpen] = useState(false);
  const cancelSignupConfirmRef = useRef<null | HTMLButtonElement>(null);

  useEffect(() => {
    const token = searchParamas.get("token");
    dispatch(replaceIsLoadingModalOpen(true));
    initialStatusConfirm(
      token,
      BACKEND_URL,
      setEmail,
      router,
      dispatch,
      replaceStatus,
      replaceAction,
      replaceIsLoadingModalOpen,
      "/quizform"
    );
  }, [BACKEND_URL, dispatch, router, searchParamas]);

  // Handle click continue button
  const handleContinue = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (currentStatus === "email_input") {
      // Check inputs are not empty
      if (!email) setEmailEmpty(true);
      if (email) {
        setBtnIsLoading(true);
        console.log("start sign in");
        try {
          // Sign in process
          if (validator.isEmail(email)) {
            const loginResult = await axios.post(
              BACKEND_URL + "/user/emailConfirm",
              { email },
              { withCredentials: true }
            );
            console.log(loginResult);
            if (loginResult.data.result === "email_not_existed") {
              if (currentAction === "signup") {
                const sendEmailResult = await axios.post(
                  BACKEND_URL + "/user/confirmRegistration",
                  { email },
                  { withCredentials: true }
                );
                console.log(sendEmailResult);
                setBtnIsLoading(false);
                setSignupConfirmIsOpen(true);
              } else if (currentAction === "login") {
                setBtnIsLoading(false);
                toaster.create({
                  title: "The email doesn't belong to any account.",
                  description: "Please sign up first.",
                  type: "warning",
                  duration: 3000,
                });
                dispatch(replaceAction("signup"));
              }
            } else if (loginResult.data.result === "email_existed") {
              if (currentAction === "signup") {
                setBtnIsLoading(false);
                toaster.create({
                  title: "The email already belongs to an account.",
                  description: "Please try to login.",
                  type: "warning",
                  duration: 3000,
                });
                dispatch(replaceAction("login"));
              } else if (currentAction === "login") {
                setBtnIsLoading(false);
                dispatch(replaceStatus("password_input"));
              }
            }
          } else {
            setBtnIsLoading(false);
            toaster.create({
              title: "Email Not Valid",
              description: "Please enter a valid email.",
              type: "warning",
              duration: 3000,
            });
          }
        } catch (err: any) {
          // Handle error in specific case
          setBtnIsLoading(false);
          console.log("LoginForm fetch /confirmEmail: Error: ", err);
          toaster.create({
            title: "Error Occurred",
            description: "Something went wrong when confirming your email.",
            type: "error",
            duration: 3000,
          });
        }
      }
    } else if (currentStatus === "password_input") {
      if (!password) setPasswordEmpty(true);
      if (password) {
        setBtnIsLoading(true);
        console.log("start login");
        try {
          // Sign in process
          const loginResult = await axios.post(
            BACKEND_URL + "/user/signIn",
            { password, email },
            { withCredentials: true }
          );
          console.log(loginResult);
          router.push("/quizform");
          setBtnIsLoading(false);
        } catch (err: any) {
          // Handle error in specific case
          setBtnIsLoading(false);
          console.log("LoginForm fetch /signIn: Error: ", err);
          if (
            err.response.data.type === "user_not_found" ||
            err.response.data.type === "invalid_credentials"
          ) {
            // test toast.closeAll()
            toaster.create({
              title: "Login Failed",
              description: (
                <p>
                  Username or Password incorrect.
                  <br />
                  You can sign up or try again later.
                </p>
              ),
              type: "warning",
              duration: 3000,
            });
          } else {
            toaster.create({
              title: "Error Occurred",
              description: "Something went wrong when signing in.",
              type: "error",
              duration: 3000,
            });
          }
        }
      }
    } else if (currentStatus === "initial_registration") {
      // Check inputs are not empty
      if (!password) setPasswordEmpty(true);
      if (!username) setUsernameEmpty(true);
      if (!email) {
        toaster.create({
          title: "Error Occurred",
          description: "This link may be expired or already used.",
          type: "error",
          duration: 3000,
        });
      }

      // Sign up process
      if (password && username && email) {
        setBtnIsLoading(true);
        console.log("start sign up");
        try {
          const signUpResult = await axios.post(
            BACKEND_URL + "/user/signUp",
            { username, password, email },
            { withCredentials: true }
          );
          console.log(signUpResult);
          router.push("/quizform");
          setBtnIsLoading(false);
        } catch (err: any) {
          // Handle error in specific case
          setBtnIsLoading(false);
          console.log("LoginForm fetch /signUp: Error: ", err);
          if (err.response.data.type === "email_already_exists") {
            // test toast.closeAll();
            toaster.create({
              title: "Sign Up Failed",
              description: "Please choose a different email.",
              type: "warning",
              duration: 3000,
            });
          } else {
            toaster.create({
              title: "Error Occurred",
              description: "Something went wrong when signing in.",
              type: "error",
              duration: 3000,
            });
          }
        }
      }
    }
  };

  // Handle click as guest
  // const handleGuest = () => {router.push('/quizform')};

  return (
    <Box my={4} textAlign="left" width="26rem" maxW="full">
      <Toaster />
      <form>
        {/* Email Input */}
        {currentStatus === "email_input" ? (
          <EmailInput
            setEmail={setEmail}
            isEmailEmpty={isEmailEmpty}
            setEmailEmpty={setEmailEmpty}
            email={email}
          />
        ) : currentStatus === "password_input" ? (
          <PwdInput
            setPassword={setPassword}
            isPasswordEmpty={isPasswordEmpty}
            setPasswordEmpty={setPasswordEmpty}
          />
        ) : currentStatus === "initial_registration" ? (
          <>
            <UsernameInput
              setUsername={setUsername}
              isUsernameEmpty={isUsernameEmpty}
              setUsernameEmpty={setUsernameEmpty}
            />
            <PwdInput
              setPassword={setPassword}
              isPasswordEmpty={isPasswordEmpty}
              setPasswordEmpty={setPasswordEmpty}
            />
          </>
        ) : null}

        {/* Submit Button */}
        <Button
          width="full"
          mt={4}
          type="submit"
          onClick={handleContinue}
          loading={btnIsLoading}
          size="md"
        >
          <Text textStyle="md">Continue</Text>
        </Button>

        <Center mt={6}>
          <Text>
            {currentAction === "signup"
              ? "Already have an account? "
              : "Don’t have an account? "}
            <Link
              onClick={() => {
                dispatch(
                  replaceAction(currentAction === "signup" ? "login" : "signup")
                );
                dispatch(replaceStatus("email_input"));
              }}
              _hover={{ cursor: "pointer" }}
            >
              {currentAction === "signup" ? "Login" : "Sign Up"}
            </Link>
          </Text>
        </Center>

        <SignupConfirmModal
          SignupConfirmIsOpen={signupConfirmIsOpen}
          setSignupConfirmIsOpen={setSignupConfirmIsOpen}
          cancelSignupConfirmRef={cancelSignupConfirmRef}
          email={email}
        />
      </form>
    </Box>
  );
};

export default FormContent;
