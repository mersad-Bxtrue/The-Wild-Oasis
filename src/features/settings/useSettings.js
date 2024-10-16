import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"], // 1. Unique key for the query
    queryFn: getSettings, // 2. Function to fetch settings
  });

  return { isLoading, error, settings }; // 3. Return loading state, error, and settings
}
