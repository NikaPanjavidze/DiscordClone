import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api";

export function useMeQuery() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: ({ signal }) => getMe(signal),
    retry: false,
  });
}
