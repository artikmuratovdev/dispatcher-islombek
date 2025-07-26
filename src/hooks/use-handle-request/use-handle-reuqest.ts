import { useHandleError } from "./../use-handle-error/use-handle-error";
import { Params } from "../types";

export const useHandleRequest = () => {
  const handleError = useHandleError();

  return async ({ request, onSuccess, onError }: Params) => {
    try {
      const result = await request();
      const errors =
        result?.error?.data?.errors ||
        result?.error?.data ||
        result?.error ||
        result?.errors?.data?.errors ||
        result?.errors?.data ||
        result?.errors;

      if (errors) {
        let errorFunc;

        if (onError) {
          errorFunc = onError(errors);
        }

        if (typeof errorFunc !== "function") {
          errorFunc = handleError;
        }

        errorFunc(errors);

        return;
      }

      if (onSuccess) {
        await onSuccess(result);
      }
    } catch (ex) {
      handleError(ex);
      console.error(ex);
    }
  };
};
