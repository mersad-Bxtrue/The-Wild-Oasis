import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

// Styled component for each item in the today list
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem; // Define grid columns
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100); // Border for the first child
  }
`;

// Styled component for guest name
const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity; // Destructure activity properties

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>} {/* Tag for unconfirmed status */}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>} {/* Tag for checked-in status */}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} /> {/* Country flag */}
      <Guest>{guests.fullName}</Guest> {/* Guest's full name */}
      <div>{numNights} nights</div> {/* Number of nights stayed */}

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`} // Link to check-in page
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />} {/* Checkout button for checked-in guests */}
    </StyledTodayItem>
  );
}

export default TodayItem;
