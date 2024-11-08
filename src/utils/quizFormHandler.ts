import { AppDispatch } from "@/lib/store";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { replaceIsLoadingModalOpenType } from "../lib/features/loginSlice";
import { replaceStatusType } from "../lib/features/loginSlice";
import { replaceActionType } from "../lib/features/loginSlice";
import { toaster } from "@/components/ui/toaster";

const verifyLoggedIn = async (
  BACKEND_URL: string,
  router: AppRouterInstance,
  dispatch: AppDispatch,
  replaceIsLoadingModalOpen: replaceIsLoadingModalOpenType
) => {
  try {
    const loggedIn = await axios.post(
      BACKEND_URL + "/user/verifyLoggedIn",
      {},
      { withCredentials: true }
    );
    if (loggedIn?.data?.result) {
      setTimeout(() => dispatch(replaceIsLoadingModalOpen(false)), 1000);
      router.push("/quizform");
    }
  } catch (err: any) {
    console.log(err);
    setTimeout(() => dispatch(replaceIsLoadingModalOpen(false)), 1000);
  }
};

const confirmToken = async (
  token: string,
  BACKEND_URL: string,
  setEmail: (email: string) => void,
  dispatch: AppDispatch,
  replaceStatus: replaceStatusType,
  replaceAction: replaceActionType
) => {
  try {
    const tokenConfirmResult = await axios.post(
      BACKEND_URL + "/user/tokenConfirm",
      { token },
      { withCredentials: true }
    );
    console.log(tokenConfirmResult);
    setEmail(tokenConfirmResult.data.useremail);
    dispatch(replaceStatus("initial_registration"));
    dispatch(replaceAction("signup"));
  } catch (err: any) {
    console.log("LoginForm fetch /tokenConfirm: Error: ", err);
    if (err.response.data.type === "token_expired") {
      toaster.create({
        title: "Token Expired",
        description: "Token expired. Please try again.",
        type: "warning",
        duration: 3000,
      });
    } else {
      toaster.create({
        title: "Error Occurred",
        description:
          "Something went wrong when verifying token. Please contact us.",
        type: "error",
        duration: 3000,
      });
    }
  }
};

export const initialStatusConfirm = (
  token: string | null,
  BACKEND_URL: string,
  setEmail: (email: string) => void,
  router: AppRouterInstance,
  dispatch: AppDispatch,
  replaceStatus: replaceStatusType,
  replaceAction: replaceActionType,
  replaceIsLoadingModalOpen: replaceIsLoadingModalOpenType
) => {
  if (token)
    confirmToken(
      token,
      BACKEND_URL,
      setEmail,
      dispatch,
      replaceStatus,
      replaceAction
    );
  else verifyLoggedIn(BACKEND_URL, router, dispatch, replaceIsLoadingModalOpen);
};
