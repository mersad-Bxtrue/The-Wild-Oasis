import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  // Fetch current user data
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"], // Unique key for the query
    queryFn: getCurrentUser, // Function to fetch user data
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated" // Check if user is authenticated
  };
}
