/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { useErrorMsg } from "../use-error-msg/use-error-msg";

export const useHandleError = () => {
  const getErrorMsg = useErrorMsg();

  return (error: any) => {
    toast.error(getErrorMsg(error));
  };
};
