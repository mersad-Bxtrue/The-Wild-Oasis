import { useNavigate } from 'react-router-dom';

export function useMoveBack() {
  const navigate = useNavigate(); // 1. Get navigate function from React Router
  return () => navigate(-1); // 2. Return function to go back one page
}
