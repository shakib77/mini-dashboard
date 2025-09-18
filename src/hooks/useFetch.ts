
import { useQuery } from "@tanstack/react-query";

type UseFetchResult<TData> = {
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

/**
 * A reusable hook for fetching data using @tanstack/react-query.
 * It wraps `useQuery` to provide a simplified and consistent API for data fetching.
 *
 * @template TData The expected type of the data to be fetched.
 * @param {readonly unknown[]} queryKey A unique key for the query, used by react-query for caching.
 * @param {string} endpoint The API endpoint to fetch from (e.g., 'posts', 'users/1').
 * @returns {UseFetchResult<TData>} An object containing the query state.
 */
export function useFetch<TData>(
  queryKey: readonly unknown[],
  endpoint: string,
): UseFetchResult<TData> {
  const { data, isLoading, isError, error } = useQuery<TData, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data from '${endpoint}'`);
      }
      return response.json();
    },
  });

  return { data, isLoading, isError, error };
}
