import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient(); // Get the query client for caching
  const [searchParams] = useSearchParams(); // Get URL search parameters

  // FILTER
  const filterValue = searchParams.get("status"); // Get filter value from URL
  const filter =
    !filterValue || filterValue === "all" // Set filter object based on value
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc"; // Get sort option or default
  const [field, direction] = sortByRaw.split("-"); // Split sort option into field and direction
  const sortBy = { field, direction }; // Create sort object

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")); // Get current page

  // QUERY
  const {
    isLoading, // Loading state
    data: { data: bookings, count } = {}, // Booking data and count
    error, // Error state
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // Unique key for the query
    queryFn: () => getBookings({ filter, sortBy, page }), // Function to fetch bookings
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE); // Calculate total number of pages

  function prefetch(targetPage) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, targetPage], // Unique key for prefetching
      queryFn: () => getBookings({ filter, sortBy, page: targetPage }), // Function to fetch bookings for prefetch
    });
  }

  // Prefetch next and previous pages if they exist
  if (page < pageCount)
    prefetch(page + 1);

  if (page > 1)
    prefetch(page - 1);

  return { isLoading, error, bookings, count }; // Return loading state, error, bookings, and count
}
