import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  // Use React Query to fetch today's activities
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity, // Function to fetch data
    queryKey: ["today-activity"], // Unique key for the query
  });

  return { activities, isLoading }; // Return activities data and loading state
}
