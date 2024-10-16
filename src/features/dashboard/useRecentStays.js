import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  // 1. Get number of days from search params or default to 7
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // 2. Calculate query date by subtracting numDays from today
  const queryDate = subDays(new Date(), numDays).toISOString();

  // 3. Fetch stays after the calculated date
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // 4. Filter confirmed stays based on status
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
}
