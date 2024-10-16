import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], // Unique key for the query
    queryFn: getCabins, // Function to fetch data
  });

  return { isLoading, error, cabins }; // Return loading state, error, and cabin data
}
