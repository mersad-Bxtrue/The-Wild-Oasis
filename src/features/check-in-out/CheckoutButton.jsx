import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout(); // Get checkout function and loading state

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)} // Call checkout with bookingId
      disabled={isCheckingOut} // Disable button if checking out
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
