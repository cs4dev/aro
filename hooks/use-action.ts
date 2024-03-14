import { ActionState, FieldErrors } from "@/lib/create-safe-action";
import { useState, useCallback } from "react";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

// a custom generic hook
export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) return;

        setFieldErrors(result.fieldErrors);

        // server error
        if (result.error) {
          setError(result.error);
          options.onError?.(result.error); // optional callback on error
        }

        // success
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data); // optional callback on success
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.(); // optional callback on complete
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
