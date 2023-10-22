import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div>
      <Link to={'/login'}>sign in</Link>
      <br />
      <Link to={'/register'}>sign up</Link>
    </div>
  );
}
