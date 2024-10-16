import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking(); // Fetch booking data
  const { checkout, isCheckingOut } = useCheckout(); // Checkout logic
  const { deleteBooking, isDeleting } = useDeleteBooking(); // Deletion logic

  const moveBack = useMoveBack(); // Back navigation
  const navigate = useNavigate(); // Navigation instance

  if (isLoading) return <Spinner />; // Show spinner while loading
  if (!booking) return <Empty resourceName="booking" />; // Show empty state if no booking

  const { status, id: bookingId } = booking; // Destructure booking details

  // Map status to tag colors
  const statusToTagName = {
    unconfirmed: "blue", // Unconfirmed status
    "checked-in": "green", // Checked-in status
    "checked-out": "silver", // Checked-out status
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && ( // Check in button for unconfirmed status
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && ( // Check out button for checked-in status
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut} // Disable if checking out
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking" // Resource to delete
              disabled={isDeleting} // Disable if deleting
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1), // Navigate back after deletion
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail; // Export component