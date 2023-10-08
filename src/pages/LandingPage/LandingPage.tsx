import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div>
      <Link to={'/sign-in'}>sign in</Link>
      <br />
      <Link to={'/sign-up'}>sign up</Link>
    </div>
  );
}
