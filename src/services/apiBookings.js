import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

// Function to get bookings with filtering, sorting, and pagination
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" } // Get the exact count of bookings
    );

  // Apply filter if provided
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // Apply sorting if provided
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // Handle pagination if provided
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to); // Define range for pagination
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

// Function to get a booking by ID
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)") // Get booking, cabins, and guests details
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking not found");
  }

  return data;
}

// Get all bookings created after a specific date
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice") // Select necessary fields
    .gte("created_at", date) // Filter bookings from date
    .lte("created_at", getToday({ end: true })); // Up to today

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Get all stays that started after a specific date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)") // Select stays and guest names
    .gte("startDate", date) // Filter stays from date
    .lte("startDate", getToday()); // Up to today

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Get today's stays activity (check-ins and check-outs)
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)") // Select stays with guest details
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    ) // Filter for today's check-ins and check-outs
    .order("created_at"); // Sort by creation date

  if (error) {
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Update a booking by ID
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj) // Update booking with provided object
    .eq("id", id) // Filter by booking ID
    .select() // Select updated booking
    .single(); // Get single result

  if (error) {
    throw new Error("Booking could not be updated");
  }
  return data; // Return updated booking
}

// Delete a booking by ID
export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete() // Delete booking
    .eq("id", id); // Filter by booking ID

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}
