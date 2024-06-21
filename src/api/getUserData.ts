import { User } from "@/components/userTable/types";
import useSWR, { Fetcher, KeyedMutator } from "swr";

// We are using SWR so that we can cache and revalidate data easily
// plus it gives us othee abstraction on top such as api call state.
type GetUserDataType = {
  data?: User[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  refetch: KeyedMutator<User[]>;
};
export const getUserData = (): GetUserDataType => {
  const fetcher: Fetcher<User[], any> = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading, mutate, isValidating } = useSWR<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    fetcher,
    {
        revalidateOnFocus: false
    }
  );
  return {
    data,
    isError: error ? true : false,
    isLoading: isLoading || isValidating,
    isSuccess: !error && !isLoading && !isValidating,
    refetch: mutate,
  };
};
