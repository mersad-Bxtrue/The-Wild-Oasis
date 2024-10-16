import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// 1. Delete all guests from the database
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

// 2. Delete all cabins from the database
async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

// 3. Delete all bookings from the database
async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

// 4. Create new guests in the database
async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

// 5. Create new cabins in the database
async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

// 6. Create bookings by replacing IDs with actual DB IDs
async function createBookings() {
  // Fetch all guest and cabin IDs
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  // Map bookings to final format with correct IDs
  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1); // Get cabin info
    const numNights = subtractDates(booking.endDate, booking.startDate); // Calculate nights
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount); // Calculate price
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests // Calculate extras
      : 0; // Hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice; // Total price

    // Determine booking status
    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    // Return final booking object with all necessary info
    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1), // Get actual guest ID
      cabinId: allCabinIds.at(booking.cabinId - 1), // Get actual cabin ID
      status,
    };
  });

  console.log(finalBookings); // Log final bookings

  const { error } = await supabase.from("bookings").insert(finalBookings); // Insert bookings
  if (error) console.log(error.message);
}

// 7. Uploader component for managing uploads
function Uploader() {
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // 8. Upload all data
  async function uploadAll() {
    setIsLoading(true); // Set loading state
    await deleteBookings(); // Delete existing bookings
    await deleteGuests(); // Delete existing guests
    await deleteCabins(); // Delete existing cabins

    await createGuests(); // Create new guests
    await createCabins(); // Create new cabins
    await createBookings(); // Create new bookings

    setIsLoading(false); // Reset loading state
  }

  // 9. Upload only bookings
  async function uploadBookings() {
    setIsLoading(true); // Set loading state
    await deleteBookings(); // Delete existing bookings
    await createBookings(); // Create new bookings
    setIsLoading(false); // Reset loading state
  }

  // 10. Render uploader component
  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
