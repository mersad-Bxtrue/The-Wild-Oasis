import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // 1. Get number of days from search params or default to 7
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // 2. Calculate query date by subtracting numDays from today
  const queryDate = subDays(new Date(), numDays).toISOString();

  // 3. Fetch bookings after the calculated date
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
