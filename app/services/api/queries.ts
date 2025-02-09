import { useMutation } from "@tanstack/react-query";
import { getVideoInfo } from "./requests";
import { AsyncReturnType } from "~/types";

export function useVideoInfo() {
  return useMutation<
    AsyncReturnType<typeof getVideoInfo>,
    Error,
    Parameters<typeof getVideoInfo>[0]
  >({
    mutationFn: getVideoInfo,
  });
}
