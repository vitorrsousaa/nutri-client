import { routes } from '@godiet-routes';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

type AuthGuardProps = {
  isPrivate: boolean;
};

export function AuthGuard(props: AuthGuardProps) {
  const { isPrivate } = props;

  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to={routes.dashboard} replace />;
  }

  return <Outlet />;
}
