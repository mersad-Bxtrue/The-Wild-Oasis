import styled from "styled-components";
import { useUser } from "./useUser";

// Styled component for user avatar container
const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

// Styled component for the avatar image
const Avatar = styled.img`
  display: block;
  width: 3rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser(); // Get user data from the custom hook
  const { fullName, avatar } = user.user_metadata; // Destructure user's full name and avatar

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"} // Use default image if avatar is not available
        alt={`Avatar of ${fullName}`} // Accessibility text for the image
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
